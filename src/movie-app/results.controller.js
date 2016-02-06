(function (movieAppModule) {

    movieAppModule.controller('ResultsController', ['$location', 'omdbApi','$exceptionHandler',function ($location, omdbApi, $exceptionHandler) {
        var vm = this;
        var query = $location.search().q;
        omdbApi.search(query).then(
            function (data) {
                vm.results = data.Search;
            },
            function(err) {
                console.log('An error has occurred during search.');
                $exceptionHandler(err);
            }
        );

        vm.expand = function(index, id) {
            var result = vm.results[index];
            if(result.isOpen) {
                result.isOpen = false;
            } else {
                if(result.data) {
                    console.log('expending result ' + index);
                    result.isOpen = true;
                } else {
                    omdbApi.find(id)
                        .then(function(data){
                            result.data = data;
                            result.isOpen = true;
                            console.log('result data retrieved: ' + index);
                           // $scope.$digest();
                        });
                }
            }
        }
    }]);

}(angular.module('movieApp')));