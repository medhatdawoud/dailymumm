'use strict';

(function(){
    angular
        .module('dailyMummApp')
        .controller('OrderCtrl', OrderController);
    
    OrderController.$inject = ['$scope'];
    
    function OrderController($scope) {
        var vm = this;
        
        vm.restaurants = [
            "Majesty",
            "McDonalds",
            "KFC",
            "Wel3teen"
        ];
        
        vm.restaurant = vm.restaurants[0];
    }
})();