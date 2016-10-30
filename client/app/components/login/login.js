'use strict';

(function () {
    angular
        .module('dailyMummApp')
        .directive('bwLogin', Login);

    function Login() {
        var directive = {
            templateUrl: 'components/login/login.html',
            controller: 'LoginDirectiveCtrl',
            restric: 'EA'
        };

        return directive;
    }
})();