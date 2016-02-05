angular.module('movieApp', ['omdb', 'movieCore', 'ui.bootstrap', 'ngRoute'])
    .config(function($routeProvider){
        $routeProvider
            .when('/', {
                templateUrl: 'movie-app/home.html',
                controller: 'HomeController'
            })
            .when('/results', {
                templateUrl: 'movie-app/results.html',
                controller: 'ResultsController',
                controllerAs: 'vm'
            })
            .otherwise({
                redirectTo: '/'
            })
    });