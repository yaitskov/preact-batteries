const HtmlWebpackPlugin = require('html-webpack-plugin');

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
    extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"],
    modules: ['src', 'node_modules']
  },
  module: require('./webpack.modules.js'),
  plugins: [
    new HtmlWebpackPlugin()
  ]
};
