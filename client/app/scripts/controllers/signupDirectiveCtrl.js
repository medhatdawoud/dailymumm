'use strict';

(function(){
    angular
        .module('dailyMummApp')
        .controller('SignupDirectiveCtrl', SignupDirectiveController);
    
    SignupDirectiveController.$inject = ['$scope','UserService'];
    
    function SignupDirectiveController($scope, UserService) {

        $scope.title = "Signup Page";
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
        
        function login() {
            alert('login');
        }
        
    }
})();