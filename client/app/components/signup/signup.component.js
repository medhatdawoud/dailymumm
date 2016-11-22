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

    SignupController.$inject = ['UserService', 'AuthService', '$state', '$translate'];

    function SignupController(UserService, AuthService, $state, $translate) {
        var vm = this;

        if (AuthService.isLoggedIn()) {
            $state.go('profile');
        }

        //default tab (login , register)
        vm.current = 'login';

        // an initial object to hold the registration data from ui
        vm.registerdata = {};
        vm.showPanel = showPanel;
        vm.register = register;

        function showPanel(panel) {
            vm.current = panel;
        }

        function register(isValid, form) {
            vm.processing = true;
            if (isValid) {
                var data = vm.registerdata;
                var fullname = data.fname.trim() + " " + data.lname.trim();
                UserService.createNewUser(data.username, fullname, data.email, data.password, function (data) {
                    if (data.success) {
                        vm.hasError = false;
                        vm.hasSuccess = true;
                        $translate("ALERT_REGISTER_SUCCESS").then(function (translatedValue) {
                            vm.registerSuccessMessage = translatedValue;
                        });
                        vm.current = 'login';
                        vm.registerdata = {};
                        form.$setPristine();
                    }
                });
            }
            vm.processing = false;
        }

    }
})();