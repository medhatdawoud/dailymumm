'use strict';

(function () {
    angular
        .module('dailyMummApp')
        .controller('ListsDirectiveCtrl', ListsDirectiveController);

    ListsDirectiveController.$inject = ['$scope', 'ListsService', '$timeout', '$rootScope'];

    function ListsDirectiveController($scope, ListsService, $timeout, $rootScope) {
        var lvm = this;
        lvm.listOfGroups = ListsService.getLists();

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