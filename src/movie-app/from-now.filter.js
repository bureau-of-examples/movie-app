(function (movieAppModule) {

    movieAppModule.filter('fromNow', function(){

        var YEAR_IN_MS = 60 * 60 * 24 * 365;

        return function(value, baseDate) {
            if(!value)
                return 'N/A';

            var date = value;

            if(typeof(value) === 'string') {
                date = new Date(date);
            }

            if(isNaN(date.getTime()))
                return value;

            var now = baseDate || new Date();
            var dateDiff = (now.getTime() - date.getTime()) / 1000;
            var tzDiff = (now.getTimezoneOffset() - date.getTimezoneOffset()) * 60;
            var diffInMs = dateDiff + tzDiff;
            var yearsDiff = Math.floor(diffInMs / YEAR_IN_MS);
            return yearsDiff + (yearsDiff == 1 ? ' year ago' : ' years ago');
        }
    });

}(angular.module('movieApp')));