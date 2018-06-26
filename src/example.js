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
  .then(() => console.log('well done!'))
  .catch(err => console.error(err));
