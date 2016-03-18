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
        
        $timeout(function(){
            $(".chosen-select").chosen({width: "100%"});
        }, 300);
        
    }
})();