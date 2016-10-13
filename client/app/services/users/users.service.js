'use strict';

(function () {
    angular
        .module('dailyMummApp')
        .service('UserService', UserService);

    UserService.$inject = ['$http', '$timeout', 'apiServer'];

    function UserService($http, $timeout, apiServer) {
        var service = {};

        service.createNewUser = createNewUser;
        service.checkForUserByEmailAndPassword = checkForUserByEmailAndPassword;
        service.updateUserBasicInfo = updateUserBasicInfo;

        function createNewUser(username, email, password, callback) {
            $http.post(apiServer+'/api/user', { "username": username, "email": email, "password": password })
                .then(function (response) {
                    callback({ success: true, data: response.data });
                }, function (response) {
                    callback({ success: false, code: response.data });
                });
        }

        function checkForUserByEmailAndPassword(email, password) {
            return $http.get(apiServer+'/api/user', { params: { "email": email, "password": password } });
        }

        function updateUserBasicInfo (userData, callback) {
            $http.put(apiServer+'/api/user', { "id": userData.id, "username": userData.username, "fullname": userData.fullname })
                .then(function (response) {
                    callback({ success: true, data: response.data });
                }, function (response) {
                    callback({ success: false, code: response.data });
                });
        }
        
        return service;
    }
})();