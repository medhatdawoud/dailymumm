// Karma configuration
// Generated on Sun Nov 06 2016 12:33:19 GMT+0200 (Egypt Standard Time)

module.exports = function (config) {
  config.set({

    basePath: 'client/app',

    frameworks: ['jasmine'],

    files: [
      'bower_components/angular/angular.js',
      'bower_components/jquery/jquery.js',
      'bower_components/angular-cookies/angular-cookies.js',
      'bower_components/angular-resource/angular-resource.js',
      'bower_components/angular-sanitize/angular-sanitize.js',
      'bower_components/angular-ui-router/release/angular-ui-router.js',
      'bower_components/angular-rating/src/angular-rating.js',
      'bower_components/angular-translate/angular-translate.js',
      'bower_components/angular-translate-loader-url/angular-translate-loader-url.js',
      'bower_components/angular-mocks/angular-mocks.js',
      '../../node_modules/sinon/lib/sinon.js',
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
