"use strict";

angular.module('darius')
    .controller('mainCtrl', mainCtrl);

function mainCtrl(profile, $timeout, $rootScope) {
    var that = this;
    that.name = 'Connecting To Server...';

    $timeout(function(){
        that.name = 'Still Loading...';
    }, 5000);

    this.init = function () {
        profile.getInfo().then(function(info){
            that.name = info.name;
        })
        .catch( function( e ) {
            showError(e.message);
        });
    };

    function showError( reason ) {
        $rootScope.$broadcast( 'displayAlert', {
            message: reason
        } );
    }

    this.makeError = function() {
        profile.simulateError().catch( function( e ) {
            showError(e.message);
        });
    };

    this.init();


}
