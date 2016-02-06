(function (movieAppModule) {

    movieAppModule.controller('HomeController', ['$scope', '$interval', 'omdbApi', 'PopularMovies', function ($scope, $interval, omdbApi, PopularMovies) {


        var findMovie = function(id) {
            omdbApi.find(id)
                .then(function(data) {
                    $scope.result = data;
                })
        };
        //var results = ["tt0076759", "tt0080684", "tt0086190"];
        //var currentIndex = 0;
        //findMovie(results[currentIndex]);
        //$interval(function(){
        //    currentIndex = (currentIndex + 1) % results.length;
        //    findMovie(results[currentIndex]);
        //}, 5000);

        PopularMovies.query(function(data) {
            results = data;
            var currentIndex = 0;
            findMovie(results[currentIndex]);
            $interval(function(){
                currentIndex = (currentIndex + 1) % results.length;
                findMovie(results[currentIndex]);
            }, 5000);
        });
    }]);

}(angular.module('movieApp')));