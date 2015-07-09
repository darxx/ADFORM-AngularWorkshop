"use strict";

angular.module('darius')
    .factory('profile', profileService);

function profileService($q, $timeout) {

    var getInfo = function() {
        var deferred = $q.defer();

        $timeout(function(){
            deferred.resolve({
                name: 'Darius'
            });
        }, 10000);


        return deferred.promise;
    };

    return {
        getInfo: getInfo
    };
}
