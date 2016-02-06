describe('calculator', function(){
   it('should add two numbers', function(){
      expect(add(1,2)).toBe(3);
   });
});

describe('my test', function(){
    it('should return 1', function(){
       expect(add(2,-1)).toBe(1);
    });
});

describe('JavaScript date', function(){

    beforeEach(module('ngMock'));
    it('should display happy new year message', function(){

        expect(angular).toBeTruthy();
        expect(angular.mock).toBeTruthy();
        expect(angular.mock.TzDate).toBeTruthy();

        var date = new angular.mock.TzDate(0, '2015-01-01T00:00:00Z');
        expect(date.getHours()).toBe(0);

    });
});