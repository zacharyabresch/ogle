const ImageDirectory = require('../ImageDirectory');

const initializeDirectory = (
  imagesPath,
  handler = new ImageDirectory(imagesPath)
) => {
  handler.mkdir();
};
module.exports = initializeDirectory;
