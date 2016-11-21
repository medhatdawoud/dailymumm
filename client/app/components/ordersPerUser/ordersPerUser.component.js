'use strict';

(function () {
    angular
        .module('dailyMummApp')
        .component('bwOrdersPerUser', {
            templateUrl: "components/ordersPerUser/ordersPerUser.html",
            bindings: {
                user: '='
            },
            controllerAs: 'vm',
            controller: OrdersPerUserController
        });

    OrdersPerUserController.$inject = [];

    function OrdersPerUserController() {
        var vm = this;

        vm.total = 0;

        vm.user.items.forEach(function(item){
            vm.total += item.price * item.count;
        })
    }
})();