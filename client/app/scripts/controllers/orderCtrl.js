'use strict';

(function () {
    angular
        .module('dailyMummApp')
        .controller('OrderCtrl', OrderController);

    OrderController.$inject = ['$scope', 'ListsService'];

    function OrderController($scope, ListsService) {
        var vm = this;

        vm.restaurants = [
            "Majesty",
            "McDonalds",
            "KFC",
            "Wel3teen"
        ];
        
        vm.restaurant = vm.restaurants[0];
        
        vm.listOfGroups = ListsService.getLists();
    }
})();