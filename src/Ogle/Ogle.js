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
    this.imagesPath = imagesPath;
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

  capturePair(urlMap) {
    debug('capturing pair: ', urlMap);
    const paths = buildPathMap(urlMap, this.imagesPath);
    this.client = buildInjections().client;
    return this.client.capturePair([urlMap, paths]).then(() => {
      debug('success!');
      return this.compare(paths);
    });
  }

  /**
   * Generates diff after comparing images
   */
  compare(paths) {
    debug('comparing ...');
    return this.differ.createDiff(LOOKS_SAME_OPTIONS(paths));
  }

  get urls() {
    return this[SYMBOLS.urls];
  }

  set urls(data) {
    const urlSet = new Set();
    if (Array.isArray(data)) {
      data.forEach(value => {
        const urlMap = new Map(Object.entries(value));
        urlSet.add(urlMap);
      });
    } else {
      const newData = { ...data, name: data.name || 'single' };
      urlSet.add(new Map(Object.entries(newData)));
    }
    this[SYMBOLS.urls] = urlSet;
  }
}

module.exports = Ogle;
