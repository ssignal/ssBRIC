window.BRIC = window.BRIC || {};
window.BRIC.registerGeneratorsAll = function() {
  (window.BRIC.generatorRegistrars || []).forEach((fn) => fn());
};
