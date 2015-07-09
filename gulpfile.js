var gulp = require('gulp'),
    runSeq = require('run-sequence'),
    bower = require('gulp-bower');

var eslint = require('gulp-eslint'),
    plato = require('gulp-plato');

//server modules
var opn = require('opn'),
    connect = require('connect'),
    serveStatic = require('serve-static'),
    serveIndex = require('serve-index'),
    http = require('http'),
    history = require('connect-history-api-fallback');

var config = {
    ui: {
        js: [
            './src/js/**/*.js'
        ]
    },
    buildDir: './src/',
    port: '8888'
};

gulp.task('bower',function() {
    bower();
});

gulp.task( 'connect', function() {
    var app = connect()
        .use(history())
        .use(serveStatic(config.buildDir))
        .use( '/bower_components', serveStatic( 'bower_components' ) )
        .use(serveIndex( config.buildDir ));

    http.createServer( app )
        .listen( config.port )
        .on( 'listening', function() {
            opn( 'http://localhost:'+ config.port);
            console.log( 'Started connect web server on http://localhost:' + config.port );
        } );
} );


gulp.task('lint', function () {
    return gulp.src(config.ui.js)
        .pipe(eslint({
            "rules":{
                'camelcase': 1,
                'no-comma-dangle': 2,
                'quotes': 0,
                'strict': 0,
                'no-use-before-define': 0,
                'global-strict': [2, 'always'],
                "no-unused-vars": [0, {
                    "vars": "all",
                    "args": "after-used"
                }]
            },
            globals: {
                'angular': true,
                '$':true,
                document: true,
                window: true
            },
            useEslintrc: true
        }))
        .pipe(eslint.format())
        .pipe(eslint.failOnError());
});

gulp.task('plato', function () {
    return gulp.src(config.ui.js)
        .pipe(plato('report', {
            jshint: {
                options: {
                    node: true,
                    strict: true,
                    sub: true,
                    predef: ['angular']
                }
            },
            complexity: {
                trycatch: true
            }
        }));
});

gulp.task( 'watch', function() {
    gulp.watch(
        [
            config.ui.js[0]
        ],
        ['lint']
    );

});

gulp.task('default',['watch'], function() {
    return runSeq('connect', 'lint');
});