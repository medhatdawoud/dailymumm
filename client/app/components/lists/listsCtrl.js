'use strict';

(function () {
    angular
        .module('dailyMummApp')
        .controller('ListsDirectiveCtrl', ListsDirectiveController);

    ListsDirectiveController.$inject = ['$scope', 'ListsService', '$timeout', '$rootScope', 'AuthService'];

    function ListsDirectiveController($scope, ListsService, $timeout, $rootScope, AuthService) {
        var lvm = this;
        lvm.listOfGroups = [];
        lvm.userData = AuthService.getCurrentUserInfo();

        lvm.$onInit = getLists();

        function getLists() {
            var userId = lvm.userData.id;
            ListsService.getLists(userId, function (response) {
                if (response.success) {
                    var newLists = [];
                    response.data.forEach(function (item) {
                        var list = {
                            id: item._id,
                            name: item.name,
                            createdAt: item.created_at,
                            picturePath: item.picturePath,
                            owned: item.owner.id === userId,
                            owner: item.owner,
                            subscribers: item.subscribers
                        };
                        newLists.push(list);
                    });
                    lvm.listOfGroups = newLists;
                }
            });
        }

        $timeout(function () {
            if ($("a.one-list").length) {
                $(".list-groups").owlCarousel({
                    items: 5,
                    lazyLoad: true,
                    navigation: true,
                    pagination: false,
                    rewindNav: false,
                    navigationText: ["<i class='glyphicon glyphicon-chevron-left'></i>", "<i class='glyphicon glyphicon-chevron-right'></i>"]
                });
            }
        }, 300);
    }
})();