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
        
        function register() {
            var data = $scope.registerdata;
            UserService.createNewUser(data.username, data.email, data.password, function(data){
                console.log(data);
            });
        }
        
        function login() {
            alert('login');
        }
        
    }
})();