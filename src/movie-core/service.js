(function(movieCoreModule){

    movieCoreModule.factory('PopularMovies', ['$resource', function($resource){
        var accessToken = 'myFakeAccessToken';
        return $resource('popular/:movieId', {movieId: '@id'}, {
            update: {method: 'PUT', headers: {'authToken': accessToken}},
            get:   {method: 'GET', headers: {'authToken': accessToken}},
            query:  {method: 'GET', headers: {'authToken': accessToken}, isArray: true},
            save:   {method: 'POST', headers: {'authToken': accessToken}},
            remove: {method: 'DELETE', headers: {'authToken': accessToken}}
        });
    }]);
}(angular.module('movieCore', ['ngResource'])));