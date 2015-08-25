"use strict";

angular.module('darius')
    .factory('profile', profileService);

function profileService($q, $timeout) {

    var nameModel = {
        name: 'Darius'
    };


    var getInfo = function() {
        var deferred = $q.defer();

        $timeout(function(){
            deferred.resolve(nameModel);
        }, 10000);

        return deferred.promise;
    };

    var simulateError = function() {
        var deferred = $q.defer();

        deferred.reject({
            message: 'Some error occurred'
        });
        return deferred.promise;
    };

    var setName = function(name) {
        if( !name ) {
            throw 'name set error';
        }
        nameModel.name = name;

    };

    return {
        simulateError: simulateError,
        getInfo: getInfo,
        setName: setName
    };
}
