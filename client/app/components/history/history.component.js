'use strict';

(function () {
    angular
        .module('dailyMummApp')
        .component('bwHistory', {
            templateUrl: "components/history/history.html",
            controllerAs: 'hvm',
            controller: HistoryCtrl
        });

    HistoryCtrl.$inject = ['OrdersService', 'AuthService'];

    function HistoryCtrl(OrdersService, AuthService) {
        var hvm = this;

        hvm.userdata = AuthService.getCurrentUserInfo();
        hvm.orderItems = [];
        hvm.$OnInit = OrdersService.getOrdersByUserId(hvm.userdata.id, function (response) {
            if (response.success) {
                hvm.orderItems = response.data;
                console.log(response.data);
            }
        });
    }
})();