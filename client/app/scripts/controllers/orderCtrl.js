'use strict';

(function () {
    angular
        .module('dailyMummApp')
        .controller('OrderCtrl', OrderController);

    OrderController.$inject = ['$scope', '$state', 'ListsService', 'RestaurantsService', '$timeout'];

    function OrderController($scope, $state, ListsService, RestaurantsService, $timeout) {
        var vm = this;

        vm.listOfGroups = ListsService.getLists();

        vm.restaurants = RestaurantsService.getRestaurants();

        vm.changeRestaurant = changeRestaurant;

        vm.startOrder = startOrder;

        function startOrder() {
            var confirmed = confirm("By clicking on this button, you will start order from the selected restaurant, are you sure ?");
            if (confirmed) {
                $state.go("orderlist");
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