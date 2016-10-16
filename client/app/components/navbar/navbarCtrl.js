'use strict';

(function () {
    angular
        .module('dailyMummApp')
        .controller('NavbarDirectiveCtrl', NavbarDirectiveController);

    NavbarDirectiveController.$inject = ['$scope', 'AuthService', '$state', '$timeout', 'CountDownService', 'CurrentOrderService'];

    function NavbarDirectiveController($scope, AuthService, $state, $timeout, CountDownService, CurrentOrderService) {
        $scope.logout = logout;
        $scope.orderStarted = false;
        $scope.currentUsername = "";

        if (AuthService.isLoggedIn()) {
            $scope.currentUsername = (AuthService.getCurrentUserInfo()).username;
        }
        
        if (CurrentOrderService.orderData && CurrentOrderService.orderData.startTime) {
            debugger
            console.log(CurrentOrderService.orderData.startTime);
            $scope.orderStarted = true;
            CountDownService.initializeClock("count-down", new Date(Date.parse(CurrentOrderService.orderData.startTime) + 30 * 60 * 1000))
        }

        function logout() {
            AuthService.clearCredintials();
            $state.go('home');
        }

        $scope.$on('orderStarted', function () {
            $timeout(function () {
                $scope.orderStarted = true;
                CountDownService.initializeClock("count-down", new Date(Date.parse(CurrentOrderService.orderData.startTime) + 30 * 60 * 1000))
            }, 300);
        });
    }
})();