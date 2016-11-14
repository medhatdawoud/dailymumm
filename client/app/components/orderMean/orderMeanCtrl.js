'use strict';

(function () {
    angular
        .module('dailyMummApp')
        .controller('OrderMeanDirectiveCtrl', OrderMeanDirectiveController);

    OrderMeanDirectiveController.$inject = [];

    function OrderMeanDirectiveController() {
        var vm = this;

        vm.orderMeans = [
            "Phone Call", "Passby the Restaurant", "Will go all to there", "Otlob.com", "elmenus.com", "Others"
        ];
        vm.orderSelectedMean = vm.orderMeans[0];
    }
})();