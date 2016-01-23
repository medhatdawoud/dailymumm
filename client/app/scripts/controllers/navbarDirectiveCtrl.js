'use strict';

(function(){
    angular
        .module('dailyMummApp')
        .controller('NavbarDirectiveCtrl', NavbarDirectiveController);
    
    NavbarDirectiveController.$inject = ['$scope','AuthService','$state'];
    
    function NavbarDirectiveController($scope, AuthService, $state) {
        
        $scope.logout = logout;
        
        function logout() {
            AuthService.clearCredintials();
            $state.go('home');
        }
    }
})();