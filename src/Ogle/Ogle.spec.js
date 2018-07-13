const Ogle = require('./Ogle');

let ogle;

const options = {
  urls: {
    base: 'https://home.ti.dev/',
    test: 'https://home.ti.dev/?enableBetaLogo=true'
  }
};
const nullit = () => {
  ogle = null;
};

describe('Ogle', () => {
  afterEach(nullit);
  beforeEach(() => {
    ogle = new Ogle(options);
  });
  it('is an instance of `Ogle`', () => expect(ogle).toBeInstanceOf(Ogle));
  it('is defined', () => expect(ogle).toBeDefined());

  describe('#capture', () => {
    it('is defined', () => expect(ogle.capture).toBeDefined());
  });

  describe('#compare', () => {
    it('is defined', () => expect(ogle.compare).toBeDefined());
  });
});
