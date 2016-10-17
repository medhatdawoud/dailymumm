'use strict';

(function () {
    angular
        .module('dailyMummApp')
        .controller('OrderCtrl', OrderController);

    OrderController.$inject = ['$scope', '$rootScope', '$state', '$stateParams', 'CountDownService', 'AuthService', 'CurrentOrderService', 'OrdersService'];

    function OrderController($scope, $rootScope, $state, $stateParams, CountDownService, AuthService, CurrentOrderService, OrdersService) {
        var vm = this;

        vm.userData = AuthService.getCurrentUserInfo();
        vm.orderData = CurrentOrderService.orderData;
        vm.cancelOrder = cancelOrder;
        vm.createItem = createItem;

        if (!$stateParams.id) {
            $state.go('profile.view');
        } else {
            if (!CurrentOrderService.orderData.id) {
                OrdersService.getOrderById($stateParams.id, function (response) {
                    if (response.success) {
                        vm.orderData = response.data;
                        CurrentOrderService.orderData = response.data;
                        $rootScope.$broadcast('orderStarted');
                    }
                });
            }
        }
        function createItem() {
            console.log(vm.orderItemTemp);
        }

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
