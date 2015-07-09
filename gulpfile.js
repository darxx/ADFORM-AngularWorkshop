var gulp = require('gulp'),
    runSeq = require('run-sequence'),
    bower = require('gulp-bower');

//server module
var opn = require('opn'),
    connect = require('connect'),
    serveStatic = require('serve-static'),
    serveIndex = require('serve-index'),
    http = require('http'),
    history = require('connect-history-api-fallback');

var config = {
    buildDir: './app/',
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

gulp.task('default', function() {
    return runSeq('bower', 'clean-all', ['copy-fonts', 'build-index', 'copy-images', 'copy-webworkers'], 'watch', 'karma');
});

gulp.task('default',['connect']);
