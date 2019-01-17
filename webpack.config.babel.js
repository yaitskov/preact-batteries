const HtmlWebpackPlugin = require('html-webpack-plugin');
//import HtmlWebpackPlugin from 'html-webpack-plugin';
//const ReplacePlugin = require('webpack-plugin-replace');
const ReplaceInFileWebpackPlugin = require('replace-in-file-webpack-plugin');


module.exports = {
  entry: "./src/bootstrap.tsx",
  output: {
    filename: "./bundle.js"
  },
  mode: 'development',
  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
  },
  module: {
    rules: [
      // Handle .ts and .tsx file via ts-loader.
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [['@babel/typescript', { jsxPragma: "h" }]],
            plugins: [
              ['@babel/proposal-class-properties'],
              ['@babel/proposal-object-rest-spread'],
              ['@babel/plugin-syntax-dynamic-import'],
              ["@babel/transform-react-jsx", { "pragma": "h" }]
            ]
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new ReplaceInFileWebpackPlugin([{
      dir: 'dist',
      files: ['bundle.js'],
      rules: [
        {
          search: /=function[(]([^)]+[)])/g,
          replace: (m) => '=(' + /=function[(]([^)]+[)])/.exec(m)[1] + '=>'
        }
      ]
    }])
  ]
};
