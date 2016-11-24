'use strict';

(function () {
    angular
        .module('dailyMummApp')
        .component('bwLogin', {
            templateUrl: "components/login/login.html",
            controller: LoginController
        });

    LoginController.$inject = ['$scope', '$stateParams', 'AuthService', '$state', '$translate', 'ListsService', 'UserService'];

    function LoginController($scope, $stateParams, AuthService, $state, $translate, ListsService, UserService) {

        if (AuthService.isLoggedIn()) {
            if ($stateParams.lid) {
                var userdata = AuthService.getCurrentUserInfo();
                var listId = $stateParams.lid;
                ListsService.addInvitationToUser(listId, userdata.id, function (res) {
                    if (res.success) {
                        UserService.getUserBasicInfoById(userdata.id, function (response) {
                            if (response.success) {
                                var userInfo = AuthService.getCurrentUserInfo();
                                userInfo.invitations = response.data.invitations;
                                AuthService.setCredintials(userInfo);
                            }
                        });
                        $state.go('profile.view');
                    }
                });
            } else {
                $state.go('profile');
            }
        }

        $scope.current = 'login';
        $scope.showPanel = showPanel;
        $scope.login = login;
        $scope.logindata = {};

        function showPanel(panel) {
            $scope.current = panel;
        }

        function login(isValid) {
            $scope.processing = true;
            if (isValid) {
                var data = $scope.logindata;
                AuthService.login(data.email, data.password, function (result) {
                    if (result.success) {
                        if ($stateParams.lid) {
                            ListsService.addInvitationToUser($stateParams.lid, result.data.id, function (res) {
                                if (res.success) {
                                    AuthService.setCredintials(res.data);
                                    UserService.getUserBasicInfoById(result.data.id, function (response) {
                                        if (response.success) {
                                            var userInfo = result.data;
                                            userInfo.invitations = response.data.invitations;
                                            debugger
                                            AuthService.setCredintials(userInfo);
                                        }
                                    });
                                    $state.go('profile.view');
                                }
                            });
                        } else {
                            AuthService.setCredintials(result.data);
                            $state.go('profile.view');
                        }
                    } else {
                        $scope.hasError = true;
                        $scope.hasSuccess = false;
                        $translate(result.code).then(function (translatedValue) {
                            $scope.errorMessage = translatedValue;
                        });
                    }
                    $scope.processing = false;
                });
            }
        }

    }
})();