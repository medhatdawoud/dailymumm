'use strict';

(function () {
    angular
        .module('dailyMummApp')
        .component('bwOrderMean', {
            templateUrl: "components/orderMean/orderMean.html",
            bindings: {
                order: '='
            },
            controllerAs: 'vm',
            controller: OrderMeanController
        });

    OrderMeanController.$inject = ['OrdersService'];

    function OrderMeanController(OrdersService) {
        var vm = this;

        vm.orderMeans = [
            "Phone Call", "Passby the Restaurant", "Will go all to there", "Otlob.com", "elmenus.com", "Others"
        ];
        vm.orderSelectedMean = vm.orderMeans[0];
        vm.submitMean = submitMean;

        function submitMean() {
            vm.order.mean = {
                name: vm.orderSelectedMean,
                details: vm.orderSelectedMeanDetails
            }

            vm.order.status = "Waiting";

            OrdersService.updateOrder(vm.order, function (response) {
                if (response.success) {
                    console.log(response.data);
                }
            })
        }
    }
})();