'use strict';

(function(){
    angular
        .module('dailyMummApp')
        .controller('HomeCtrl', HomeController);
    
    HomeController.$inject = ['$scope'];
    
    function HomeController($scope) {
        var vm = this;
        
        vm.steps = [
        	"Login or Create a new account",
        	"Join a group or create a one to order food together",
        	"Choose a restaurant and start an order",
        	"enjoy tracking your orders with others' orders"
        ];
    }
})();