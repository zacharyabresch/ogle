const Nightmare = require('nightmare');
const HeadlessClientAdapter = require('./');
const { NIGHTMARE_OPTIONS } = require('../constants');

class NightmareAdapter extends HeadlessClientAdapter {
  constructor(client) {
    super(client);
    this.client = new Nightmare(NIGHTMARE_OPTIONS);
  }

  goto(url) {
    return this.client.goto(url);
  }

  screenshot(path) {
    return this.client.screenshot(path);
  }

  end() {
    return this.client.end();
  }
}

module.exports = NightmareAdapter;
