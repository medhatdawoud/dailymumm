'use strict';

(function () {
    angular
        .module('dailyMummApp')
        .controller('ProfileCtrl', ProfileController);

    ProfileController.$inject = ['$scope', 'AuthService', '$state', 'ListsService'];

    function ProfileController($scope, AuthService, $state, ListsService) {
        var vm = this;

        if (!AuthService.isLoggedIn()) {
            $state.go('home');
        } else {
            $state.go('profile.view');
        }

        vm.changePassword = false;

        vm.showChangePasswordPanel = showChangePasswordPanel;
        vm.saveChangePassword = saveChangePassword;
        vm.showViewProfile = showViewProfile;
        vm.showEditProfile = showEditProfile;
        vm.listOfGroups = ListsService.getLists();

        function showChangePasswordPanel() {
            vm.changePassword = true;
        }

        function saveChangePassword() {
            vm.changePassword = false;
        }

        function showViewProfile() {
            vm.changePassword = false;
        }

        function showEditProfile() { }
    }
})();