'use strict';

(function () {
    angular
        .module('dailyMummApp')
        .controller('InvitationsDirectiveCtrl', InvitationsDirectiveController);

    InvitationsDirectiveController.$inject = ['$rootScope','AuthService'];

    function InvitationsDirectiveController($rootScope,AuthService) {
        var ivm = this;

        ivm.joinList = joinList;
        ivm.ignoreList = ignoreList;
        ivm.$onInit = loadInvitations;

        ivm.invitations = [];

        function loadInvitations() {
            ivm.invitations = AuthService.getCurrentUserInfo().invitations;
        }

        function ignoreList(listId){
            alert('ignored');
            
        }

        function joinList(listId) {
            alert('joined');
            $rootScope.$emit('updateListOfGroups');
            for(var i = 0; i < ivm.invitations.length; i++) {
                if(ivm.invitations[i].id == listId) {
                    ivm.invitations.splice(i, 1);
                    break;
                }
            }
        }
    }
})();