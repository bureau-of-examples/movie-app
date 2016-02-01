(function(movieAppModule){

    movieAppModule.controller('SearchController', function ($location) {
        var vm = this;
        vm.search = function () {
            if (vm.query) {
                console.log('Searching key words: ' + vm.query);
                $location.path('/results').search('q', vm.query);
            }
        };
    });

}(angular.module('movieApp')));