'use strict';

(function () {
    angular
        .module('dailyMummApp')
        .controller('InvitationsDirectiveCtrl', InvitationsDirectiveController);

    InvitationsDirectiveController.$inject = [];

    function InvitationsDirectiveController() {
        var ivm = this;

        ivm.invitations = [
            {
                id: "123456",
                name: "kokoawa",
                subscribers: [
                    {email: "medhat@gmail.com", username: "medhat"}
                ]
            },
            {
                id: "123456",
                name: "bababebo",
                subscribers: [
                    {email: "medhat@gmail.com", username: "medhat"}
                ]
            },
            {
                id: "123456",
                name: "lalalalala",
                subscribers: [
                    {email: "medhat@gmail.com", username: "medhat"}
                ]
            }
        ];
    }
})();