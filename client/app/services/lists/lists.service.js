'use strict';

(function () {
    angular
        .module('dailyMummApp')
        .service('ListsService', ListsService);

    ListsService.$inject = ['$http', 'apiServer', '$timeout'];

    function ListsService($http, apiServer, $timeout) {
        var service = {};

        service.getLists = getLists;
        service.createList = createList;

        function getLists(userId, callback) {
            $http.get(apiServer + '/api/lists/byuser', { params: { userId: userId } })
                .then(function (response) {
                    callback({ success: true, data: response.data });
                }, function (response) {
                    callback({ success: false, code: response.data });
                });
        }

        function createList(ownerData, listData, callback) {
            $http.post(apiServer + '/api/lists', { list: JSON.stringify(listData), owner: JSON.stringify(ownerData) })
                .then(function (response) {
                    callback({ success: true, data: response.data });
                }, function (response) {
                    callback({ success: false, code: response.data });
                });
        }

        return service;
    }
})();