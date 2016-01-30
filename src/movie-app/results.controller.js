(function (movieAppModule) {

    movieAppModule.controller('ResultsController', ['$location', 'omdbApi', function ($location, omdbApi) {
        var vm = this;
        var query = $location.search().q;
        omdbApi.search(query).then(
            function (data) {
                console.log('setting data');
                vm.results = data;
            },
            function(err) {
                console.log('An error has occurred during search.');
                vm.error = err;
            }
        );
    }]);

}(angular.module('movieApp')));