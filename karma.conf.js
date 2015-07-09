module.exports = function(config) {
    config.set({
        basePath: '.',
        frameworks: ['jasmine'],
        files: [
            'bower_components/angular/angular.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'bower_components/angular-route/angular-route.js',
            'src/js/app/app.js',
            'src/js/app/darius/**/*.js',
            'src/js/**/*.html',
           // 'src/js/common/**/*.js',
            'tests/**/*.js'
        ],
        reporters: ['progress', 'coverage'],

        preprocessors: {
            'src/js/**/*.js': ['coverage'],
            'src/js/**/*.html': ['ng-html2js']
        },
        coverageReporter: {
            type : 'html',
            dir : 'coverage/'
        },
        port: 9876,

        plugins: [
            'karma-junit-reporter',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-coverage',
            'karma-ng-html2js-preprocessor',
            'karma-phantomjs-launcher'
        ],

        browsers: ['PhantomJS'],
        captureTimeout: 60000,
        singleRun: false
    });
};