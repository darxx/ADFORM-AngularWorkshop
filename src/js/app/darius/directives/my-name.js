"use strict";
angular.module('darius')
    .directive('myName', myNameDirective);

function myNameDirective () {
    return {
        restrict: 'E',
        template: 'Hi name is <strong>{{main.name | nice}}</strong>'
    };
}
