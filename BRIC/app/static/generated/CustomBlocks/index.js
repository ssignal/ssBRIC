window.BRIC = window.BRIC || {};
window.BRIC.registerBlocksAll = function() {
  (window.BRIC.blockRegistrars || []).forEach((fn) => fn());
};
