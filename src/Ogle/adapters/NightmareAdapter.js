const debug = require('debug')('Ogle:NightmareAdapter');
const Nightmare = require('nightmare');
const { NIGHTMARE_OPTIONS } = require('../constants');

const buildClient = () => new Nightmare(NIGHTMARE_OPTIONS);

/**
 * Adapter class to the `nightmare` module
 */
class NightmareAdapter {
  /**
   * Create a NightmareAdapter instance
   * @param  {Object} client Client dependency injected
   * @return {NightmareAdapter}
   */
  constructor(client = buildClient()) {
    this.client = client;
  }

  /**
   * Vists a URL
   * @param  {String} url The URL to visit
   * @return {NightmareAdapter}
   */
  goto(url) {
    return this.client.goto(url);
  }

  /**
   * Takes a screenshot of the current URL being visited
   * @param  {String} path The path to save the screenshot to
   * @return {NightmareAdapter}
   */
  screenshot(path) {
    return this.client.screenshot(path);
  }

  /**
   * Ends the Nightmare process
   * @return {Promise}
   */
  end() {
    return this.client.end();
  }

  /**
   * Captures the base & test urls
   * @param  {Map} [urls  The URL data map
   * @param  {Map} paths] The path data map
   * @return {Promise}
   */
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
