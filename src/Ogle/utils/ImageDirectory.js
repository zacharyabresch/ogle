const fs = require('fs');
const path = require('path');
const debug = require('debug')('Ogle:ImageDirectory');
/**
 * Class to recursively create the images path
 * @param  {String} imagesPath  - The path to the images
 */
class ImageDirectory {
  constructor(imagesPath = '') {
    debug('constructing ...', imagesPath);
    this.paths = imagesPath;
  }

  get paths() {
    return this.pathSet;
  }

  set paths(imagesPath) {
    this.pathSet = new Set(imagesPath.split(path.sep));
  }

  /**
   * Makes directory if it doesn't exist
   * @return {String}             - The current path
   */
  mkdir(imagesPath = this.paths) {
    debug('making directory ... ');
    let currentPath = '';
    imagesPath.forEach(folder => {
      currentPath += folder + path.sep;
      if (!fs.existsSync(currentPath)) fs.mkdirSync(currentPath);
    });
  }
}

module.exports = ImageDirectory;
