'use strict';

(function () {
    angular
        .module('dailyMummApp')
        .controller('NavbarDirectiveCtrl', NavbarDirectiveController);

    NavbarDirectiveController.$inject = ['$scope', 'AuthService', '$state', '$timeout', 'CountDownService', 'CurrentOrderService'];

    function NavbarDirectiveController($scope, AuthService, $state, $timeout, CountDownService, CurrentOrderService) {

        // 15 second
        var collectingOrderTime = 0.25 * 60 * 1000;

        $scope.logout = logout;
        $scope.orderStarted = false;
        $scope.timeout = false;
        $scope.currentUsername = "";
        $scope.order = null;

        if (AuthService.isLoggedIn()) {
            $scope.currentUsername = (AuthService.getCurrentUserInfo()).fullname || (AuthService.getCurrentUserInfo()).username;
        }

        function logout() {
            AuthService.clearCredintials();
            $state.go('home');
        }

        $scope.$on('orderStarted', function () {
            var endTime = new Date(Date.parse(CurrentOrderService.orderData.startTime) + collectingOrderTime);
            $scope.order = CurrentOrderService.orderData;
            $timeout(function () {
                var remaining = CountDownService.getTimeRemaining(endTime);
                if (remaining.minutes >= 0 && remaining.seconds > 0) {
                    CountDownService.initializeClock("count-down", endTime, collectingOrderTime)
                    $scope.orderStarted = true;
                } else {
                    $scope.timeout = true;
                    $scope.orderStarted = true;
                }
            }, 500);
        });

        $scope.$on('timeout', function () {
            $timeout(function () {
                $scope.timeout = true;
            }, 500);
        });

        $scope.$on('orderCanceled', function () {
            $timeout(function () {
                CountDownService.stopTimer("count-down");
                $scope.timeout = false;
                $scope.orderStarted = false;
            }, 100);
        });
    }
})();