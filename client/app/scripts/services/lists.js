'use strict';

(function () {
    angular
        .module('dailyMummApp')
        .service('ListsService', ListsService);

    ListsService.$inject = ['$http', 'apiServer', '$timeout'];

    function ListsService($http, apiServer, $timeout) {
        var service = {};

        service.getLists = getLists;

        function getLists() {
            return [
                { id: 1, title: "My List 1", imgPath: "images/lists/list1.jpg", count: 1, owned: true },
                { id: 2, title: "My List 2", imgPath: "images/lists/list2.jpg", count: 5, owned: false },
                { id: 3, title: "My List 3", imgPath: "images/lists/list3.jpg", count: 15, owned: false },
                { id: 2, title: "My List 4", imgPath: "images/lists/list4.jpg", count: 5, owned: false },
                { id: 3, title: "My List 5", imgPath: "images/lists/list4.jpg", count: 15, owned: false },
                { id: 2, title: "My List 6", imgPath: "images/lists/list4.jpg", count: 5, owned: false },
                { id: 3, title: "My List 7", imgPath: "images/lists/list4.jpg", count: 15, owned: false },
                { id: 3, title: "My List 8", imgPath: "images/lists/list4.jpg", count: 15, owned: false },
                { id: 3, title: "My List 9", imgPath: "images/lists/list4.jpg", count: 15, owned: false },
                { id: 3, title: "My List 10", imgPath: "images/lists/list4.jpg", count: 15, owned: false },
                { id: 3, title: "My List 13", imgPath: "images/lists/list4.jpg", count: 15, owned: false }
            ];
        }
        
        $timeout(function () {
            if ($("a.one-list").length > 0) {
                $(".lists-profile").owlCarousel({
                    items: 5,
                    lazyLoad: true,
                    navigation: true,
                    pagination: false,
                    rewindNav: false,
                    navigationText: ["<i class='glyphicon glyphicon-chevron-left'></i>", "<i class='glyphicon glyphicon-chevron-right'></i>"]
                });
            }
        }, 100);

        return service;
    }
})();