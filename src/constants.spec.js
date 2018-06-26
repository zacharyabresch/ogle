const constants = require('./constants');

let underTest;
describe('constants', () => {
  describe('WAIT_TIMEOUT', () => {
    beforeEach(() => (underTest = constants.WAIT_TIMEOUT));

    it('is defined', () => expect(underTest).toBeDefined());
    it('equals 5000', () => expect(underTest).toEqual(5000));
  });
  describe('NIGHTMARE_OPTIONS', () => {
    beforeEach(() => (underTest = constants.NIGHTMARE_OPTIONS));
    it('is defined', () => expect(underTest).toBeDefined());
    it('equals the `nightmare` options object', () => {
      const expected = {
        show: true,
        switches: {
          'ignore-certificate-errors': true
        },
        waitTimeout: constants.WAIT_TIMEOUT
      };
      expect(underTest).toEqual(expected);
    });
  });
  describe('LOOK_SAME_OPTIONS', () => {
    beforeEach(() => {
      const imagesPath = './ogle/images';
      const pathMap = new Map([
        ['base', `${imagesPath}/base.png`],
        ['test', `${imagesPath}/test.png`],
        ['diff', `${imagesPath}/diff.png`]
      ]);
      underTest = constants.LOOKS_SAME_OPTIONS({ paths: pathMap });
    });
    it('is defined', () => expect(underTest).toBeDefined());
    it('equals the `looksSame` options object', () => {
      const expected = {
        reference: './ogle/images/base.png',
        current: './ogle/images/test.png',
        diff: './ogle/images/diff.png',
        highlightColor: '#FF8D33',
        tolerance: 1
      };
      expect(underTest).toEqual(expected);
    });
  });
});
