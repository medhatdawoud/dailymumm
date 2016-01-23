'use strict';

(function(){
    angular
        .module('dailyMummApp')
        .service('UserService', UserService);

    UserService.$inject = ['$http'];

    function UserService($http) {
        var service = {};
        
        service.createNewUser = createNewUser;
        
        function createNewUser(username, email, password, callback) {
            $http.post('/api/user',{username: username, email: email, password: password})
                .then(function(response){
                    callback({success:true, data:response.data});
                },function(response){
                    callback({success:false, code:response.data});
                });
        }
        
        return service;
    }
})();