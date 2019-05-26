const path = require('path');
const translationPlugin = require('./translation-plugin.js');

module.exports = {
  rules: [
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
            ['@babel/plugin-proposal-throw-expressions'],
            ['@babel/proposal-object-rest-spread'],
            ['@babel/plugin-syntax-dynamic-import'],
            ["@babel/transform-react-jsx", { "pragma": "h" }],
            translationPlugin
          ]
        }
      }
    }
  ]
};
