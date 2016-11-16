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

        vm.tips = 0;
        vm.extras = 0;
        vm.submitDelivery = submitDelivery;
        vm.isCreator = OrdersService.checkCreatorOfOrder(vm.order);

        function submitDelivery() {
            var confirmed = confirm('Are you sure that the place, extras and tips you entered are accurate,' +
                ' because this will affect the whole calculations for other people who order with you ?' +
                '\n\n' +
                'Note that: an email will be sent to each one who write items in this order with his/her ' +
                'bill including part of the extras and tips you paid based on his/her order price');

            if (confirmed) {
                vm.order.status = "Done";
                vm.order.tips = vm.tips;
                vm.order.extras = vm.extras;
                vm.order.place = vm.place;

                OrdersService.updateOrder(vm.order, function (response) {
                    if (!response.success) {
                        console.log(response.data);
                    }
                });
            }
        }
    }
})();