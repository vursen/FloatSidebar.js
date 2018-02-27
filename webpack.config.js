const webpack = require('webpack');
const path    = require('path');
const pkg     = require('./package.json');

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const banner = [
  `${pkg.name} - ${pkg.description}`,
  `@version v${pkg.version}`,
  `@link ${pkg.homepage}`,
  `@author ${pkg.author}`,
  `@license ${pkg.license}`,
].join('\n')

module.exports = {
  mode: 'production',

  entry: {
    'float-sidebar': path.resolve(__dirname, 'src/index.js'),
    'float-sidebar.min': path.resolve(__dirname, 'src/index.js'),
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

  optimization: {
    minimize: false
  },

  plugins: [
    new UglifyJsPlugin({
      include: /\.min\.js$/,
    }),
    new webpack.BannerPlugin(banner)
  ]
}
