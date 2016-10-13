'use strict';

(function () {
    angular
        .module('dailyMummApp')
        .controller('ProfileCtrl', ProfileController);

    ProfileController.$inject = ['$scope', '$rootScope', 'AuthService', '$state', '$timeout', 'UserService'];

    function ProfileController($scope, $rootScope, AuthService, $state, $timeout, UserService) {
        var vm = this;

        if (!AuthService.isLoggedIn()) {
            $state.go('home');
        } else {
            $state.go('profile.view');
        }

        vm.changePassword = false;

        vm.showChangePasswordPanel = showChangePasswordPanel;
        vm.saveChangePassword = saveChangePassword;
        vm.cancelChangePassword = cancelChangePassword;
        vm.saveBasicInfo = saveBasicInfo;
        vm.discardBasicInfo = discardBasicInfo;
        vm.userData = AuthService.getCurrentUserInfo();
        vm.userTempData = angular.copy(vm.userData);

        function showChangePasswordPanel() {
            vm.changePassword = true;
        }

        function saveChangePassword() {
            vm.changePassword = false;
        }

        function cancelChangePassword() {
            vm.changePassword = false;
        }

        function saveBasicInfo() {
            UserService.updateUserBasicInfo(vm.userTempData, function(data) {
                if(data.success){
                    vm.userData = angular.copy(vm.userTempData);
                    AuthService.setCredintials(vm.userTempData);
                    $state.go('profile.view');
                }
            })
         }

        function discardBasicInfo() {
            vm.userTempData = angular.copy(vm.userData);
        }
    }
})();