// Karma configuration
// Generated on Sun Nov 06 2016 12:33:19 GMT+0200 (Egypt Standard Time)

module.exports = function (config) {
  config.set({

    basePath: 'client/app',

    frameworks: ['jasmine'],

    files: [
      '../../node_modules/angular/angular.js',
      '../../node_modules/jquery/dist/jquery.js',
      '../../node_modules/angular-cookies/angular-cookies.js',
      '../../node_modules/angular-resource/angular-resource.js',
      '../../node_modules/angular-sanitize/angular-sanitize.js',
      '../../node_modules/angular-ui-router/release/angular-ui-router.js',
      '../../node_modules/angular-rating/src/angular-rating.js',
      '../../node_modules/angular-translate/dist/angular-translate.js',
      '../../node_modules/angular-translate-loader-url/angular-translate-loader-url.js',
      '../../node_modules/angular-mocks/angular-mocks.js',
      'app.module.js',
      'app.routes.js',
      'components/**/*.js',
      'directives/**/*.js',
      'filters**/*.js',
      'pages/**/*.js',
      'services/**/*.js',
      '../test/**/*.js'
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
    browsers: ['PhantomJS'],//, 'Firefox', 'Chrome'],

    plugins: [
      'karma-jasmine',
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-phantomjs-launcher'
    ],

    singleRun: false,

    concurrency: Infinity
  })
}
