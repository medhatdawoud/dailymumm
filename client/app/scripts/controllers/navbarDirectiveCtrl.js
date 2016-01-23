'use strict';

(function(){
    angular
        .module('dailyMummApp')
        .controller('NavbarDirectiveCtrl', NavbarDirectiveController);
    
    NavbarDirectiveController.$inject = ['$scope','AuthService','$state'];
    
    function NavbarDirectiveController($scope, AuthService, $state) {
        
        $scope.logout = logout;
        $scope.currentUsername = (AuthService.getCurrentUserInfo()).loginData.username;
        
        function logout() {
            AuthService.clearCredintials();
            $state.go('home');
        }
    }
})();