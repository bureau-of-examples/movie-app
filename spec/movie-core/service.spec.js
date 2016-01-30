describe('movieCore', function(){

    var PopularMovies = function(){};
    var $httpBackend = {};

    beforeEach(module('movieCore'));
    beforeEach(inject(function(_PopularMovies_, _$httpBackend_){
        PopularMovies = _PopularMovies_;
        $httpBackend = _$httpBackend_;
    }));

    afterEach(function(){
        $httpBackend.verifyNoOutstandingExpectation();
    });

    var testMovie = {
        movieId: 'tt0076759',
        description: 'Great Movie'
    };

    it('should create popular movie', function(){

        $httpBackend
            .expectPOST(
            function(url) { //match url
                console.log('POST:' + url);
                return true;
            },
            function(data){ //match post data
                console.log(angular.mock.dump(data));
                return angular.fromJson(data).movieId === testMovie.movieId;
            })
            .respond(201);

        var popularMovie = new PopularMovies(testMovie);

        popularMovie.$save();
        $httpBackend.flush();
    });

    it('should get popular movie by id', function() {

        $httpBackend
            .expectGET(/popular\/tt/)
            .respond(200);
        PopularMovies.get({movieId: testMovie.movieId});
        $httpBackend.flush();
    });

    it('should update popular movie', function(){

        $httpBackend
            .expectPUT(
                function(url) {

                    console.log('PUT:' + url);
                    return true;
                },
                function(data) {
                    console.log(angular.mock.dump(data))
                    return true;;
                }
            )
            .respond(200);

        var movie = angular.copy(testMovie);
        movie.description += '!!!';
        var popularMovie = new PopularMovies(movie);
        popularMovie.$update();
        $httpBackend.flush();

    });

    it('should send authToken', function(){
        $httpBackend
            .expectGET(
                function(){return true;},
                function(headers){
                    return headers.authToken;
                }
            )
            .respond(304);
        PopularMovies.get({movieId: testMovie.movieId});
        $httpBackend.flush();
    });
});