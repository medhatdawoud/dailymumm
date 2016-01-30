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
		} else {
            $state.go('profile.view');
        }
        
        vm.changePassword = false;
        
        vm.showChangePasswordPanel = showChangePasswordPanel;
        vm.saveChangePassword = saveChangePassword;
        vm.showViewProfile = showViewProfile;
        vm.showEditProfile = showEditProfile;
        vm.listOfGroups = [
            {
                id:77,
                title: "مها مدحت",
                imgPath: "images/fastfood.jpg",
                count: 2,
                owned: true
            },
            {
                id:1,
                title: "My List",
                imgPath: "images/fastfood.jpg",
                count: 1,
                owned: true
            },
            {
                id:2,
                title: "My List 2",
                imgPath: "images/fastfood.jpg",
                count: 5,
                owned: false
            },
            {
                id:3,
                title: "My List 3",
                imgPath: "images/fastfood.jpg",
                count: 2,
                owned: false
            },
            {
                id:4,
                title: "My List 4",
                imgPath: "images/fastfood.jpg",
                count: 12,
                owned: true
            },
            {
                id:5,
                title: "My List 5",
                imgPath: "images/fastfood.jpg",
                count: 15,
                owned: false
            },
            {
                id:6,
                title: "My List 6",
                imgPath: "images/fastfood.jpg",
                count: 30,
                owned: false
            }
        ];
        
        function showChangePasswordPanel(){
            vm.changePassword = true;
        } 
        
        function saveChangePassword() {
            vm.changePassword = false;
        }
        
        function showViewProfile(){
            vm.changePassword = false;
        }
        
        function showEditProfile(){}
    }
})();