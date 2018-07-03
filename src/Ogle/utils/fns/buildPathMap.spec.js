const { buildPathMap } = require('./');

const IMAGES_PATH = './ogle/images';

describe('#buildPathMap', () => {
  it('is defined', () => expect(buildPathMap).toBeDefined());

  describe('with parameters', () => {
    let underTest;
    beforeEach(() => (underTest = buildPathMap(IMAGES_PATH)));

    it('returns a Map', () => expect(underTest).toBeInstanceOf(Map));
    it('returns the populated Map', () => {
      const expected = new Map([
        ['base', `${IMAGES_PATH}/base.png`],
        ['test', `${IMAGES_PATH}/test.png`],
        ['diff', `${IMAGES_PATH}/diff.png`]
      ]);
      expect(underTest).toEqual(expected);
    });
  });
});
