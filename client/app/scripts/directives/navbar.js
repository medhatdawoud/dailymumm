'use strict';

(function(){
    angular
        .module('dailyMummApp')
        .directive('bwNavbar', Navbar);

    function Navbar() {
        var directive = {
            templateUrl: '/views/components/navbar.html',
            controller: 'NavbarDirectiveCtrl',
            restric: 'EA'
        };
        
        return directive;
    }
})();