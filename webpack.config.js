const webpack = require('webpack');
const path    = require('path');
const pkg     = require('./package.json');

const banner = [
  `${pkg.name} - ${pkg.description}`,
  `@version v${pkg.version}`,
  `@link ${pkg.homepage}`,
  `@author ${pkg.author}`,
  `@license ${pkg.license}`,
].join('\n')

module.exports = {
  mode: 'production',

  devtool: 'source-map',

  entry: {
    'float-sidebar': path.resolve(__dirname, 'src/index.js'),
  },

  output: {
    filename: '[name].js',
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
    new webpack.BannerPlugin(banner)
  ]
}