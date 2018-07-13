const NightmareAdapter = require('../../adapters/NightmareAdapter');
const LooksSameAdapter = require('../../adapters/LooksSameAdapter');

/**
 * Builds dependency injections
 * @return {Object} The `client` and `differ`, injected
 */
const buildInjections = () => ({
  client: new NightmareAdapter(),
  differ: new LooksSameAdapter()
});

module.exports = buildInjections;
