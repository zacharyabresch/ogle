const buildPathMap = imagesPath =>
  new Map([
    ['base', `${imagesPath}/base.png`],
    ['test', `${imagesPath}/test.png`],
    ['diff', `${imagesPath}/diff.png`]
  ]);

module.exports = buildPathMap;
