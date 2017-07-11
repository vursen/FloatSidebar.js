const webpack = require('webpack');
const path    = require('path');

module.exports = {
  entry: 'src/StickySidebar.js',

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, `dist`),
  },

  module: {
    noParse: /vendor\//,
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  }
}