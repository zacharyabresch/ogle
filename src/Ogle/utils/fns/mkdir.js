const ImageDirectory = require('../ImageDirectory');

const mkdir = (dir, handler = new ImageDirectory()) => {
  handler.paths = dir;
  handler.mkdir();
};
module.exports = mkdir;
