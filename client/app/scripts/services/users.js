'use strict';

(function(){
    angular
        .module('dailyMummApp')
        .service('UserService', UserService);

    UserService.$inject = ['$http'];

    function UserService($http) {
        var service = {};
        
        service.createNewUser = createNewUser;
        service.checkForUserByEmailAndPassword = checkForUserByEmailAndPassword;
        
        function createNewUser(username, email, password, callback) {
            $http.post('/api/user', {"username": username, "email": email, "password": password})
                .then(function(response){
                    callback({success:true, data:response.data});
                },function(response){
                    callback({success:false, code:response.data});
                });
        }
        
        function checkForUserByEmailAndPassword(email, password, callback) {
            $http.get('/api/user',{ params: {"email": email, "password": password }})
                .then(function(response){
                    if(response.data)
                        callback({success:true, data:response.data});
                    else
                        callback({success:false, code:response.data});
                },function(response){
                    callback({success:false, code:response.data});
                });
        }
        
        return service;
    }
})();