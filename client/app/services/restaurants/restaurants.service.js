'use strict';

(function () {
    angular
        .module('dailyMummApp')
        .service('RestaurantsService', RestaurantsService);

    RestaurantsService.$inject = ['$http', 'apiServer', '$timeout'];

    function RestaurantsService($http, apiServer, $timeout) {
        var service = {};

        service.getRestaurants = getRestaurants;

        function getRestaurants(callback) {
            $http.get(apiServer + '/api/restaurants')
                .then(function (response) {
                    callback({ success: true, data: response.data });
                }, function (response) {
                    callback({ success: false, code: response.data });
                });
        }

        return service;
    }
})();