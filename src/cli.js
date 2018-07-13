const fs = require('fs');
const program = require('commander');
const ora = require('ora');
const Ogle = require('./Ogle/');

const REQUIRED_FOR_URL_PAIR = ['base', 'test'];
const isString = s => typeof s === 'string' || s instanceof String;

program
  .version('1.0.0')
  .option('-b, --base [URL]', 'The base URL')
  .option('-t, --test [URL]', 'The test URL')
  .option('-n, --name [String]', 'The identifier of the URL pair')
  .option(
    '-i, --imagesPath [./ogle/images]',
    'The path for saving capture images'
  )
  .option('-u,--urls [Path to JSON file]', 'The source data as JSON')
  .parse(process.argv);

const generateUrls = p => {
  let urls;
  const hasElement = element => Object.keys(p).includes(element);
  const hasAllRequiredForURLPair = REQUIRED_FOR_URL_PAIR.every(hasElement);
  const hasURLs = hasElement('urls') && isString(p.urls);

  if (hasAllRequiredForURLPair && !hasURLs) {
    urls = {
      base: program.base,
      test: program.test,
      name: program.name ? program.name : () => {}
    };
  } else if (hasURLs) {
    urls = JSON.parse(fs.readFileSync(program.urls, 'utf8'));
  } else {
    console.error(
      'You must pass either a valid `urls` file or a base & test URL'
    );
    process.exit(1);
  }
  return urls;
};

const urls = generateUrls(program);
const imagesPath = program.imagesPath || undefined;
const options = { urls, imagesPath };

const spinner = ora('Ogling domains');
spinner.start();

const ogle = new Ogle(options);
ogle
  .capture()
  .then(() => {
    spinner.succeed('Ogling complete!').stop();
  })
  .catch(err => {
    console.error(err);
    spinner.stop();
  });
