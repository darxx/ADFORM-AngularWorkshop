"use strict";

angular.module('darius')
    .controller('mainCtrl', mainCtrl);

function mainCtrl(profile, $timeout) {
    var that = this;
    that.name = 'Connecting To Server...';

    $timeout(function(){
        that.name = 'Still Loading...';
    }, 5000);

    profile.getInfo().then(function(info){
        that.name = info.name;
    });

}
