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
        
        function checkForUserByEmailAndPassword(email, password) {
            return $http.get('/api/user',{ params: {"email": email, "password": password }});
        }
        
        $(".list-groups").owlCarousel({
            items : 4,
            lazyLoad : true,
            navigation : true,
            pagination: false,
            rewindNav: false,
            navigationText : ["<i class='glyphicon glyphicon-chevron-left'></i>","<i class='glyphicon glyphicon-chevron-right'></i>"]
        });
        
        return service;
    }
})();