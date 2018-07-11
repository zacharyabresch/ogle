const path = require('path');
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');

const entry = {
  main: path.resolve(__dirname, 'src/index.js'),
  example: path.resolve(__dirname, 'src/example.js'),
  cli: path.resolve(__dirname, 'src/cli.js')
};

module.exports = {
  target: 'node',
  externals: [nodeExternals()],
  entry,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [{ test: /\.js$/, exclude: /node_modules/, use: ['babel-loader'] }]
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: '#!/usr/bin/env node',
      raw: true,
      entryOnly: true
    })
  ]
};
