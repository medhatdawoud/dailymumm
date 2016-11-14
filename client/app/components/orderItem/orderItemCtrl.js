'use strict';

(function () {
    angular
        .module('dailyMummApp')
        .controller('OrderItemDirectiveCtrl', OrderItemDirectiveController);

    OrderItemDirectiveController.$inject = ['AuthService'];

    function OrderItemDirectiveController(AuthService) {
        var vm = this;

        vm.userData = AuthService.getCurrentUserInfo();
    }
})();