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
  describe('with invalid params', () => {
    it('should throw error', () => {
      expect(() => {
        ogle = new Ogle();
      }).toThrow();
    });
  });
  describe('with valid params', () => {
    beforeEach(() => {
      ogle = new Ogle(options);
    });
    it('is an instance of `Ogle`', () => expect(ogle).toBeInstanceOf(Ogle));
    it('is defined', () => expect(ogle).toBeDefined());

    describe('#constructor', () => {
      it('sets @urls', () => {
        const expected = new Map([
          ['base', options.urls.base],
          ['test', options.urls.test]
        ]);
        expect(ogle.urls).toEqual(expected);
      });
    });

    describe('#capture', () => {
      it('is defined', () => expect(ogle.capture).toBeDefined());
    });

    describe('#compare', () => {
      it('is defined', () => expect(ogle.compare).toBeDefined());
    });
  });
});
