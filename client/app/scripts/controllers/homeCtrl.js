'use strict';

(function(){
    angular
        .module('dailyMummApp')
        .controller('HomeCtrl', HomeController);
    
    HomeController.$inject = ['$scope'];
    
    function HomeController($scope) {
        var vm = this;
        
        vm.title = "Daily Mumm";

        vm.about = "Daily Mumm is a web application that enable you and your colleges to order foods with each others without duplicating the same processes in the same day within different individuals in th same place, order together is simple and easy.";
        
        vm.steps = [
        	"Login or Create a new account",
        	"Join a group or create a one to order food together",
        	"Choose a restaurant and start an order",
        	"enjoy tracking your orders with others' orders"
        ];
    }
})();