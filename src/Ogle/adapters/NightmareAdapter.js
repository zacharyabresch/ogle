const debug = require('debug')('Ogle:NightmareAdapter');
const Nightmare = require('nightmare');
const { NIGHTMARE_OPTIONS } = require('../constants');

const buildClient = () => new Nightmare(NIGHTMARE_OPTIONS);

class NightmareAdapter {
  constructor(client = buildClient()) {
    this.client = client;
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

  capturePair([urls, paths]) {
    debug('capturing pair ...', urls, paths);
    return this.goto(urls.get('base'))
      .screenshot(paths.get('base'))
      .goto(urls.get('test'))
      .screenshot(paths.get('test'))
      .then(() => this.end());
  }
}

module.exports = NightmareAdapter;
