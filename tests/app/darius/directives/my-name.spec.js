"use strict";

describe('Directive: my name', function () {

    beforeEach(module('darius'));

    var element,
        scope;

    module(function($provide) {
        $provide.value('nice', mockTranslateFilter);
    });

    beforeEach(inject(function ($rootScope) {
        scope = $rootScope.$new();
    }));

    it('should show name', inject(function ($compile) {
        scope.main = {
            name: 'ok'
        };
        element = angular.element('<my-name></my-name>');
        element = $compile(element)(scope);

        scope.$digest();

        expect(element.text()).toContain('ok');

    }));
});