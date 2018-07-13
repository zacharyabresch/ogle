const ImageDirectory = require('../ImageDirectory');

/**
 * Initializes the images directory
 */
const initializeDirectory = (
  imagesPath,
  handler = new ImageDirectory(imagesPath)
) => {
  handler.mkdir();
};
module.exports = initializeDirectory;
