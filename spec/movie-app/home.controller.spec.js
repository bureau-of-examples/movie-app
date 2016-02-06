describe('Home Controller', function () {

    var results = ["tt0076759", "tt0080684", "tt0086190"];

    var $scope, $interval;

    beforeEach(module('movieApp'));

    //mock PopularMovies.get
    beforeEach(inject(function (_PopularMovies_, $q) {
        spyOn(_PopularMovies_, 'query').and.callFake(function (callback) {
            callback(results);
        });
    }));

    //mock omdbApi.find
    beforeEach(inject(function (_omdbApi_, $q) {
        var index = 0;
        spyOn(_omdbApi_, 'find').and.callFake(function () {
            var deferred = $q.defer();
            deferred.resolve(results[index]);
            index = (index + 1) % results.length;
            return deferred.promise;
        });
    }));

    //construct controller
    beforeEach(inject(function (_$controller_, _$interval_, _omdbApi_, _PopularMovies_, _$rootScope_) {
        $scope = {};
        $interval = _$interval_;
        _$controller_('HomeController', {
            $scope: $scope,
            $interval: $interval,
            omdbApi: _omdbApi_,
            PopularMovies: _PopularMovies_
        });
        _$rootScope_.$apply();

    }));

    it('should rotate movies every 5 seconds', function () {
        var index = 0;
        expect($scope.result.Title).toBe(results[0].Title);
        $interval.flush(5000);
        expect($scope.result.Title).toBe(results[1].Title);
        $interval.flush(5000);
        expect($scope.result.Title).toBe(results[2].Title);
        $interval.flush(5000);
        expect($scope.result.Title).toBe(results[0].Title);
    });
});