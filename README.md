# `ogle`

Ogle a pair(s) of domains and find the `diff`erences. (ya' know, like that bar-crack matching game).

### TODO:

- [ ] Error handling
- [ ] Argument validation
- [ ] Configure file (i.e. `.oglerc` or something)
- [ ] Documentation on GH pages
- [ ] Improved configuration options
-

## Installation

- Clone this repository
- Run:
  - `npm i`
  - `npm run build`
    - To "watch" the build: `npm start`
  - `npm link`

Eventually, this module will be released under `@thoughtindustries/ogle` once it's been green-lit for production use.

## Usage

### CLI

```
$ ogle --help

  Usage: ogle [options]

  Options:

    -V, --version                     output the version number
    -b, --base [URL]                  The base URL
    -t, --test [URL]                  The test URL
    -n, --name [String]               The identifier of the URL pair
    -i, --imagesPath [./ogle/images]  The path for saving capture images
    -u,--urls [Path to JSON file]     The source data as JSON
    -h, --help                        output usage information
```

#### Examples:

- Test a single URL pair:
  - `ogle -b https://google.com -t https://google.jp`
  - with a name: `ogle -b https://google.com -t https://google.jp -n google`
- Test a JSON file of URL pairs (see `urls.json`):
  - `ogle -u /path/to/urls.json`

### Module

Check out `example.js` for up to date details but:

```
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
```

## Development

- Want to contribute? Awesome! Submit a pull request!
- Find an issue? Got a feature/enhancement idea? Submit an issue!
