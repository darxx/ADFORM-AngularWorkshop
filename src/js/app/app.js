"use strict";

angular.module('darius', ['ngRoute'])
    .config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'js/app/darius/darius.html',
            controller: 'mainCtrl'
        })
        .when('/next', {
            templateUrl: 'js/app/darius/next.html',
            controller: 'mainCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });

    $locationProvider.html5Mode(true);
});
