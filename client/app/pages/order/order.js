'use strict';

(function () {
    angular
        .module('dailyMummApp')
        .controller('OrderCtrl', OrderController);

    OrderController.$inject = ['$scope', '$rootScope', '$state', 'CountDownService', 'AuthService', 'CurrentOrderService'];

    function OrderController($scope, $rootScope, $state, CountDownService, AuthService, CurrentOrderService) {
        var vm = this;

        console.log(CurrentOrderService.orderData);

        $scope.$on('orderStart', function () {
            $rootScope.$broadcast('orderStarted');
        })
    }
})();
