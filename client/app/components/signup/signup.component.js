'use strict';

(function () {
    angular
        .module('dailyMummApp')
        .component('bwSignup', {
            templateUrl: "components/signup/signup.html",
            bindings: {
                order: '='
            },
            controllerAs: 'vm',
            controller: SignupController
        });

    SignupController.$inject = ['$scope', 'UserService', 'AuthService', '$state', '$translate'];

    function SignupController($scope, UserService, AuthService, $state, $translate) {
        var vm = this;

        if (AuthService.isLoggedIn()) {
            $state.go('profile');
        }

        //default tab (login , register)
        $scope.current = 'login';

        // an initial object to hold the registration data from ui
        $scope.registerdata = {};
        $scope.showPanel = showPanel;
        $scope.register = register;

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

    }
})();