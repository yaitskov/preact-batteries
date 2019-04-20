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
              ["@babel/plugin-proposal-function-bind"],
              ['@babel/proposal-class-properties',
               {
                 'loose': false
               }
              ],
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
    new HtmlWebpackPlugin()
  ]
};
