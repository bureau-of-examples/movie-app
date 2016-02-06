(function (movieAppModule) {

    movieAppModule.controller('ResultsController', ['$location', 'omdbApi',function ($location, omdbApi) {
        var vm = this;
        var query = $location.search().q;
        omdbApi.search(query).then(
            function (data) {
                vm.results = data.Search;
            },
            function(err) {
                console.log('An error has occurred during search.');
                vm.error = err;
            }
        );

        vm.expand = function(index, id) {
            var result = vm.results[index];
            if(result.isOpen) {
                result.isOpen = false;
            } else {
                if(result.data) {
                    result.isOpen = true;
                } else {
                    omdbApi.find(id)
                        .then(function(data){
                            result.data = data;
                            result.isOpen = true;
                           // $scope.$digest();
                        });
                }
            }
        }
    }]);

}(angular.module('movieApp')));