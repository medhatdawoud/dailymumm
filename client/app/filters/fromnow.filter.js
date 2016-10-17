'use strict';

(function () {
    angular
        .module('dailyMummApp')
        .filter('fromNow', FromnowFilter);

    FromnowFilter.$inject = [];

    function FromnowFilter() {
        return function(date){
            return moment(date).fromNow();
        }
    }
})();