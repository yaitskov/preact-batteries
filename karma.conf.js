module.exports = function(config) {
  config.set({
    browsers: ['ChromeHeadless'],
    frameworks: ['jasmine'],
    files: [
      "src/**/*.spec.tsx"
    ],
    plugins : ['karma-webpack', 'karma-jasmine', 'karma-chrome-launcher'],
    preprocessors: {
      "src/**/*.spec.tsx": ['webpack']
    },
    webpack: {
      mode: 'development',
      resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".tsx", ".js"]
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
                  ['@babel/plugin-proposal-throw-expressions'],
                  ['@babel/proposal-object-rest-spread'],
                  ['@babel/plugin-syntax-dynamic-import'],
                  ["@babel/transform-react-jsx", { "pragma": "h" }]
                ]
              }
            }
          }
        ]
      }
    }
  });
};
