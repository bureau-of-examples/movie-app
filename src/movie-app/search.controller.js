(function(movieAppModule){

    movieAppModule.controller('SearchController', function ($scope, $location) {
        $scope.search = function () {
            if ($scope.query) {
                $location.path('/results').search('q', $scope.query);
            }
        };
    });

}(angular.module('movieApp', [])));