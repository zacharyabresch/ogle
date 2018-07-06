const { exec } = require('child_process');
const Ogle = require('./Ogle');

const options = {
  urls: {
    base: 'https://home.ti.dev/',
    test: 'https://home.ti.dev/?enableBetaLogo=true'
  }
};

// const options = {
//   urls: [
//     { name: 'google', base: 'https://google.com', test: 'https://google.jp' },
//     { name: 'amazon', base: 'https://amazon.com', test: 'http://amazon.co.uk' }
//   ]
// };

const ogle = new Ogle(options);

ogle
  .capture()
  .then(() => {
    console.log('well done!');
    exec('imgcat ./ogle/images/diff.png');
  })
  .catch(err => console.error(err));
