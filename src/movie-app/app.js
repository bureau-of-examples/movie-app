angular.module('movieApp', ['omdb', 'ui.bootstrap', 'ngRoute'])
    .config(function($routeProvider){
        $routeProvider
            .when('/results', {
                templateUrl: 'movie-app/results.html',
                controller: 'ResultsController',
                controllerAs: 'vm'
            })
            .otherwise({
                redirectTo: '/'
            })
    });