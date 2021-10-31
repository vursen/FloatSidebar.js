const webpack = require('webpack');
const path    = require('path');
const pkg     = require('./package.json');

const TerserPlugin = require('terser-webpack-plugin');

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
    'float-sidebar': path.resolve(__dirname, 'src/float-sidebar.js'),
    'float-sidebar.min': path.resolve(__dirname, 'src/float-sidebar.js'),
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
    minimize: true,
    minimizer: [
      new TerserPlugin({
        include: /\.min\.js$/,
        extractComments: false
      })
    ],
  },

  plugins: [
    new webpack.BannerPlugin(banner)
  ]
}
