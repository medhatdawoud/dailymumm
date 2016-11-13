'use strict';

(function () {
    angular
        .module('dailyMummApp')
        .directive('bwInvitations', Invitations);

    function Invitations() {
        var directive = {
            templateUrl: 'components/invitations/invitations.html',
            controller: 'InvitationsDirectiveCtrl',
            controllerAs: 'ivm',
            restric: 'EA'
        };

        return directive;
    }
})();