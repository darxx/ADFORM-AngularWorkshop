"use strict";

describe('Directive: error messages', function () {

    beforeEach(module('darius'));

    var element,
        $rootScope,
        compiled,
        $timeout;

    module(function($provide) {
        $provide.value('nice', mockTranslateFilter);
    });

    beforeEach(inject(function (_$rootScope_, _$timeout_) {
        $rootScope = _$rootScope_;
        $timeout = _$timeout_;
    }));

    beforeEach(inject(function ($compile) {
        element = angular.element('<error-messages></error-messages>');
        compiled = $compile(element)($rootScope);
        $rootScope.$digest();
    }));

    it('should exist', function() {
        expect(compiled.hasClass('notification')).toBe(true);
    });

    it('should show error message and close', function() {
        var error = {
            message: 'some error'
        };

        $rootScope.$emit('displayAlert', error);

        $rootScope.$digest();

        expect(compiled.find('span').text()).toContain(error.message);
        $rootScope.$$childHead.close('alert1');

        $rootScope.$digest();

        expect(compiled.find('button').length).toEqual(0);

    });

    it('should show error message after time', function() {
        $rootScope.$emit('displayAlert', {
            message: 'wow some error',
            closeAfter: 3000
        });

        $timeout.flush();

        $rootScope.$digest();

        expect(compiled.find('button')).toBeDefined();
    });

});