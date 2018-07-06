module.exports = {
  extends: ['airbnb-base', 'prettier'],
  env: {
    jest: true
  },
  rules: {
    'no-console': 'off',
    quotes: ['error', 'single'],
    'comma-dangle': ['error', 'never']
  }
};
