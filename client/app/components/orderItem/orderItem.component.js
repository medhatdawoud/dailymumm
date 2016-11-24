'use strict';

(function () {
    angular
        .module('dailyMummApp')
        .component('bwOrderItem', {
            templateUrl: "components/orderItem/orderItem.html",
            bindings: {
                item: '=item'
            },
            controllerAs: 'vm',
            controller: OrderItemController
        });

    OrderItemController.$inject = ['AuthService'];

    function OrderItemController(AuthService) {
        var vm = this;

        vm.userData = AuthService.getCurrentUserInfo();
    }
})();