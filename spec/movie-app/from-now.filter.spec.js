describe('From Now Filter', function(){

    var fromNow;

    beforeEach(module('movieApp'));

    beforeEach(inject(function($filter){
        fromNow = $filter('fromNow');
    }));

    it('should return throw error for undefined', function(){

        expect(fromNow()).toBe('N/A');
    });

    it('should return same value for invalid date', function() {

        expect(fromNow('test')).toBe('test');
    });

    it('shoudl return value of one year ago', function() {

        var value = new angular.mock.TzDate(0, '2014-07-01');
        var baseDate = new angular.mock.TzDate(0, '2015-07-01');
        expect(fromNow(value, baseDate)).toBe('1 year ago');
    });

    it('shoudl return value of 2 years ago', function() {

        var value = new angular.mock.TzDate(0, '2014-07-01');
        var baseDate = new angular.mock.TzDate(0, '2016-07-01');
        expect(fromNow(value, baseDate)).toBe('2 years ago');
    });

});