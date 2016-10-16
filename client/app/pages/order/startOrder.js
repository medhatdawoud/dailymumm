'use strict';

(function () {
    angular
        .module('dailyMummApp')
        .controller('StartOrderCtrl', StartOrderController);

    StartOrderController.$inject = ['$scope', '$rootScope', '$state', 'ListsService', 'RestaurantsService', '$timeout', 'CountDownService', 'AuthService', 'CurrentOrderService'];

    function StartOrderController($scope, $rootScope, $state, ListsService, RestaurantsService, $timeout, CountDownService, AuthService, CurrentOrderService) {
        var vm = this;

        vm.userData = AuthService.getCurrentUserInfo();
        vm.$onInit = getLists();
        vm.listOfGroups = [];
        vm.restaurants = RestaurantsService.getRestaurants();
        vm.changeRestaurant = changeRestaurant;
        vm.startOrder = startOrder;
        vm.listSelected = listSelected;
        vm.selectedList = null;

        function listSelected(list) {
            vm.listOfGroups.forEach(function (item) {
                if (item.id != list.id)
                    item.selected = false;
            });
            vm.selectedList = list;
        }

        function getLists() {
            var userId = vm.userData.id;
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
                    vm.listOfGroups = newLists;

                    $timeout(function () {
                        $('.subscribers-count').each(function (index) {
                            if (parseInt($(this).text())) {
                                $(this).tooltip({
                                    html: true,
                                    placement: 'bottom',
                                    title: function () {
                                        return $(this).parent().find('.tooltip-content').html();
                                    }
                                });
                            }
                        });
                    }, 100);

                }
            });
        }

        function startOrder() {
            var confirmed = confirm("By clicking on this button, you will start order from the selected restaurant. \n \n Are you sure ?");
            if (confirmed) {
                CurrentOrderService.orderData.list = vm.selectedList;
                CurrentOrderService.orderData.restaurant = vm.restaurant;
                CurrentOrderService.orderData.creator = vm.userData;
                CurrentOrderService.orderData.startTime = new Date();

                $state.go("order");

                $timeout(function () {
                    $rootScope.$broadcast('orderStart');
                }, 300);
            }
        }

        function changeRestaurant() {
            $(".chosen-select").trigger("chosen:updated");
        }

        $timeout(function () {
            $(".chosen-select").chosen({ width: "100%" });
        }, 300);
    }
})();