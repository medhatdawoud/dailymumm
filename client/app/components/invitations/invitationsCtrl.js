'use strict';

(function () {
    angular
        .module('dailyMummApp')
        .controller('InvitationsDirectiveCtrl', InvitationsDirectiveController);

    InvitationsDirectiveController.$inject = ['$rootScope','AuthService','ListsService'];

    function InvitationsDirectiveController($rootScope,AuthService, ListsService) {
        var ivm = this;
        var userdata = AuthService.getCurrentUserInfo();

        ivm.joinList = joinList;
        ivm.ignoreList = ignoreList;
        ivm.$onInit = loadInvitations;

        ivm.invitations = [];

        function loadInvitations() {
            ivm.invitations = userdata.invitations;
        }

        function ignoreList(listId){
            alert('ignored');
            
        }

        function joinList(listId) {
            ListsService.confirmInvitation(listId, userdata, function (response){
                if(response.success) {
                    $rootScope.$emit('updateListOfGroups');
                    for(var i = 0; i < ivm.invitations.length; i++) {
                        if(ivm.invitations[i].id == listId) {
                            ivm.invitations.splice(i, 1);
                            break;
                        }
                    }
                }
            });
        }
    }
})();