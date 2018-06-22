#!/usr/bin/env node
/* eslint global-require: "off" */

let Ogle;
if (require.main === module) {
  // command line invocation
  Ogle = require('./cli');
} else {
  // module invocation (i.e. required)
  Ogle = require('./Ogle');
}

module.exports = Ogle;
