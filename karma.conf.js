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
        extensions: [".tsx", ".js"],
        modules: ['src', 'node_modules']
      },
      module: require('./webpack.modules.js')
    }
  });
};
