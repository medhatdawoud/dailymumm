'use strict';

(function () {
    angular
        .module('dailyMummApp')
        .component('bwOrderDelivery', {
            templateUrl: "components/orderDelivery/orderDelivery.html",
            bindings: {
                order: '='
            },
            controllerAs: 'vm',
            controller: OrderDeliveryController
        });

    OrderDeliveryController.$inject = ['OrdersService'];

    function OrderDeliveryController(OrdersService) {
        var vm = this;

        vm.submitDelivery = submitDelivery;

        function submitDelivery() {
            vm.order.status = "Done";

            OrdersService.updateOrder(vm.order, function (response) {
                if (response.success) {
                    console.log(response.data);
                }
            })
        }
    }
})();