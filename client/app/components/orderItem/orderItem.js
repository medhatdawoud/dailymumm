'use strict';

(function () {
    angular
        .module('dailyMummApp')
        .directive('bwOrderItem', OrderItem);

    OrderItem.$inject = [];

    function OrderItem() {
        var directive = {
            templateUrl: 'components/orderItem/orderItem.html',
            scope: {
                item: '=item'
            },
            controller: 'OrderItemDirectiveCtrl',
            controllerAs: 'vm',
            restrict: 'EA'
        };

        return directive;
    }
})();