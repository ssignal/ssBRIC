import prettier from 'eslint-plugin-prettier';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: ['!**/.*'],
  },
  ...compat.extends(
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended'
  ),
  {
    plugins: {
      prettier,
      '@typescript-eslint': typescriptEslint,
    },

    languageOptions: {
      globals: {
        ...globals.commonjs,
        ...globals.node,
        ...globals.mocha,
        window: true,
        _: true,
        db: true,
        parse: true,
        stringify: true,
        require: true,
        STAGE: true,
        STATE_MACHINE_ARN: true,
        REPOSITORY_NAME: true,
      },

      parser: tsParser,
      ecmaVersion: 2018,
      sourceType: 'module',
    },

    rules: {
      'prettier/prettier': [
        'warn',
        {
          singleQuote: true,
        },
      ],

      '@typescript-eslint/no-empty-function': 'off',
      'no-undef': 2,
      'no-cond-assign': 0,
      'no-console': 0,

      'no-constant-condition': [
        1,
        {
          checkLoops: false,
        },
      ],

      'no-empty': 0,
      'no-irregular-whitespace': 2,
      'no-unexpected-multiline': 2,

      'guard-for-in': 0,
      'no-caller': 2,
      'no-empty-function': 0,
      'no-extend-native': 2,
      'no-extra-bind': 2,
      'no-invalid-this': 0,
      'no-multi-spaces': 2,
      'no-multi-str': 2,
      'no-new-wrappers': 2,
      'no-useless-escape': 0,
      'no-with': 2,
      'no-restricted-globals': [2, 'context'],
      'no-undefined': 0,

      'no-unused-vars': [
        1,
        {
          args: 'none',
          varsIgnorePattern: 'debug',
        },
      ],

      'array-bracket-spacing': [2, 'never'],
      'brace-style': 2,
      'comma-spacing': 2,
      'comma-style': 2,
      'computed-property-spacing': 2,
      'eol-last': 2,
      'func-call-spacing': 2,
      'key-spacing': 1,
      'keyword-spacing': 0,
      'linebreak-style': 2,
      'no-array-constructor': 2,

      'no-multiple-empty-lines': [
        2,
        {
          max: 2,
        },
      ],

      'no-new-object': 2,
      'no-trailing-spaces': 2,
      'object-curly-spacing': 0,

      'one-var': [
        2,
        {
          var: 'never',
          let: 'never',
          const: 'never',
        },
      ],

      'padded-blocks': [2, 'never'],
      'semi-spacing': 2,
      semi: 0,
      'space-before-blocks': 2,
      'space-before-function-paren': [0, 'never'],
      'spaced-comment': [2, 'always'],
      'arrow-parens': [2, 'always'],
      'arrow-spacing': 2,
      'constructor-super': 2,
      'generator-star-spacing': [2, 'after'],
      'no-new-symbol': 2,
      'no-this-before-super': 2,
      'no-useless-catch': 0,
      'no-var': 2,
      'prefer-spread': 2,
      'rest-spread-spacing': 2,
      'yield-star-spacing': [2, 'after'],
    },
  },
  ...compat
    .extends(
      'eslint:recommended',
      'plugin:prettier/recommended',
      'plugin:@typescript-eslint/recommended'
    )
    .map((config) => ({
      ...config,
      files: ['**/*.js'],
    })),
  {
    files: ['**/*.js'],

    rules: {
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
  ...compat
    .extends(
      'eslint:recommended',
      'plugin:prettier/recommended',
      'plugin:@typescript-eslint/recommended'
    )
    .map((config) => ({
      ...config,
      files: ['**/*.ts'],
    })),
  {
    files: ['**/*.json'],

    rules: {
      '@typescript-eslint/no-var-requires': 'off',
      'quote-props': [2, 'consistent'],

      quotes: [
        2,
        'double',
        {
          allowTemplateLiterals: true,
        },
      ],
    },
  },
  ...compat
    .extends('eslint:recommended', 'plugin:@typescript-eslint/recommended')
    .map((config) => ({
      ...config,
      files: ['**/*.+(ts|tsx)'],
    })),
  {
    files: ['**/*.+(ts|tsx)'],

    plugins: {
      '@typescript-eslint': typescriptEslint,
    },

    languageOptions: {
      parser: tsParser,
    },
  },
];
