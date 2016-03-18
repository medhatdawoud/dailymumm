'use strict';

(function () {
    angular
        .module('dailyMummApp')
        .controller('OrderCtrl', OrderController);

    OrderController.$inject = ['$scope', 'ListsService', 'RestaurantsService', '$timeout'];

    function OrderController($scope, ListsService, RestaurantsService, $timeout) {
        var vm = this;

        vm.listOfGroups = ListsService.getLists();

        vm.restaurants = RestaurantsService.getRestaurants();

        vm.changeRestaurant = changeRestaurant;

        function changeRestaurant() {
            var currentRest = vm.restaurant;
            
            console.log(currentRest);

            $(".chosen-select").trigger("chosen:updated");
        }
        $timeout(function () {
            $(".chosen-select").chosen({ width: "100%", allow_single_deselect: true });
        }, 300);

    }
})();