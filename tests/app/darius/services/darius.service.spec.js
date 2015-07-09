"use strict";

describe('Module darius Service profile', function () {

    beforeEach(module('darius'));

    var profileService,
        $q;

    beforeEach(inject(function (_profile_, _$q_) {
        profileService = _profile_;
        $q = _$q_;


    }));

    it('should have method getInfo', function () {
        expect(angular.isFunction(profileService.getInfo)).toBe(true);
    });

    it('should name after time', function () {
        var deferred = $q.defer();

        spyOn(profileService, "getInfo").andReturn(deferred.promise);
        var info = profileService.getInfo()

        deferred.resolve({name:'Darius'});

        expect(profileService.getInfo).toHaveBeenCalled();

        expect(info.$$state.value.name).toBe('Darius');

    });

});