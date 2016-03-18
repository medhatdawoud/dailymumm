'use strict';

(function () {
    angular
        .module('dailyMummApp')
        .service('RestaurantsService', RestaurantsService);

    RestaurantsService.$inject = ['$http', 'apiServer', '$timeout'];

    function RestaurantsService($http, apiServer, $timeout) {
        var service = {};

        service.getRestaurants = getRestaurants;

        function getRestaurants() {
            return [
                { 
                    id: 1, 
                    name: "My List 1", 
                    addresses: [
                        {
                            city: "Maadi",
                            address: "12 Nasr st."
                        }
                    ], 
                    phone_numbers: [
                        0123456789,
                        0123456789,
                        0123456789
                    ],
                    logo_path: "/images/logo.jpg" 
                }
            ];
        }

        return service;
    }
})();