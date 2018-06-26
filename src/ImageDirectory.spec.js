const fs = require('fs');
const mockFS = require('mock-fs');
const ImageDirectory = require('./ImageDirectory');

const THE_PATH = './ogle/images';

describe.only('ImageDirectory', () => {
  afterAll(() => mockFS.restore());

  it('is defined', () => expect(ImageDirectory).toBeDefined());

  describe('with `imagesPath`', () => {
    let underTest;
    beforeEach(() => {
      mockFS({ './': {} });
      underTest = new ImageDirectory(THE_PATH);
    });
    afterEach(mockFS.restore);

    describe('#mkdir', () => {
      it('makes the directory `./ogle/images` by default', () => {
        underTest.mkdir();
        expect(fs.existsSync(THE_PATH)).toBe(true);
      });
      it('makes the directory `./faces/and/stuff` with parameter', () => {
        const testPath = './faces/and/stuff';
        underTest = new ImageDirectory(testPath);
        underTest.mkdir();
        expect(fs.existsSync(testPath)).toBe(true);
      });
    });
  });
});
