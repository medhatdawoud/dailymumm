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
        lvm.defaultListPicture = "assets/images/lists/list1.jpg";
        lvm.tempListData = {
            name: "",
            picturePath: "",
            invitations: [],
            subscribers: []
        };
        lvm.$onInit = getLists();
        lvm.removeFromInvitations = removeFromInvitations;
        lvm.addToInvitations = addToInvitations;
        lvm.createList = createList;
        lvm.editList = editList;
        lvm.disableEditMode = disableEditMode;
        lvm.editListMode = false;
        lvm.updateList = updateList;
        lvm.getLists = getLists;

        function editList(list) {
            lvm.editListMode = true;
            lvm.tempListData = {
                id: list.id,
                name: list.name,
                picturePath: list.picturePath,
                owned: list.owned,
                invitations: [],
                subscribers: list.subscribers
            };
            $("#createListModal").modal();
        }

        function removeFromInvitations(index) {
            lvm.tempListData.invitations.splice(index, 1);
        }

        function addToInvitations(email) {
            lvm.duplicatedEmail = false;
            for (var i = 0; i < lvm.tempListData.subscribers.length; i++) {
                if (lvm.tempListData.subscribers[i].email == email) {
                    lvm.duplicatedEmail = true;
                    return;
                }
            }
            for (var i = 0; i < lvm.tempListData.invitations.length; i++) {
                if (lvm.tempListData.invitations[i].email == email) {
                    lvm.duplicatedEmail = true;
                    return;
                }
            }
            lvm.tempListData.invitations.push({ email: email, confirmed: false });
            lvm.inviteEmail = "";
        }

        function createList() {
            ListsService.createList(lvm.userData, lvm.tempListData, function (response) {
                if (response.success) {
                    lvm.tempListData = {
                        name: "",
                        picturePath: "",
                        subscribers: [],
                        invitations: []
                    }
                    reloadLists();
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
                        invitations: [],
                        subscribers: []
                    }
                    reloadLists();
                    $("#createListModal").modal('hide');
                }
            });
        }

        function getLists(callback) {
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
                            owned: item.subscribers.filter(function (val) {
                                return val.id === userId && val.owner === true;
                            }).length === 1,
                            owner: item.subscribers.filter(function (val) {
                                return val.owner === true;
                            })[0] || false,
                            subscribers: item.subscribers
                        };
                        newLists.push(list);
                    });
                    lvm.listOfGroups = newLists;

                    if (typeof (callback) == "function")
                        callback();
                }
            });
        }

        $('#createListModal').on('hide.bs.modal', function () {
            reset();
        });

        function reset() {
            lvm.editListMode = false;
            lvm.duplicatedEmail = false;
            lvm.inviteEmail = "";
            lvm.tempListData = {
                name: "",
                picturePath: "",
                invitations: [],
                subscribers: []
            };
        }

        function disableEditMode() {
            lvm.editListMode = false;
        }

        function reloadLists() {
            getLists(function () {
                $timeout(function () {
                    var $owl = $('.list-groups');
                    $owl.find('.owl-stage-outer').html("");
                    $owl.trigger('destroy.owl.carousel');
                    $owl.find('.owl-stage-outer').remove();
                    $owl.removeClass('owl-loaded');
                    $owl.owlCarousel({
                        items: 5,
                        nav: true,
                        navText: ["<i class='glyphicon glyphicon-chevron-left'></i>", "<i class='glyphicon glyphicon-chevron-right'></i>"]
                    });
                }, 10);
            });
        }

        function loadCarousel() {
            $timeout(function () {
                if ($("a.one-list").length) {
                    $(".list-groups").owlCarousel({
                        items: 5,
                        nav: true,
                        navText: ["<i class='glyphicon glyphicon-chevron-left'></i>", "<i class='glyphicon glyphicon-chevron-right'></i>"]
                    });
                }
            }, 100);
        }

        loadCarousel();

        $rootScope.$on('updateListOfGroups', function () {
            reloadLists();
        });
    }
})();