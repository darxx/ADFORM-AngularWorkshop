"use strict";

angular.module('darius')
    .controller('mainCtrl', mainCtrl);

function mainCtrl(profile, $timeout) {
    var that = this;
    that.name = 'ConnectingToServer...';

    $timeout(function(){
        that.name = 'StillLoading...';
    }, 5000);

    profile.getInfo().then(function(info){
        that.name = info.name;
    });

}
