// Karma configuration
// Generated on Wed Jun 19 2024 09:31:11 GMT+0200 (heure d’été d’Europe centrale)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://www.npmjs.com/search?q=keywords:karma-adapter
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],

    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },

    // list of files / patterns to load in the browser
    files: [
      { pattern: 'src/**/*.spec.ts', watched: false, type: 'module' } // Ajoutez cette ligne
    ],


    // list of files / patterns to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://www.npmjs.com/search?q=keywords:karma-preprocessor
    preprocessors: {
      'src/**/*.spec.ts': ['webpack'] // Ajoutez cette ligne
    },
    mime: {
      'text/x-typescript': ['ts', 'tsx'] // Ajoutez cette ligne
    },
    
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, './coverage/pfe'),
      reports: ['html', 'lcovonly', 'text-summary'],
      fixWebpackSourcePaths: true
    },
    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://www.npmjs.com/search?q=keywords:karma-reporter
    reporters: ['progress', 'kjhtml'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://www.npmjs.com/search?q=keywords:karma-launcher
    browsers: ['ChromeHeadless'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,
    
    restartOnFileChange: true,
    // Concurrency level
    // how many browser instances should be started simultaneously
    concurrency: Infinity
  })
}
