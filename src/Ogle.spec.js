const Ogle = require('./Ogle');

let ogle;
describe('Ogle', () => {
  beforeEach(() => {
    ogle = new Ogle();
  });
  afterEach(() => {
    ogle = null;
  });

  it('is an instance of `Ogle`', () => expect(ogle).toBeInstanceOf(Ogle));
  it('is defined', () => expect(ogle).toBeDefined());
});
