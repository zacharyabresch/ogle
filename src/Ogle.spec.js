const Ogle = require('./Ogle');

let ogle;

const options = {
  base: 'https://home.ti.dev/',
  test: 'https://home.ti.dev/?enableBetaLogo=true',
  nightmare
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
      it('sets @base', () => expect(ogle.base).toBe('https://home.ti.dev/'));
      it('sets @test', () =>
        expect(ogle.test).toBe('https://home.ti.dev/?enableBetaLogo=true'));
      it('sets @imagesPath', () =>
        expect(ogle.imagesPath).toBe('/ogle/images'));
      it('sets @nightmare', () => expect(ogle.nightmare).toBe(nightmare));
    });

    describe('#capture', () => {
      it('is defined', () => expect(ogle.capture).toBeDefined());
    });

    describe('#compare', () => {
      it('is defined', () => expect(ogle.compare).toBeDefined());
    });
  });
});
