const Ogle = require('./Ogle');

const options = {
  urls: { base: 'https://google.com', test: 'https://google.jp' }
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
  })
  .catch(err => console.error(err));
