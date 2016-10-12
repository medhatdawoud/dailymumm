'use strict';

(function () {
    angular
        .module('dailyMummApp')
        .directive('bwVideoBg', Signup);

    function Signup() {
        var directive = {
            templateUrl: 'components/videoBg/videoBg.html',
            restric: 'EA'
        };

        return directive;
    }
})();