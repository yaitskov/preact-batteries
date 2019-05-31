const fPath = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MergeAndFlushI18nPlugin = require('./merge-and-flush-i18n');
const BrotliPlugin = require('brotli-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const makeWebPackModule = require('./webpack.modules.js');
const translationPlugin = require('./translation-plugin.js');

const state = new translationPlugin.newState();
const visitorFactory = translationPlugin.makeVisitorFactory(
  state,
  {
    rootPrefixLength: `${fPath.dirname(__filename)}${fPath.sep}src${fPath.sep}`.length
  });

module.exports = {
  entry: "./src/bootstrap.tsx",
  output: {
    filename: "./bundle.js"
  },
  mode: 'development',
  // Enable sourcemaps for debugging webpack's output.
  // devtool: "source-map",
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js", '.css'],
    modules: ['src', 'node_modules']
  },
  module: makeWebPackModule([ visitorFactory ]),
  plugins: [
    new HtmlWebpackPlugin(),
    new MergeAndFlushI18nPlugin(state),
    new CompressionPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 1024,
      minRatio: 0.8
    }),
    new BrotliPlugin({
      asset: '[path].br[query]',
      test: /\.js$|\.css$|\.html$/,
      threshold: 1024,
      minRatio: 0.8
    })
  ]
};
