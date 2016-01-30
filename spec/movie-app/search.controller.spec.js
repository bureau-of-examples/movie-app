describe('Search controller', function () {

    var $location = {}, $controller;

    beforeEach(module('movieApp'));
    beforeEach(inject(function (_$controller_, _$location_) {
        $location = _$location_;
        $controller = _$controller_;
    }));

    it('should redirect to the query results page for non-empty query', function () {
        var $this = $controller('SearchController', {$location: $location}, {query: 'star wars'}); //call controller
        $this.search();
        expect($location.url()).toBe('/results?q=star%20wars');
    });

    it('should not redirect to query results for empty query', function () {
        var $this = $controller('SearchController', {$location: $location}, {query: ''}); //call controller
        $this.search();
        expect($location.url()).toBe('');
    });
});