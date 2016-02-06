angular.module('movieApp', ['omdb', 'movieCore', 'ui.bootstrap', 'ngRoute', 'ngMockE2E'])
    .config(['$routeProvider', function($routeProvider){
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
    }])
    .run(['$httpBackend', function($httpBackend){

        var data = ["tt0076759", "tt0080684", "tt0086190"];
        var options = {
            headers: {'Content-Type': 'application/json'}
        };

        $httpBackend.whenGET(function(url){
            return url.indexOf('popular') !== -1;
        }).respond(200, data, options);

        $httpBackend.whenGET(/.*/).passThrough();
    }]);