const ImageDirectory = require('../ImageDirectory');

/**
 * Makes a directory
 * @param  {String}         dir     The directory to create
 * @param  {ImageDirectory} handler The injected dependency for directory handling
 */
const mkdir = (dir, handler = new ImageDirectory()) => {
  handler.paths = dir;
  handler.mkdir();
};
module.exports = mkdir;
