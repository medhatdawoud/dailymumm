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
            vm.order.tips = vm.tips;
            vm.order.wholeBill = vm.bill;

            var confirmed = confirm('Are you sure that the bill and tips you entered are accurate, because this will affect the whole calculations for other people who order with you ?');

            if (confirmed) {
                OrdersService.updateOrder(vm.order, function (response) {
                    if (!response.success) {
                        console.log(response.data);
                    }
                });
            }
        }
    }
})();