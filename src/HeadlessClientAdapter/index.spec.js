const HeadlessClientAdapter = require('./');

let underTest;
describe('HeadlessClientAdapter', () => {
  beforeEach(() => (underTest = new HeadlessClientAdapter()));
  afterEach(() => (underTest = null));

  it('is defined', () => expect(HeadlessClientAdapter).toBeDefined());

  it('#goto', () => {
    expect(() => underTest.goto()).toThrow();
  });
  it('#screenshot', () => {
    expect(() => underTest.goto()).toThrow();
  });
  it('#end', () => {
    expect(() => underTest.goto()).toThrow();
  });
});
