'use strict';

(function () {
    angular
        .module('dailyMummApp')
        .directive('bwNavbar', Navbar);

    Navbar.$inject = ['CountDownService', '$rootScope'];

    function Navbar(CountDownService, $rootScope) {
        var directive = {
            templateUrl: 'components/navbar/navbar.html',
            controller: 'NavbarDirectiveCtrl',
            restric: 'EA'
        };

        return directive;
    }
})();