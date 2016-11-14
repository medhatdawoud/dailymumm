'use strict';

(function() {
    angular
        .module('dailyMummApp')
        .controller('HistoryDirectiveCtrl', HistoryDirectiveController);

    HistoryDirectiveController.$inject = ['OrdersService', 'AuthService'];

    function HistoryDirectiveController(OrdersService, AuthService) {
        var hvm = this;

        hvm.userdata = AuthService.getCurrentUserInfo();
        hvm.orderItems = [];
        hvm.$OnInit = OrdersService.getOrdersByUserId(hvm.userdata.id, function(response) {
            if (response.success) {
                hvm.orderItems = response.data;
                console.log(response.data);
            }
        });
    }
})();