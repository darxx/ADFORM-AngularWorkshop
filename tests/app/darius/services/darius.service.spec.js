"use strict";

describe('Module darius Service profile', function () {

    beforeEach(module('darius'));

    var profileService,
        $q,
        $timeout;

    beforeEach(inject(function (_profile_, _$q_, _$timeout_) {
        profileService = _profile_;
        $q = _$q_;
        $timeout = _$timeout_;
    }));

    it('should name after time', function () {
        var deferred = $q.defer();

        spyOn(profileService, "getInfo").andReturn(deferred.promise);
        var info = profileService.getInfo();

        deferred.resolve({name:'Darius'});

        expect(profileService.getInfo).toHaveBeenCalled();

        expect(info.$$state.value.name).toBe('Darius');

    });

    it('should return name after time', function () {
        var info = profileService.getInfo();
        $timeout.flush();

        expect(info.$$state.value.name).toBe('Darius');
    });

    it('should Throw error if name not set ', function () {
        var e = function(){
            profileService.setName()
        };
        expect(e).toThrow();
    });

    it('should set name', function () {
        var info = profileService.getInfo(),
            name = 'Test';

        profileService.setName(name);
        $timeout.flush();

        expect(info.$$state.value.name).toBe(name);

    });

    it('should return error message from simulateError', function () {
        var info = profileService.simulateError(),
            error = {
                message: 'Some error occurred'
            };

        expect(info.$$state.value.message).toBe(error.message);

    });



});