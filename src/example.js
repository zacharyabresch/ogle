const { exec } = require('child_process');
const Ogle = require('./Ogle');

const options = {
  urls: {
    base: 'https://home.ti.dev/',
    test: 'https://home.ti.dev/?enableBetaLogo=true'
  }
};

const ogle = new Ogle(options);

ogle
  .capture()
  .then(() => {
    console.log('well done!');
    exec('imgcat ./ogle/images/diff.png');
  })
  .catch(err => console.error(err));
