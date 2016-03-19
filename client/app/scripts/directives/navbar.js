'use strict';

(function () {
    angular
        .module('dailyMummApp')
        .directive('bwNavbar', Navbar);

    Navbar.$inject = ['CountDownService', '$rootScope'];

    function Navbar(CountDownService, $rootScope) {
        var directive = {
            templateUrl: '/views/components/navbar.html',
            controller: 'NavbarDirectiveCtrl',
            restric: 'EA',
            link: function (scope) {
                $rootScope.$on('orderStarted', startOrder);

                function startOrder() {
                    setTimeout(function () {
                        CountDownService.initializeClock("count-down", new Date(Date.parse(new Date()) + 30 * 60 * 1000))
                    }, 300);
                }
            }
        };

        return directive;
    }
})();