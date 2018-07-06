const debug = require('debug')('Ogle');
const SYMBOLS = require('./symbols');
const { LOOKS_SAME_OPTIONS } = require('./constants');
const {
  buildPathMap,
  initializeDirectory,
  buildInjections
} = require('./utils/fns/');

/**
 * Class for visual diffing between domain
 * @param {Object}  options                                 - The parameter object
 * @param {Object}  options.urls                            - The urls object
 * @param  {String} options.urls.base                       - The base URL
 * @param  {String} options.urls.test                       - The comparison URL
 * @param  {String} [options.imagesPath='./ogle/images']    - The path to images
 * @return {Object}                                         - The Ogle instance
 */
class Ogle {
  constructor({
    urls = {},
    imagesPath = './ogle-images',
    injections = buildInjections()
  }) {
    debug('constructing');
    this.urls = urls;
    this.paths = buildPathMap(imagesPath);
    this.looksSameOptions = LOOKS_SAME_OPTIONS(this);
    this.client = injections.client;
    this.differ = injections.differ;
    this.promises = new Set();
    initializeDirectory(imagesPath);
  }

  /**
   * Kicks off capturing of screenshots
   * @return {Promise} all of them. thenable yo
   */
  capture() {
    debug('capturing ...');
    this.urls.forEach(urlMap => this.promises.add(this.capturePair(urlMap)));
    return Promise.all(this.promises).catch(err => console.error(err));
  }

  capturePair(map) {
    debug('capturing pair: ', map);
    this.client.capturePair([map, this.paths]).then(() => {
      debug('success!');
      return this.compare();
    });
  }

  /**
   * Generates diff after comparing images
   */
  compare() {
    debug('comparing ...');
    return this.differ.createDiff(this.looksSameOptions);
  }

  get urls() {
    return this[SYMBOLS.urls];
  }

  set urls(data) {
    const urlSet = new Set();
    if (Array.isArray(data)) {
      data.forEach(value => {
        urlSet.add(new Map(Object.entries(value)));
      });
    } else {
      urlSet.add(new Map(Object.entries(data)));
    }
    this[SYMBOLS.urls] = urlSet;
  }
}

module.exports = Ogle;
