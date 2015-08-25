var gulp = require('gulp'),
    runSeq = require('run-sequence'),
    bower = require('gulp-bower');

var eslint = require('gulp-eslint'),
    plato = require('gulp-plato'),
    karma = require('karma').server;

//server modules
var opn = require('opn'),
    connect = require('connect'),
    serveStatic = require('serve-static'),
    serveIndex = require('serve-index'),
    http = require('http'),
    history = require('connect-history-api-fallback');

var usemin = require('gulp-usemin'),
    minifyCss = require('gulp-minify-css'),
    minifyHtml = require('gulp-minify-html'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    ngAnnotate = require('gulp-ng-annotate'),
    concat = require('gulp-concat'),
    del = require('del'),
    reporter = require('gulp-eslint-teamcity-formatter');

var config = {
    ui: {
        js: [
            './src/js/**/*.js'
        ],
        templates: [
            './src/js/app/**/*.html',
            '!./src/index.html'
        ],
        index: './src/index.html',
        maps: './maps/',
        appMinName: 'app.min.js'
    },
    favIcon: './src/favicon.ico',
    buildDir: './build/',
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
                "_": true,
                '$':true,
                document: true,
                window: true
            },
            useEslintrc: true
        }))
        .pipe(eslint.format())
        .pipe(eslint.failOnError());
});

gulp.task('lintTC', function () {
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
                'jQuery':false,
                'angular': true,
                "_": true,
                '$':true,
                document: true,
                window: true
            },
            useEslintrc: true
        }))
        .pipe(eslint.format(reporter))
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

gulp.task('test', function(done) {
    karma.start({
        configFile:  __dirname + '/karma.conf.js',
        singleRun: false
    }, done);

});

gulp.task('testBuild', function(done) {
    karma.start({
        configFile:  __dirname + '/karma.conf.js',
        singleRun: true
    }, done);
});

gulp.task('watch', function() {
    gulp.watch(
        [
            config.ui.js[0]
        ],
        ['lint','compileSoft','templates']
    );

    gulp.watch(
        [
            config.ui.templates
        ],
        [ 'compileSoft', 'templates' ]
    );

});

gulp.task('compileSoft',['app-js'], function () {
    return gulp.src(config.ui.index)
        .pipe(usemin({
            css: [minifyCss(), 'concat'],
            inlinejs: [uglify()],
            inlinecss: [minifyCss(), 'concat']
        }))
        .pipe(gulp.dest(config.buildDir));
});

gulp.task('compileHard', ['app-js'], function () {
    return gulp.src(config.ui.index)
        .pipe(usemin({
            css: [minifyCss(), 'concat'],
            html: [minifyHtml({empty: true})],
            inlinejs: [uglify()],
            inlinecss: [minifyCss(), 'concat']
        }))
        .pipe(gulp.dest(config.buildDir));
});

gulp.task('app-js', function () {
    gulp.src(config.ui.js)
        .pipe(sourcemaps.init())
        .pipe(ngAnnotate({
            remove: true,
            add: true,
            single_quotes: true,
            dynamic: true
        }))
        .pipe(concat(config.ui.appMinName))
        .pipe(uglify())
        .pipe(sourcemaps.write(config.ui.maps, {
            includeContent: true
        }))
        .pipe(gulp.dest(config.buildDir+'/js/app/'))
});

gulp.task('templates',['mv-files'], function () {

    return gulp.src(config.ui.templates)
        .pipe(gulp.dest(config.buildDir+'/js/app/'));

});
gulp.task('mv-files',function () {
    return gulp.src(config.favIcon)
        .pipe(gulp.dest(config.buildDir));
});


gulp.task('clean', function(cb) {
    del(['./build/*', './coverage/*', './report/*'], cb);
});

gulp.task('production', function() {
    return runSeq('clean','compileHard','templates', 'lintTC', 'plato', 'testBuild');
});


gulp.task('default',['watch'], function() {
    return runSeq('clean','compileSoft','templates','connect', 'lint', 'test');
});
