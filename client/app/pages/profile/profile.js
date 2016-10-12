'use strict';

(function () {
    angular
        .module('dailyMummApp')
        .controller('ProfileCtrl', ProfileController);

    ProfileController.$inject = ['$scope', '$rootScope', 'AuthService', '$state', '$timeout'];

    function ProfileController($scope, $rootScope, AuthService, $state, $timeout) {
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