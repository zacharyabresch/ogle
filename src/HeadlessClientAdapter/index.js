/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
const NOT_DEFINED_MESSAGE = 'Method must be defined in inherited class';

/**
 * Abstract client adapter
 * Used for inheritance and dependepncy inversion
 * Not to be constructed, only extended
 */
class HeadlessClientAdapter {
  goto(url = null) {
    throw NOT_DEFINED_MESSAGE;
  }

  screenshot(path = null) {
    throw NOT_DEFINED_MESSAGE;
  }

  end() {
    throw NOT_DEFINED_MESSAGE;
  }
}

module.exports = HeadlessClientAdapter;
