const debug = require('debug')('Ogle');
const looksSame = require('looks-same');
const ImageDirectory = require('./ImageDirectory');
const NightmareAdapter = require('./HeadlessClientAdapter/NightmareAdapter');
const { LOOKS_SAME_OPTIONS } = require('./constants');
const { buildPathMap } = require('./fns');

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
  constructor({ urls: { base, test }, imagesPath = './ogle/images' }) {
    debug('constructing');
    if (!base || !test) {
      throw new Error('required params not provided');
    }

    this.urls = new Map([['base', base], ['test', test]]);
    this.paths = buildPathMap(imagesPath);
    this.looksSameOptions = LOOKS_SAME_OPTIONS(this);
    this.client = new NightmareAdapter();
    const imageDirectory = new ImageDirectory(imagesPath);
    imageDirectory.mkdir();
  }

  /**
   * Kicks off capturing of screenshots
   * @return {Promise} thenable yo
   */
  capture() {
    debug('capturing ...');
    return this.client
      .goto(this.urls.get('base'))
      .screenshot(this.paths.get('base'))
      .goto(this.urls.get('test'))
      .screenshot(this.paths.get('test'))
      .end()
      .then(() => {
        debug('success!');
        return this.compare();
      });
  }

  /**
   * Generates diff after comparing images
   */
  compare() {
    debug('comparing ...');
    return new Promise((resolve, reject) => {
      looksSame.createDiff(this.looksSameOptions, err => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}

module.exports = Ogle;
