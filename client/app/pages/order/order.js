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
        vm.orderTimeout = false;
        vm.sortByOptions = [
            { id: 1, name: "Sort by order" },
            { id: 2, name: "Sort by user" }
        ];
        vm.sort = vm.sortByOptions[0];
        vm.refreshItems = getOrderById;

        if (!$stateParams.id) {
            $state.go('profile.view');
        } else {
            if (!CurrentOrderService.orderData.id) {
                getOrderById($stateParams.id);
            }
        }

        function getOrderById(orderId) {
            if (!orderId)
                orderId = vm.orderData._id;

            OrdersService.getOrderById(orderId, function (response) {
                if (response.success) {
                    vm.orderData = response.data;
                    CurrentOrderService.orderData = response.data;
                    $rootScope.$broadcast('orderStarted');
                }
            });
        }

        function createItem() {
            vm.orderItemTemp.datetime = new Date();
            vm.orderItemTemp.user = {
                fullname: vm.userData.fullname,
                name: vm.userData.username,
                email: vm.userData.email,
                id: vm.userData.id
            }
            OrdersService.pushOrderItem(vm.orderData._id, vm.orderItemTemp, function (response) {
                if (response.success) {
                    getOrderById(vm.orderData._id);

                    $('#createOrderModal').modal('hide');
                }
            });
        }

        function cancelOrder() {
            var confirmed = confirm("Are you sure you want to cancel order ? \nThis will cancel the whole order and send mail to subscribers who add orders to tell them that you are not interested in this order anymore");
            if (confirmed) {
                CurrentOrderService.orderData = {};
                $state.go('profile.view');
                $rootScope.$broadcast('orderCanceled');
            }
        }

        $scope.$on('orderStart', function () {
            $rootScope.$broadcast('orderStarted');
        });

        $scope.$on('timeout', function () {
            vm.orderTimeout = true;
        });
    }
})();
