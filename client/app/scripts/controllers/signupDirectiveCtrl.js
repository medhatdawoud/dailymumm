'use strict';

(function(){
    angular
        .module('dailyMummApp')
        .controller('SignupDirectiveCtrl', SignupDirectiveController);
    
    SignupDirectiveController.$inject = ['$scope','UserService','AuthService','$state','$translate'];
    
    function SignupDirectiveController($scope, UserService, AuthService, $state, $translate) {
        
        if(AuthService.isLoggedIn()) {
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
        
        function register(isValid) {
            $scope.processing = true;
            if(isValid) {
                var data = $scope.registerdata;
                UserService.createNewUser(data.username, data.email, data.password, function(data){
                    if(data.success) {
                        console.log(data);
                    }
                });
            }
            $scope.processing = false;
        }
        
        function login(isValid) {
            $scope.processing = true;
            if(isValid) {
                var data = $scope.logindata;
                AuthService.login( data.email, data.password, function(result){
                    if(result.success) {
                        AuthService.setCredintials(result.data);
                        $state.go('profile');
                    } else {
                        $scope.hasError = true;
                        $translate(result.code).then(function(translatedValue){
                            $scope.errorMessage = translatedValue;
                        });
                    }
                    $scope.processing = false;
                });                
            }
        }
        
    }
})();