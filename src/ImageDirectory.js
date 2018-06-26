const fs = require('fs');
const path = require('path');
const debug = require('debug')('Ogle:ImageDirectory');
/**
 * Class to recursively create the images path
 * @param  {String} imagesPath  - The path to the images
 */
class ImageDirectory {
  constructor(imagesPath) {
    debug('constructing ...', imagesPath);
    this.pathSet = new Set(imagesPath.split(path.sep));
  }

  /**
   * Makes directory if it doesn't exist
   * @return {String}             - The current path
   */
  mkdir() {
    debug('making directory ... ');
    let currentPath = '';
    this.pathSet.forEach(folder => {
      currentPath += folder + path.sep;
      if (!fs.existsSync(currentPath)) fs.mkdirSync(currentPath);
    });
  }
}

module.exports = ImageDirectory;
