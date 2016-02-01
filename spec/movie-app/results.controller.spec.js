describe('Results controller', function () {

    var results = [
        {
            "Title": "Star Wars: Episode IV - A New Hope",
            "Year": "1977",
            "imdbID": "tt0076759",
            "Type": "movie",
            "Poster": "http://ia.media-imdb.com/images/M/MV5BMTU4NTczODkwM15BMl5BanBnXkFtZTcwMzEyMTIyMw@@._V1_SX300.jpg"
        }, {
            "Title": "Star Wars: Episode V - The Empire Strikes Back",
            "Year": "1980",
            "imdbID": "tt0080684",
            "Type": "movie",
            "Poster": "http://ia.media-imdb.com/images/M/MV5BMjE2MzQwMTgxN15BMl5BanBnXkFtZTcwMDQzNjk2OQ@@._V1_SX300.jpg"
        }, {
            "Title": "Star Wars: Episode VI - Return of the Jedi",
            "Year": "1983",
            "imdbID": "tt0086190",
            "Type": "movie",
            "Poster": "http://ia.media-imdb.com/images/M/MV5BMTQ0MzI1NjYwOF5BMl5BanBnXkFtZTgwODU3NDU2MTE@._V1._CR93,97,1209,1861_SX89_AL_.jpg_V1_SX300.jpg"
        }, {
            "Title": "Star Wars: Episode I - The Phantom Menace",
            "Year": "1999",
            "imdbID": "tt0120915",
            "Type": "movie",
            "Poster": "http://ia.media-imdb.com/images/M/MV5BMTQ4NjEwNDA2Nl5BMl5BanBnXkFtZTcwNDUyNDQzNw@@._V1_SX300.jpg"
        }
    ];

    var $controller, $location, omdbApi, $q, $rootScope;
    beforeEach(module('movieApp'));
    beforeEach(angular.mock.inject(function (_$controller_, _omdbApi_, _$location_, _$q_, _$rootScope_) {
        console.log('injecting things...');
        $controller = _$controller_;
        $location = _$location_;
        omdbApi = _omdbApi_;
        $q = _$q_;
        $rootScope = _$rootScope_;
    }));

    it('should load search results', function () {

        $location.search('q', 'star wars');
        spyOn(omdbApi, 'search').and.callFake(function(){
            var deferred = $q.defer();
            deferred.resolve({'Search':results});
            return deferred.promise;
        });

        var $this = $controller('ResultsController', {$location: $location, omdbApi: omdbApi}, {});
        $rootScope.$apply(); //needed to trigger deferred then.

        for (var i = 0; i < results.length; i++) {
            expect($this.results[i].Title).toBe(results[i].Title);
        }
        expect(omdbApi.search).toHaveBeenCalledWith('star wars');
    });

    var searchError = {message: 'An error has occurred.'};

    it('should catch errors', function() {
        $location.search('q', 'star wars');
        spyOn(omdbApi, 'search').and.callFake(function(){
            var deferred = $q.defer();
            deferred.reject(searchError);
            return deferred.promise;
        });

        var $this = $controller('ResultsController', {$location: $location, omdbApi: omdbApi}, {});
        $rootScope.$apply(); //needed to trigger deferred then.
        expect($this.error).toBe(searchError);
    });


});