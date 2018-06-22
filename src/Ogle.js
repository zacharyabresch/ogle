const fs = require('fs');
const path = require('path');
const debug = require('debug')('Ogle');
const looksSame = require('looks-same');
const Nightmare = require('nightmare');

const WAIT_TIMEOUT = 5000;
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
    imagesPath = './ogle/images',
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
      base: `${this.imagesPath}/base.png`,
      test: `${this.imagesPath}/test.png`
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
    debug('capturing ...');
    this.nightmare
      .goto(this.base)
      .screenshot(this.paths.base)
      .goto(this.test)
      .screenshot(this.paths.test)
      .end()
      .then(() => {
        console.log('success!');
        this.compare();
      })
      .catch(error => console.error(error));
  }

  compare() {
    debug('comparing ...');
    looksSame.createDiff(
      {
        reference: this.paths.base,
        current: this.paths.test,
        diff: `${this.imagesPath}/diff.png`,
        highlightColor: '#FF8D33',
        tolerance: 1
      },
      err => console.error(err)
    );
  }
}

module.exports = Ogle;
