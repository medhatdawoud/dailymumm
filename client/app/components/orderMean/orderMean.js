'use strict';

(function () {
    angular
        .module('dailyMummApp')
        .directive('bwOrderMean', OrderMean);

    OrderMean.$inject = [];

    function OrderMean() {
        var directive = {
            templateUrl: 'components/orderMean/orderMean.html',
            controller: 'OrderMeanDirectiveCtrl',
            controllerAs: 'vm',
            restric: 'EA'
        };

        return directive;
    }
})();