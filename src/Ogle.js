const fs = require('fs');
const path = require('path');
const debug = require('debug')('Ogle');
const Nightmare = require('nightmare');

const WAIT_TIMEOUT = 2000;
const NIGHTMARE_OPTIONS = {
  show: true,
  switches: {
    'ignore-certificate-errors': true
  },
  waitTimeout: WAIT_TIMEOUT
};

/** Class for visual diffing between domains */
class Ogle {
  /** Creates Ogle instance */
  constructor({
    base,
    test,
    imagesPath = '/ogle/images',
    nightmare = null
  } = {}) {
    debug('constructing');
    if (!base || !test) {
      throw new Error('required params not provided');
    }
    this.base = base;
    this.test = test;
    this.imagesPath = imagesPath;
    this.nightmare = nightmare || new Nightmare(NIGHTMARE_OPTIONS);
    this.paths = {
      base: `${path.resolve(__dirname, this.imagesPath)}/base.png`,
      test: `${path.resolve(__dirname, this.imagesPath)}/test.png`
    };
    Ogle.createImageDirectory(this.imagesPath);
  }

  static createImageDirectory(imagesPath) {
    debug('createImageDirectory', imagesPath);
    imagesPath.split(path.sep).reduce((pathTracker, folder) => {
      const currentPath = pathTracker + folder + path.sep;
      if (!fs.existsSync(currentPath)) {
        fs.mkdirSync(currentPath);
      }
      return currentPath;
    });
  }

  capture() {
    this.nightmare
      .goto(this.base)
      .screenshot('./ogle/images/base.png')
      .goto(this.test)
      .screenshot('./ogle/images/test.png')
      .end()
      .then(() => {
        console.log('success!');
        console.log(this);
      })
      .catch(error => console.error(error));
  }
}

module.exports = Ogle;
