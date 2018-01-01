const webpack = require('webpack');
const path    = require('path');

const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: {
    index: path.resolve(__dirname, 'src/index.js')
  },

  output: {
    filename: 'float-sidebar.min.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'umd',
    libraryExport: 'default',
    library: 'FloatSidebar'
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
  },

  plugins: [
    ['production', new UglifyJsPlugin()]
  ]
    .filter(([env, plugin]) => process.env.NODE_ENV == env)
    .map   (([env, plugin]) => plugin)
}