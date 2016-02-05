describe('Search controller', function () {

    var $location = {}, $controller, $timeout;

    beforeEach(module('movieApp'));
    beforeEach(inject(function (_$controller_, _$location_, _$timeout_) {
        $location = _$location_;
        $controller = _$controller_;
        $timeout = _$timeout_;
    }));

    function createSearchController(query) {
        return $controller('SearchController', {$location: $location, $timeout: $timeout}, {query: query});
    }

    it('should redirect to the query results page for non-empty query', function () {
        var $this = createSearchController('star wars'); //call controller
        $this.search();
        expect($location.url()).toBe('/results?q=star%20wars');
    });

    it('should not redirect to query results for empty query', function () {
        var $this = createSearchController(''); //call controller
        $this.search();
        expect($location.url()).toBe('');
    });

    it('should redirect after 1 second of keyboard inactivity', function(){
        var $this = createSearchController('star wars');//call controller
        $this.keyup();
        $timeout.flush();
        expect($location.url()).toBe('/results?q=star%20wars');
        $timeout.verifyNoPendingTasks();
    });

    it('should cancel timeout in keyup', function(){
        var $this = createSearchController('star wars');//call controller
        spyOn($this, 'search');
        $this.keyup();
        $this.keyup();
        $timeout.flush();
        expect($this.search).toHaveBeenCalledTimes(1);
    });
});