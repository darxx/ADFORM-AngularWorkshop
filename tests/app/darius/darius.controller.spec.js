"use strict";

describe('Module darius controller - mainCtrl', function() {

    beforeEach(module('darius'));

    var mainCtrl,
        q,
        deferred,
        scope;


    var profileService = {
        getInfo: function() {
            deferred = q.defer();
            return deferred.promise;
        }
    };

    beforeEach(inject(function(_$rootScope_, _$q_, _$controller_){
        scope = _$rootScope_.$new();
        q = _$q_;
        mainCtrl = _$controller_('mainCtrl',{
            profile: profileService
        });
    }));


    it('should have scope.name', function(){
        expect( mainCtrl.name).toBeDefined();
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

});