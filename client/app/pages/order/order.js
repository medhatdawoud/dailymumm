'use strict';

(function () {
    angular
        .module('dailyMummApp')
        .controller('OrderCtrl', OrderController);

    OrderController.$inject = ['$scope', '$rootScope', '$state', 'CountDownService', 'AuthService', 'CurrentOrderService'];

    function OrderController($scope, $rootScope, $state, CountDownService, AuthService, CurrentOrderService) {
        var vm = this;

        vm.userData = AuthService.getCurrentUserInfo();
        vm.orderData = CurrentOrderService.orderData;
        vm.cancelOrder = cancelOrder;

        function cancelOrder() {
            CurrentOrderService.orderData = {};
            $state.go('profile.view');
            $rootScope.$broadcast('orderCanceled');
        }

        $scope.$on('orderStart', function () {
            $rootScope.$broadcast('orderStarted');
        })
    }
})();
