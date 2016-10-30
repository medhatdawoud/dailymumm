'use strict';

(function () {
    angular
        .module('dailyMummApp')
        .controller('LoginDirectiveCtrl', LoginDirectiveController);

    LoginDirectiveController.$inject = ['$scope', 'UserService', 'AuthService', '$state', '$translate'];

    function LoginDirectiveController($scope, UserService, AuthService, $state, $translate) {

        if (AuthService.isLoggedIn()) {
            $state.go('profile');
        }
        
        //default tab (login , register)
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
                        AuthService.setCredintials(result.data);
                        $state.go('profile.view');
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