'use strict';

(function () {
    angular
        .module('dailyMummApp')
        .directive('bwSignup', Signup);

    function Signup() {
        var directive = {
            templateUrl: 'signup.html',
            controller: 'SignupDirectiveCtrl',
            restric: 'EA'
        };

        return directive;
    }
})();