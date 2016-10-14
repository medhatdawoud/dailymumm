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
        lvm.tempListData = {
            name: "",
            picturePath: "assets/images/lists/list1.jpg",
            subscribers: []
        };
        lvm.$onInit = getLists();
        lvm.removeFromInvitations = removeFromInvitations;
        lvm.addToInvitations = addToInvitations;
        lvm.createList = createList;
        lvm.editList = editList;
        lvm.editListMode = false;
        lvm.updateList = updateList;

        function editList(list) {
            lvm.editListMode = true;
            lvm.tempListData = {
                id: list.id,
                name: list.name,
                picturePath: list.picturePath,
                owned: list.owned,
                subscribers: []
            };
            $("#createListModal").modal();
        }

        function removeFromInvitations(index) {
            lvm.tempListData.subscribers.splice(index, 1);
        }

        function addToInvitations(email) {
            for (var i = 0; i < lvm.tempListData.subscribers.length; i++) {
                if (lvm.tempListData.subscribers[i].email == email) {
                    lvm.inviteEmail = "";
                    return;
                }
            }
            lvm.tempListData.subscribers.push({ email: email });
            lvm.inviteEmail = "";
        }

        function createList() {
            ListsService.createList(lvm.userData, lvm.tempListData, function (response) {
                if (response.success) {
                    lvm.tempListData = {
                        name: "",
                        picturePath: "",
                        subscribers: []
                    }
                    $("#createListModal").modal('hide');
                }
            });
        }

        function updateList() {
            ListsService.updateList(lvm.tempListData, function (response) {
                if (response.success) {
                    lvm.tempListData = {
                        name: "",
                        picturePath: "",
                        subscribers: []
                    }

                    $("#createListModal").modal('hide');
                }
            });
        }

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

                    loadCarousel();        
                }
            });
        }

        $('#createListModal').on('hidden.bs.modal', function () {
            lvm.editListMode = false;
            getLists();
            // $('.list-groups').trigger('refresh.owl.carousel');
            $('.list-groups').trigger('next.owl.carousel');
            $('.list-groups').trigger('previous.owl.carousel');
        });

        function loadCarousel() {
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

        // loadCarousel();
    }
})();