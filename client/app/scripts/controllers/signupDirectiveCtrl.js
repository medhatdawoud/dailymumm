'use strict';

(function(){
    angular
        .module('dailyMummApp')
        .controller('SignupDirectiveCtrl', HomeController);
    
    HomeController.$inject = ['$scope'];
    
    function HomeController($scope) {

        $scope.title = "Signup Page";
        $scope.current = 'login';
        
        $scope.showPanel = showPanel;
        
        function showPanel(panel) {
            $scope.current = panel;
        }
        
    }
})();