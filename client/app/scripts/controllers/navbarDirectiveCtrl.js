'use strict';

(function () {
    angular
        .module('dailyMummApp')
        .controller('NavbarDirectiveCtrl', NavbarDirectiveController);

    NavbarDirectiveController.$inject = ['$scope', 'AuthService', '$state', '$timeout', 'CountDownService'];

    function NavbarDirectiveController($scope, AuthService, $state, $timeout, CountDownService) {
        $scope.logout = logout;
        $scope.currentUsername = (AuthService.getCurrentUserInfo()).loginData.username;
        $scope.orderStarted = false;

        function logout() {
            AuthService.clearCredintials();
            $state.go('home');
        }

        $scope.$on('orderStarted', function () {
            $timeout(function () {
                $scope.orderStarted = true;
            }, 300);
        });
    }
})();