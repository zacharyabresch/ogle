/**
 * The time Nightmare waits for `goto`
 * @type {Number}
 */
const WAIT_TIMEOUT = 8000;
/**
 * Options for `Nightmare` construction
 * @type {Object}
 */
const NIGHTMARE_OPTIONS = {
  show: true,
  switches: {
    'ignore-certificate-errors': true
  },
  waitTimeout: WAIT_TIMEOUT
};

/**
 * Options method for `looks-same` module
 * @param  {Object} options             The Context object (i.e. `this`)
 * @param  {Object} options.paths       The paths Map
 * @param  {String} options.imagesPath  The path to look for & save images
 * @return {Object}                     The constructed options Object literal
 */
const LOOKS_SAME_OPTIONS = paths => ({
  reference: paths.get('base'),
  current: paths.get('test'),
  diff: paths.get('diff'),
  highlightColor: '#FF8D33',
  tolerance: 5
});

const CAPTURE_VALUES_SET = new Set(['base', 'test', 'diff']);

module.exports = {
  WAIT_TIMEOUT,
  NIGHTMARE_OPTIONS,
  LOOKS_SAME_OPTIONS,
  CAPTURE_VALUES_SET
};
