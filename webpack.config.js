const webpack = require('webpack');
const path    = require('path');

module.exports = {
  entry: {
    StickySidebar: path.resolve(__dirname, 'src/StickySidebar.js')
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, `dist`),
    libraryTarget: 'umd',
    libraryExport: 'default',
    library: 'StickySidebar'
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