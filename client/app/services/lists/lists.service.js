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
                { 
                    id: 1, 
                    name: "My List 1", 
                    picture: "assets/images/lists/list1.jpg", 
                    subscribers: [
                        { id: 1111, username: "medhatdawoud", fullname: "Medhat Dawoud", subscribtionDate: "13 Oct 2016", owner: true}
                    ], 
                    owned: true 
                },
                { 
                    id: 2, 
                    name: "My List 2", 
                    picture: "assets/images/lists/list2.jpg", 
                    subscribers: [
                        { id: 1111, username: "medhatdawoud", owner: false}
                    ], 
                    owned: false 
                },
                { 
                    id: 3, 
                    name: "My List 3", 
                    picture: "assets/images/lists/list3.jpg", 
                    subscribers: [
                        { id: 1111, username: "medhatdawoud", owner: false}
                    ], 
                    owned: false 
                },
                { 
                    id: 4, 
                    name: "My List 4", 
                    picture: "assets/images/lists/list4.jpg", 
                    subscribers: [
                        { id: 1111, username: "medhatdawoud", owner: false}
                    ], 
                    owned: false 
                }
            ];
        }
        
        

        return service;
    }
})();