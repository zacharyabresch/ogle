const program = require('commander');
const ora = require('ora');
const { exec } = require('child_process');
const Ogle = require('./Ogle/');

program
  .version('1.0.0')
  .option('-b, --base <URL>', 'The base URL')
  .option('-t, --test <URL>', 'The test URL')
  .option('--imagesPath [./ogle/images]', 'The path for saving capture images')
  .parse(process.argv);

const spinner = ora('Ogling domains');
spinner.start();

const options = {
  urls: {
    base: program.base,
    test: program.test
  },
  imagesPath: program.imagesPath || undefined
};

const ogle = new Ogle(options);
ogle
  .capture()
  .then(() => {
    spinner.succeed('Ogling complete!').stop();
    exec('imgcat ./ogle/images/diff.png');
  })
  .catch(err => {
    console.error(err);
    spinner.stop();
  });
