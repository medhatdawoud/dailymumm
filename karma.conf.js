// Karma configuration
// Generated on Sun Nov 06 2016 12:33:19 GMT+0200 (Egypt Standard Time)

module.exports = function(config) {
  config.set({

    basePath: 'client/app',

    frameworks: ['jasmine'],

    files: [
      'client/app/bower_components/angular/angular.js',
      'client/app/bower_components/angular-*/angular-*.js',
      'client/app/**/*.js',
      'client/test/**/*.js'
    ],

    exclude: [
    ],

    preprocessors: {
    },

    reporters: ['progress'],

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: true,

    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],

    singleRun: false,

    concurrency: Infinity
  })
}
