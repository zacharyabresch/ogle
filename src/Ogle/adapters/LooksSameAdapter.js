const looksSame = require('looks-same');

/**
 * Adapter class to the `looks-same` module
 */
class LooksSameAdapter {
  /**
   * Creates a LooksSameAdapter instance
   * @param  {Object} differ Differ dependency injected
   * @return {LooksSameAdapter}
   */
  constructor(differ = looksSame) {
    this.differ = differ;
  }

  /**
   * Creates the diff image
   * @param  {Object} options The `looks-same` options
   * @return {Promise}
   */
  createDiff(options) {
    return new Promise((resolve, reject) => {
      this.differ.createDiff(options, err => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}

module.exports = LooksSameAdapter;
