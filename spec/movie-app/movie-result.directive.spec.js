describe('Movie Result Directive', function () {

    var result = {
        "Title": "Star Wars: Episode III - Revenge of the Sith",
        "Year": "2005",
        "imdbID": "tt0121766",
        "Type": "movie",
        "Poster": "http://ia.media-imdb.com/images/M/MV5BNTc4MTc3NTQ5OF5BMl5BanBnXkFtZTcwOTg0NjI4NA@@._V1_SX300.jpg",
        "Plot": 'a long long time ago in a galaxy far far away...'
    };

    beforeEach(module('movieApp'));

    var $compile, $rootScope;
    beforeEach(inject(function(_$compile_, _$rootScope_){
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));

    it('should output movie to expected HTML format', function () {

        var scope = $rootScope.$new();
        scope.result = result;
        var element = $compile('<movie-result result="result"></movie-result>')(scope);
        scope.$digest();
        var imgAlt = element.find("img").attr('alt');
        expect(imgAlt).toBe('Star Wars: Episode III - Revenge of the Sith');
    });

});

describe('$rootScope', function() {

    beforeEach(module('movieApp'));

    var $rootScope;
    beforeEach(inject(function(_$rootScope_) {
        $rootScope = _$rootScope_;
    }));

    it('should count descendant scopes', function(){
        var childScopeCount = $rootScope.$countChildScopes();
        expect(childScopeCount).toBe(0);

        var childScope = $rootScope.$new();
        childScopeCount = $rootScope.$countChildScopes();
        expect(childScopeCount).toBe(1);

        childScope.$new();
        childScopeCount = $rootScope.$countChildScopes();
        expect(childScopeCount).toBe(2);
    });

    it('should reset $rootScope', function(){
        expect($rootScope.$countChildScopes()).toBe(0);
    });

    it('should call listener', function(){
        $rootScope.selectedIndex = 4;
        var watcherCalled = false;
        $rootScope.$watch('selectedIndex', function(){
            watcherCalled = true;
        });
        $rootScope.selectedIndex = 0;
        $rootScope.$digest();
        expect(watcherCalled).toBe(true);
    });


    it('should count child watcher', function(){
        expect($rootScope.$countWatchers()).toBe(0);

        var childScope = $rootScope.$new();
        childScope.$watch('model', function(){});

        expect($rootScope.$countWatchers()).toBe(1);
    });




});