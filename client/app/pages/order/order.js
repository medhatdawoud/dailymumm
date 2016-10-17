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
                getOrderById($stateParams.id);
                $rootScope.$broadcast('orderStarted');
            }
        }

        function getOrderById(orderId) {
            OrdersService.getOrderById(orderId, function (response) {
                if (response.success) {
                    vm.orderData = response.data;
                    CurrentOrderService.orderData = response.data;
                }
            });
        }

        function createItem() {
            vm.orderItemTemp.datetime = new Date();
            vm.orderItemTemp.user = {
                fullname: vm.userData.fullname,
                name: vm.userData.username,
                id: vm.userData.id
            }
            OrdersService.pushOrderItem(vm.orderData._id, vm.orderItemTemp, function (response) {
                if (response.success) {
                    getOrderById(vm.orderData._id);
                    console.log(vm.orderData);

                    $('#createOrderModal').modal('hide');
                }
            });
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
