const looksSame = require('looks-same');

class LooksSameAdapter {
  constructor(differ = looksSame) {
    this.differ = differ;
  }

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
