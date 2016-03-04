'use strict';

(function () {
    angular
        .module('dailyMummApp')
        .service('ListsService', ListsService);

    ListsService.$inject = ['$http'];

    function ListsService($http) {
        var service = {};

        service.getLists = getLists;

        function getLists() {
            return [
                { id: 1, title: "My List 1", imgPath: "images/fastfood.jpg", count: 1, owned: true },
                { id: 2, title: "My List 2", imgPath: "images/fastfood.jpg", count: 5, owned: false },
                { id: 3, title: "My List 3", imgPath: "images/fastfood.jpg", count: 15, owned: false },
                { id: 2, title: "My List 4", imgPath: "images/fastfood.jpg", count: 5, owned: false },
                { id: 3, title: "My List 5", imgPath: "images/fastfood.jpg", count: 15, owned: false },
                { id: 2, title: "My List 6", imgPath: "images/fastfood.jpg", count: 5, owned: false },
                { id: 3, title: "My List 7", imgPath: "images/fastfood.jpg", count: 15, owned: false }
            ];
        }

        return service;
    }
})();