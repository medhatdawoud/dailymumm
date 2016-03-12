'use strict';

(function () {
    angular
        .module('dailyMummApp')
        .controller('ProfileCtrl', ProfileController);

    ProfileController.$inject = ['$scope', '$rootScope', 'AuthService', '$state', 'ListsService', '$timeout'];

    function ProfileController($scope, $rootScope, AuthService, $state, ListsService, $timeout) {
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

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams, options) {
            $timeout(function() {
                if(toState.parent == "profile") {
                    if ($("a.one-list").length > 0) {
                        $(".list-groups").owlCarousel({
                            items: 5,
                            lazyLoad: true,
                            navigation: true,
                            pagination: false,
                            rewindNav: false,
                            navigationText: ["<i class='glyphicon glyphicon-chevron-left'></i>", "<i class='glyphicon glyphicon-chevron-right'></i>"]
                        });
                    }
                } 
            }, 500);
        });

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