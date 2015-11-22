'use strict';

(function(){
    angular
        .module('dailyMummApp')
        .controller('HomeCtrl', HomeController);
    
    HomeController.$inject = ['$scope'];
    
    function HomeController($scope) {
        var vm = this;
        
        vm.title = "My Homepage";
        
    }
})();