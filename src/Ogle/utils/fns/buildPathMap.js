const { CAPTURE_VALUES_SET } = require('../../constants');
const mkdir = require('./mkdir');

const generateBasePath = ({ name, imagesPath }) => `${imagesPath}/${name}`;
const generateCapturePath = ({ basePath, captureValue }) =>
  `${basePath}/${captureValue}.png`;

/**
 * Builds the map of URLs to paths
 * @param  {Object} urlMap     The URL data
 * @param  {String} imagesPath The path to save images to
 * @return {Map}            The map of URLS to paths
 */
const buildPathMap = (urlMap, imagesPath) => {
  const paths = new Map();
  const basePath = generateBasePath({ name: urlMap.get('name'), imagesPath });
  mkdir(basePath);
  CAPTURE_VALUES_SET.forEach(captureValue =>
    paths.set(captureValue, generateCapturePath({ basePath, captureValue }))
  );
  return paths;
};

module.exports = buildPathMap;
