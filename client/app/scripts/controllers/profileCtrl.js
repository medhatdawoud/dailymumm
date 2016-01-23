'use strict';

(function(){
    angular
        .module('dailyMummApp')
        .controller('ProfileCtrl', ProfileController);
    
    ProfileController.$inject = ['$scope','AuthService','$state'];
    
    function ProfileController($scope, AuthService, $state) {
        var vm = this;
        
        if(!AuthService.isLoggedIn()) {
			$state.go('home');
		}
        
    }
})();