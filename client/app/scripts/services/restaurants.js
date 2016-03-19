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
                    name: "Majesty",
                    menus: [
                        { sitename: "elmenus", link: "http://elmenus.com" },
                        { sitename: "otlob", link: "http://otlob.com" }
                    ],
                    phone_numbers: ["0123456789", "0123456789", "0123456789" ],
                    logo_path: "/images/restaurants/majesty.jpg"
                },
                {
                    id: 2,
                    name: "Macdonalds",
                    menus: [
                        { sitename: "elmenus", link: "http://elmenus.com" }
                    ],
                    phone_numbers: ["0123456789", "0123456789", "0123456789" ],
                    logo_path: "/images/restaurants/mac.jpg"
                },
                {
                    id: 3,
                    name: "KFC",
                    menus: [
                        { sitename: "elmenus", link: "http://elmenus.com" }
                    ],
                    phone_numbers: ["0123456789", "0123456789", "0123456789" ],
                    logo_path: "/images/restaurants/kfc.jpg"
                }
            ];
        }

        return service;
    }
})();