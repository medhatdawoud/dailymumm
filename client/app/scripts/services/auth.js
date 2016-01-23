'use strict';

(function(){
    angular
        .module('dailyMummApp')
        .service('AuthService', AuthService);

    AuthService.$inject = ['$http','UserService'];

    function AuthService($http, UserService) {
        var service = {};
        
        service.login = login;
        
        function login( email, password, callback) {
            UserService.checkForUserByEmailAndPassword(email, password, function(data){
                callback(data);
            });
        }
        
        return service;
    }
})();