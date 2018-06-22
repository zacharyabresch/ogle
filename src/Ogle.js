const debug = require("debug")("Ogle");

/** Class for visual diffing between domains */
class Ogle {
  /** Creates Ogle instance */
  constructor({ base, test } = {}) {
    debug("constructing");
    if (!base || !test) {
      throw new Error("required params not provided");
    }
    this.base = base;
    this.test = test;
  }

  capture() {}
}

module.exports = Ogle;
