'use strict';

(function () {
    angular
        .module('dailyMummApp')
        .controller('OrderCtrl', OrderController);

    OrderController.$inject = ['$scope', 'ListsService', 'RestaurantsService'];

    function OrderController($scope, ListsService, RestaurantsService) {
        var vm = this;
        
        vm.listOfGroups = ListsService.getLists();

        vm.restaurants = RestaurantsService.getRestaurants();
        
        vm.restChanged = function() {
            console.log(vm.restaurant);
        }
        
        vm.restaurant = "-1";
    }
})();