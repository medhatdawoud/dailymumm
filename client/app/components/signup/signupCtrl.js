'use strict';

(function () {
    angular
        .module('dailyMummApp')
        .controller('SignupDirectiveCtrl', SignupDirectiveController);

    SignupDirectiveController.$inject = ['$scope', 'UserService', 'AuthService', '$state', '$translate'];

    function SignupDirectiveController($scope, UserService, AuthService, $state, $translate) {

        if (AuthService.isLoggedIn()) {
            $state.go('profile');
        }
        
        //default tab (login , register)
        $scope.current = 'login';
        
        // an initial object to hold the registration data from ui
        $scope.registerdata = {};
        $scope.showPanel = showPanel;
        $scope.register = register;
        $scope.login = login;

        function showPanel(panel) {
            $scope.current = panel;
        }

        function register(isValid, form) {
            $scope.processing = true;
            if (isValid) {
                var data = $scope.registerdata;
                UserService.createNewUser(data.username, data.email, data.password, function (data) {
                    if (data.success) {
                        $scope.hasError = false;
                        $scope.hasSuccess = true;
                        $translate("ALERT_REGISTER_SUCCESS").then(function (translatedValue) {
                            $scope.registerSuccessMessage = translatedValue;
                        });
                        $scope.current = 'login';
                        $scope.registerdata = {};
                        form.$setPristine();
                    }
                });
            }
            $scope.processing = false;
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