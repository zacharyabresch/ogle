const debug = require('debug')('Ogle');
const looksSame = require('looks-same');
const Nightmare = require('nightmare');
const ImageDirectory = require('./ImageDirectory');
const { NIGHTMARE_OPTIONS, LOOKS_SAME_OPTIONS } = require('./constants');
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
    this.nightmare = new Nightmare(NIGHTMARE_OPTIONS);
    this.imagesDirectory = new ImageDirectory(imagesPath);
  }

  /**
   * Kicks off capturing of screenshots
   */
  capture() {
    debug('capturing ...');
    this.nightmare
      .goto(this.urls.get('base'))
      .screenshot(this.paths.get('base'))
      .goto(this.urls.get('test'))
      .screenshot(this.paths.get('test'))
      .end()
      .then(() => {
        debug('success!');
        this.compare();
      })
      .catch(error => console.error(error));
  }

  /**
   * Generates diff after comparing images
   */
  compare() {
    debug('comparing ...');
    looksSame(
      this.looksSameOptions.reference,
      this.looksSameOptions.current,
      (err, equal) => {
        console.log(err);
        console.log(equal);
      }
    );
    // looksSame.createDiff(this.looksSameOptions, err => console.error(err));
  }
}

module.exports = Ogle;
