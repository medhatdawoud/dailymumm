'use strict';

(function(){
    angular
        .module('dailyMummApp')
        .controller('ProfileCtrl', ProfileController);
    
    ProfileController.$inject = ['$scope'];
    
    function ProfileController($scope) {
        var vm = this;
        
    }
})();