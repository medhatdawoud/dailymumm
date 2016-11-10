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
        service.updateList = updateList;
        service.addInvitationToUser = addInvitationToUser;

        function getLists(userId, callback) {
            $http.get(apiServer + '/api/lists/byuser', { params: { userId: userId } })
                .then(function (response) {
                    callback({ success: true, data: response.data });
                }, function (response) {
                    callback({ success: false, code: response.data });
                });
        }

        function createList(ownerData, listData, callback) {
            $http.post(apiServer + '/api/lists', { list: angular.toJson(listData), owner: angular.toJson(ownerData) })
                .then(function (response) {
                    callback({ success: true, data: response.data });
                }, function (response) {
                    callback({ success: false, code: response.data });
                });
        }

        function updateList(listData, callback) {
            $http.put(apiServer + '/api/lists', { list: angular.toJson(listData) })
                .then(function (response) {
                    callback({ success: true, data: response.data });
                }, function (response) {
                    callback({ success: false, code: response.data });
                });
        }

        function addInvitationToUser(listId, user, callback) {
            $http.put(apiServer + '/api/user/addinvitation', { listid: listId, userid: user.id })
                .then(function (response) {
                    callback({ success: true, data: response.data });
                }, function (response) {
                    callback({ success: false, code: response.data });
                });
        }

        return service;
    }
})();