'use strict';

(function () {
    angular
        .module('dailyMummApp')
        .component('bwRestaurantCard', {
            templateUrl: "components/restaurantCard/restaurantCard.html",
            bindings: {
                restaurant: '=restaurant'
            },
            controllerAs: 'vm',
            controller: RestaurantCardCtrl
        });

    RestaurantCardCtrl.$inject = [];

    function RestaurantCardCtrl() {
        var vm = this;
    }
})();