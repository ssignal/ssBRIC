#!/usr/bin/env python3
"""
generatBT.py

Convert a limited subset of JavaScript control-flow into a Behavior Tree JSON.

What it supports well:
- function declarations / arrow-function assigned to a variable
- blocks: { ... }
- if / else if / else
- while (...)
- expression statements that are function calls
- return;
- variable declarations / assignments as blackboard-set actions

Behavior Tree mapping used by this script:
- sequential statements                -> Sequence
- if (cond) A else B                   -> Selector( Sequence(Condition(cond), A), B )
- if (cond) A                          -> Sequence(Condition(cond), A)
- while (cond) A                       -> While(condition=cond, child=A)
- someCall(a, b)                       -> Action(name='someCall', args=['a', 'b'])
- let x = expr; / x = expr;            -> Action(name='set_blackboard', key='x', value='expr')
- return; / return value;              -> Action(name='return', value='...')

Important limitations:
- This is NOT a full JavaScript parser.
- It is intended for readable behavior-style JS, not arbitrary minified or heavily dynamic code.
- Complex expressions are preserved as raw strings in Condition / Action args.
- switch/for/try/catch/class/import/export are not converted.

Usage examples:
    python generatBT.py input.js
    python generatBT.py input.js -o tree.json
    python generatBT.py input.js --pretty

    # Read from stdin
    cat input.js | python generatBT.py --stdin --pretty
"""

from __future__ import annotations

import argparse
import json
import re
import sys
from dataclasses import dataclass
from typing import List, Optional, Tuple, Union


# =========================
# Lexer
# =========================

KEYWORDS = {
    "if",
    "else",
    "while",
    "return",
    "function",
    "let",
    "const",
    "var",
}

MULTI_OPS = [
    "===",
    "!==",
    "==",
    "!=",
    "<=",
    ">=",
    "&&",
    "||",
    "=>",
    "++",
    "--",
    "+=",
    "-=",
    "*=",
    "/=",
    "%=",
]

SINGLE_SYMBOLS = set("(){}[];,.?:=+-*/%!<>|")


@dataclass
class Token:
    kind: str
    value: str
    pos: int


class Lexer:
    def __init__(self, source: str):
        self.source = source
        self.length = len(source)
        self.i = 0

    def tokenize(self) -> List[Token]:
        tokens: List[Token] = []
        while self.i < self.length:
            ch = self.source[self.i]

            # whitespace
            if ch.isspace():
                self.i += 1
                continue

            # comments
            if self._peek("//"):
                self.i += 2
                while self.i < self.length and self.source[self.i] not in "\r\n":
                    self.i += 1
                continue
            if self._peek("/*"):
                self.i += 2
                while self.i < self.length and not self._peek("*/"):
                    self.i += 1
                self.i += 2 if self.i < self.length else 0
                continue

            # strings
            if ch in ('"', "'", "`"):
                tokens.append(self._read_string())
                continue

            # number
            if ch.isdigit():
                tokens.append(self._read_number())
                continue

            # identifier / keyword
            if ch.isalpha() or ch in "_$":
                tokens.append(self._read_identifier())
                continue

            # operators
            matched = False
            for op in MULTI_OPS:
                if self._peek(op):
                    tokens.append(Token("OP", op, self.i))
                    self.i += len(op)
                    matched = True
                    break
            if matched:
                continue

            # single-char symbols
            if ch in SINGLE_SYMBOLS:
                tokens.append(Token("SYM", ch, self.i))
                self.i += 1
                continue

            raise SyntaxError(f"Unexpected character {ch!r} at position {self.i}")

        tokens.append(Token("EOF", "", self.i))
        return tokens

    def _peek(self, s: str) -> bool:
        return self.source.startswith(s, self.i)

    def _read_string(self) -> Token:
        quote = self.source[self.i]
        start = self.i
        self.i += 1
        escaped = False
        while self.i < self.length:
            ch = self.source[self.i]
            if escaped:
                escaped = False
                self.i += 1
                continue
            if ch == "\\":
                escaped = True
                self.i += 1
                continue
            if ch == quote:
                self.i += 1
                return Token("STRING", self.source[start : self.i], start)
            self.i += 1
        raise SyntaxError(f"Unterminated string starting at {start}")

    def _read_number(self) -> Token:
        start = self.i
        while self.i < self.length and (
            self.source[self.i].isdigit() or self.source[self.i] == "."
        ):
            self.i += 1
        return Token("NUMBER", self.source[start : self.i], start)

    def _read_identifier(self) -> Token:
        start = self.i
        while self.i < self.length and (
            self.source[self.i].isalnum() or self.source[self.i] in "_$"
        ):
            self.i += 1
        value = self.source[start : self.i]
        kind = "KW" if value in KEYWORDS else "IDENT"
        return Token(kind, value, start)


# =========================
# AST nodes
# =========================


@dataclass
class Program:
    body: List[object]


@dataclass
class Block:
    body: List[object]


@dataclass
class IfStmt:
    test: str
    consequent: object
    alternate: Optional[object]


@dataclass
class WhileStmt:
    test: str
    body: object


@dataclass
class ExprStmt:
    raw: str


@dataclass
class ReturnStmt:
    value: Optional[str]


@dataclass
class AssignStmt:
    key: str
    value: str
    declared_with: Optional[str] = None


@dataclass
class FunctionDecl:
    name: str
    params: List[str]
    body: Block


# =========================
# Parser
# =========================


class Parser:
    def __init__(self, tokens: List[Token]):
        self.tokens = tokens
        self.i = 0

    def parse_program(self) -> Program:
        body = []
        while not self._at("EOF"):
            body.append(self.parse_statement())
        return Program(body)

    def parse_statement(self):
        # function foo(...) { ... }
        if self._at_val("KW", "function"):
            return self.parse_function_decl()

        # const foo = (...) => { ... }
        if self._at("KW") and self._cur().value in {"const", "let", "var"}:
            save_i = self.i
            decl_kw = self._cur().value
            self.i += 1
            if self._at("IDENT"):
                ident = self._cur().value
                self.i += 1
                if self._eat_val("SYM", "="):
                    # Try arrow function parse first.
                    if self._at_val("SYM", "("):
                        params = self._parse_params()
                        if self._eat_val("OP", "=>"):
                            body = self.parse_block_or_single_stmt_as_block()
                            return FunctionDecl(ident, params, body)
                    elif self._at("IDENT"):
                        # single parameter arrow function: x => ...
                        single = self._cur().value
                        self.i += 1
                        if self._eat_val("OP", "=>"):
                            body = self.parse_block_or_single_stmt_as_block()
                            return FunctionDecl(ident, [single], body)
            # Not arrow function, rewind and parse declaration/assignment normally.
            self.i = save_i

        if self._at_val("SYM", "{"):
            return self.parse_block()
        if self._at_val("KW", "if"):
            return self.parse_if()
        if self._at_val("KW", "while"):
            return self.parse_while()
        if self._at_val("KW", "return"):
            return self.parse_return()
        if self._at("KW") and self._cur().value in {"let", "const", "var"}:
            return self.parse_declaration()

        return self.parse_expr_or_assignment_stmt()

    def parse_function_decl(self) -> FunctionDecl:
        self._expect_val("KW", "function")
        name = self._expect("IDENT").value
        params = self._parse_params()
        body = self.parse_block()
        return FunctionDecl(name, params, body)

    def _parse_params(self) -> List[str]:
        params: List[str] = []
        self._expect_val("SYM", "(")
        while not self._at_val("SYM", ")"):
            if self._at("IDENT"):
                params.append(self._cur().value)
                self.i += 1
            else:
                # preserve odd params as raw text chunk until comma or )
                params.append(
                    self._collect_until(
                        [(",", "SYM"), (")", "SYM")], consume_end=False
                    ).strip()
                )
            self._eat_val("SYM", ",")
        self._expect_val("SYM", ")")
        return params

    def parse_block_or_single_stmt_as_block(self) -> Block:
        if self._at_val("SYM", "{"):
            return self.parse_block()
        return Block([self.parse_statement()])

    def parse_block(self) -> Block:
        self._expect_val("SYM", "{")
        body = []
        while not self._at_val("SYM", "}"):
            body.append(self.parse_statement())
        self._expect_val("SYM", "}")
        return Block(body)

    def parse_if(self) -> IfStmt:
        self._expect_val("KW", "if")
        test = self._parse_paren_expr_raw()
        consequent = self.parse_statement()
        alternate = None
        if self._eat_val("KW", "else"):
            alternate = self.parse_statement()
        return IfStmt(test, consequent, alternate)

    def parse_while(self) -> WhileStmt:
        self._expect_val("KW", "while")
        test = self._parse_paren_expr_raw()
        body = self.parse_statement()
        return WhileStmt(test, body)

    def parse_return(self) -> ReturnStmt:
        self._expect_val("KW", "return")
        if self._eat_val("SYM", ";"):
            return ReturnStmt(None)
        value = self._collect_until([(";", "SYM")], consume_end=True).strip()
        return ReturnStmt(value or None)

    def parse_declaration(self) -> AssignStmt:
        kw = self._expect("KW").value
        key = self._expect("IDENT").value
        self._expect_val("SYM", "=")
        value = self._collect_until([(";", "SYM")], consume_end=True).strip()
        return AssignStmt(key=key, value=value, declared_with=kw)

    def parse_expr_or_assignment_stmt(self):
        # assignment like x = y; / x += y;
        if (
            self._at("IDENT")
            and self._peek_n(1)
            and (
                (self._peek_n(1).kind == "SYM" and self._peek_n(1).value == "=")
                or (
                    self._peek_n(1).kind == "OP"
                    and self._peek_n(1).value in {"+=", "-=", "*=", "/=", "%="}
                )
            )
        ):
            key = self._cur().value
            self.i += 1
            op = self._cur().value
            self.i += 1
            value = self._collect_until([(";", "SYM")], consume_end=True).strip()
            if op != "=":
                # normalize x += y  -> x + (y)
                value = f"{key} {op[0]} ({value})"
            return AssignStmt(key=key, value=value)

        raw = self._collect_until([(";", "SYM")], consume_end=True).strip()
        return ExprStmt(raw)

    def _parse_paren_expr_raw(self) -> str:
        self._expect_val("SYM", "(")
        depth = 1
        parts = []
        while depth > 0:
            tok = self._cur()
            if tok.kind == "EOF":
                raise SyntaxError("Unterminated parenthesized expression")
            if tok.kind == "SYM" and tok.value == "(":
                depth += 1
            elif tok.kind == "SYM" and tok.value == ")":
                depth -= 1
                if depth == 0:
                    self.i += 1
                    break
            if depth > 0:
                parts.append(tok.value)
                self.i += 1
        return untokenize(parts).strip()

    def _collect_until(self, endings: List[Tuple[str, str]], consume_end: bool) -> str:
        parts = []
        depth_paren = depth_brace = depth_bracket = 0
        while True:
            tok = self._cur()
            if tok.kind == "EOF":
                break
            if tok.kind == "SYM":
                if tok.value == "(":
                    depth_paren += 1
                elif tok.value == ")":
                    depth_paren -= 1
                elif tok.value == "{":
                    depth_brace += 1
                elif tok.value == "}":
                    depth_brace -= 1
                elif tok.value == "[":
                    depth_bracket += 1
                elif tok.value == "]":
                    depth_bracket -= 1

            if depth_paren == depth_brace == depth_bracket == 0:
                if any(tok.value == v and tok.kind == k for v, k in endings):
                    if consume_end:
                        self.i += 1
                    break

            parts.append(tok.value)
            self.i += 1
        return untokenize(parts)

    def _cur(self) -> Token:
        return self.tokens[self.i]

    def _peek_n(self, n: int) -> Optional[Token]:
        j = self.i + n
        return self.tokens[j] if j < len(self.tokens) else None

    def _at(self, kind: str) -> bool:
        return self._cur().kind == kind

    def _at_val(self, kind: str, value: str) -> bool:
        tok = self._cur()
        return tok.kind == kind and tok.value == value

    def _eat_val(self, kind: str, value: str) -> bool:
        if self._at_val(kind, value):
            self.i += 1
            return True
        return False

    def _expect(self, kind: str) -> Token:
        tok = self._cur()
        if tok.kind != kind:
            raise SyntaxError(
                f"Expected {kind}, got {tok.kind}({tok.value!r}) at {tok.pos}"
            )
        self.i += 1
        return tok

    def _expect_val(self, kind: str, value: str) -> Token:
        tok = self._cur()
        if tok.kind != kind or tok.value != value:
            raise SyntaxError(
                f"Expected {kind} {value!r}, got {tok.kind}({tok.value!r}) at {tok.pos}"
            )
        self.i += 1
        return tok


# =========================
# Converter: JS AST -> BT JSON
# =========================


def untokenize(parts: List[str]) -> str:
    if not parts:
        return ""
    s = " ".join(parts)
    # Cosmetic cleanup.
    s = re.sub(r"\s+([,;:\)\]\}])", r"\1", s)
    s = re.sub(r"([\(\[\{])\s+", r"\1", s)
    s = re.sub(r"\s+\.", ".", s)
    s = re.sub(r"\.\s+", ".", s)
    return s.strip()


def parse_call(raw: str) -> Optional[dict]:
    raw = raw.strip()
    m = re.match(r"^([A-Za-z_$][\w$\.]*)\s*\((.*)\)$", raw, re.S)
    if not m:
        return None
    name = m.group(1)
    args_raw = m.group(2).strip()
    args = split_top_level_args(args_raw)
    return {"type": "Action", "name": name, "args": args}


def split_top_level_args(text: str) -> List[str]:
    if not text:
        return []
    args = []
    start = 0
    dp = db = ds = 0
    in_str: Optional[str] = None
    escaped = False
    for i, ch in enumerate(text):
        if in_str:
            if escaped:
                escaped = False
            elif ch == "\\":
                escaped = True
            elif ch == in_str:
                in_str = None
            continue
        if ch in ('"', "'", "`"):
            in_str = ch
            continue
        if ch == "(":
            dp += 1
        elif ch == ")":
            dp -= 1
        elif ch == "[":
            ds += 1
        elif ch == "]":
            ds -= 1
        elif ch == "{":
            db += 1
        elif ch == "}":
            db -= 1
        elif ch == "," and dp == db == ds == 0:
            args.append(text[start:i].strip())
            start = i + 1
    tail = text[start:].strip()
    if tail:
        args.append(tail)
    return args


def compact(node: Union[dict, List, str, None]):
    if isinstance(node, list):
        out = [compact(x) for x in node if x is not None]
        return out
    if isinstance(node, dict):
        out = {}
        for k, v in node.items():
            cv = compact(v)
            if cv is not None:
                out[k] = cv
        return out
    return node


class BTConverter:
    def convert_program(self, program: Program) -> dict:
        fns = [n for n in program.body if isinstance(n, FunctionDecl)]
        other = [n for n in program.body if not isinstance(n, FunctionDecl)]

        result = {"type": "BehaviorTreePackage", "trees": []}

        for fn in fns:
            result["trees"].append(
                {
                    "name": fn.name,
                    "params": fn.params,
                    "root": self.convert_block(fn.body),
                }
            )

        if other:
            result["trees"].append(
                {
                    "name": "main",
                    "params": [],
                    "root": self.convert_block(Block(other)),
                }
            )
        return compact(result)

    def convert_block(self, block: Block) -> dict:
        return self._sequence_from_statements(block.body)

    def _sequence_from_statements(self, statements: List[object]) -> dict:
        children = [self.convert_stmt(stmt) for stmt in statements if stmt is not None]
        children = [c for c in children if c is not None]
        if not children:
            return {"type": "NoOp"}
        if len(children) == 1:
            return children[0]
        return {"type": "Sequence", "children": children}

    def convert_stmt(self, stmt) -> Optional[dict]:
        if isinstance(stmt, Block):
            return self.convert_block(stmt)

        if isinstance(stmt, IfStmt):
            cond_node = {"type": "Condition", "expr": stmt.test}
            true_branch = self._merge_sequence(
                cond_node, self.convert_stmt(stmt.consequent)
            )
            if stmt.alternate is None:
                return true_branch
            false_branch = self.convert_stmt(stmt.alternate)
            return {"type": "Selector", "children": [true_branch, false_branch]}

        if isinstance(stmt, WhileStmt):
            return {
                "type": "While",
                "condition": stmt.test,
                "child": self.convert_stmt(stmt.body),
            }

        if isinstance(stmt, ReturnStmt):
            return {"type": "Action", "name": "return", "value": stmt.value}

        if isinstance(stmt, AssignStmt):
            return {
                "type": "Action",
                "name": "set_blackboard",
                "key": stmt.key,
                "value": stmt.value,
                "declared_with": stmt.declared_with,
            }

        if isinstance(stmt, ExprStmt):
            call = parse_call(stmt.raw)
            if call:
                return call
            return {"type": "Action", "name": "eval", "code": stmt.raw}

        if isinstance(stmt, FunctionDecl):
            # handled at program level
            return None

        raise TypeError(f"Unsupported AST node: {type(stmt).__name__}")

    @staticmethod
    def _merge_sequence(first: dict, second: Optional[dict]) -> dict:
        if second is None:
            return first
        if first.get("type") == "Sequence":
            children = list(first.get("children", []))
        else:
            children = [first]
        if second.get("type") == "Sequence":
            children.extend(second.get("children", []))
        else:
            children.append(second)
        return {"type": "Sequence", "children": children}


# =========================
# CLI
# =========================


def main() -> int:
    ap = argparse.ArgumentParser(
        description="Convert a limited subset of JavaScript to Behavior Tree JSON"
    )
    ap.add_argument("input", nargs="?", help="Input JavaScript file")
    ap.add_argument("-o", "--output", help="Output JSON file. Defaults to stdout")
    ap.add_argument("--stdin", action="store_true", help="Read JavaScript from stdin")
    ap.add_argument("--pretty", action="store_true", help="Pretty-print JSON")
    ap.add_argument(
        "--show-ast",
        action="store_true",
        help="Print parsed intermediate AST instead of BT JSON",
    )
    args = ap.parse_args()

    if args.stdin:
        source = sys.stdin.read()
    elif args.input:
        with open(args.input, "r", encoding="utf-8") as f:
            source = f.read()
    else:
        ap.error("Provide an input file or use --stdin")

    try:
        tokens = Lexer(source).tokenize()
        program = Parser(tokens).parse_program()
        if args.show_ast:
            out_obj = ast_to_dict(program)
        else:
            out_obj = BTConverter().convert_program(program)
    except Exception as e:
        sys.stderr.write(f"[ERROR] {e}\n")
        return 1

    text = json.dumps(out_obj, indent=2 if args.pretty else None, ensure_ascii=False)
    if args.output:
        with open(args.output, "w", encoding="utf-8") as f:
            f.write(text)
            if args.pretty:
                f.write("\n")
    else:
        sys.stdout.write(text)
        if args.pretty:
            sys.stdout.write("\n")
    return 0


def ast_to_dict(node):
    if isinstance(node, list):
        return [ast_to_dict(x) for x in node]
    if hasattr(node, "__dataclass_fields__"):
        data = {"type": type(node).__name__}
        for k in node.__dataclass_fields__.keys():
            data[k] = ast_to_dict(getattr(node, k))
        return data
    return node


if __name__ == "__main__":
    raise SystemExit(main())
