module.exports = {
  extends: ['airbnb-base', 'prettier'],
  env: {
    node: true,
    es6: true,
    jest: true
  },
  plugins: ['prettier'],
  rules: {
    'no-console': 'off',
    quotes: ['error', 'single'],
    'comma-dangle': ['error', 'never']
  }
};
