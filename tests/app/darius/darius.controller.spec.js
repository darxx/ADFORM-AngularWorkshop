"use strict";

describe('Module darius controller - mainCtrl', function() {

    beforeEach(module('darius'));

    var mainCtrl,
        $q,
        deferred,
        $timeout,
        scope;


    var profileService = {
        getInfo: function() {
            deferred = $q.defer();
            return deferred.promise;
        },
        simulateError: function() {
            deferred = $q.defer();
            return deferred.promise;
        }
    };

    beforeEach(inject(function(_$rootScope_, _$q_, _$controller_, _$timeout_){
        scope = _$rootScope_.$new();
        $q = _$q_;
        $timeout = _$timeout_;
        mainCtrl = _$controller_('mainCtrl',{
            profile: profileService
        });
    }));


    it('should have scope.name', function(){
        expect(mainCtrl.name).toBeDefined();
    });

    it('should execute timeout and set name', function() {
        $timeout.flush();
        expect(mainCtrl.name).not.toBe('Test');
    });

    it('should have profile Service', function(){
        spyOn(profileService, 'getInfo').andCallThrough();

        mainCtrl.init();
        deferred.resolve({name: 'Test'});

        expect(profileService.getInfo).toHaveBeenCalled();
        expect(mainCtrl.name).not.toBe('Test');

        scope.$root.$digest();
        expect(mainCtrl.name).toBe('Test');
    });

    it('should have error handling', function(){
        spyOn(profileService, 'getInfo').andCallThrough();
        mainCtrl.init();
        deferred.reject({messages: 'Error'});
        scope.$root.$digest();

        expect(profileService.getInfo).toHaveBeenCalled();
    });

    it('should have error handling on magic button', function(){
        spyOn(profileService, 'simulateError').andCallThrough();
        mainCtrl.makeError();
        deferred.reject({messages: 'Error'});

        scope.$root.$digest();
        expect(profileService.simulateError).toHaveBeenCalled();
    });

});