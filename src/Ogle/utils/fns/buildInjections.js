const NightmareAdapter = require('../../adapters/NightmareAdapter');
const LooksSameAdapter = require('../../adapters/LooksSameAdapter');

const buildInjections = () => ({
  client: new NightmareAdapter(),
  differ: new LooksSameAdapter()
});

module.exports = buildInjections;
