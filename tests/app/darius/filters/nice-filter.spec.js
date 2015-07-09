describe('Filters', function()
{

    var $filter;
    beforeEach(module('darius'));

    beforeEach(inject(function(_$filter_){
        $filter = _$filter_;
    }));

    describe('nice filter', function()
    {
        it('should make from Pascal case to space separated words', function() {
            var nice = $filter('nice');
            expect(nice('NiceFilter')).toBe('Nice Filter');

        });

        it('should not make from non Pascal case to space separated words', function() {
            var nice = $filter('nice');

            expect(nice('helloWorld')).not.toBe('Nice Filter');
        });
    });
});