(function(movieAppModule){

    movieAppModule.controller('SearchController', function ($location, $timeout) {
        var vm = this;
        vm.search = function () {
            if (vm.query) {
                console.log('Searching key words: ' + vm.query);
                $location.path('/results').search('q', vm.query);
            }
        };

        var previousTimeoutHandle = null;

        vm.keyup = function(){
            if(previousTimeoutHandle) {
                $timeout.cancel(previousTimeoutHandle);
            }
            previousTimeoutHandle = $timeout(function(){
                vm.search();
                previousTimeoutHandle = null;
            }, 1000);
        };
    });

}(angular.module('movieApp')));