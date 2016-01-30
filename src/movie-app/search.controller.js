(function(movieAppModule){

    movieAppModule.controller('SearchController', function ($location) {
        var vm = this;
        vm.search = function () {
            if (vm.query) {
                $location.path('/results').search('q', vm.query);
            }
        };
    });

}(angular.module('movieApp', [])));