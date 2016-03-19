'use strict';

(function () {
    angular
        .module('dailyMummApp')
        .controller('OrderCtrl', OrderController);

    OrderController.$inject = ['$scope', '$rootScope', '$state', 'ListsService', 'RestaurantsService', '$timeout', 'CountDownService'];

    function OrderController($scope, $rootScope, $state, ListsService, RestaurantsService, $timeout, CountDownService) {
        var vm = this;

        vm.listOfGroups = ListsService.getLists();

        vm.restaurants = RestaurantsService.getRestaurants();

        vm.changeRestaurant = changeRestaurant;

        vm.startOrder = startOrder;

        function startOrder() {
            var confirmed = confirm("By clicking on this button, you will start order from the selected restaurant. \n \n Are you sure ?");
            if (confirmed) {
                $state.go("orderlist");
                $rootScope.$broadcast('orderStarted');
            }
        }

        function changeRestaurant() {
            $(".chosen-select").trigger("chosen:updated");
        }

        $timeout(function () {
            $(".chosen-select").chosen({ width: "100%" });
        }, 300);
    }
})();