'use strict';

(function () {
    angular
        .module('dailyMummApp')
        .directive('bwRestaurantCard', RestaurantCard);

    RestaurantCard.$inject = [];

    function RestaurantCard() {
        var directive = {
            templateUrl: 'components/restaurantCard/restaurantCard.html',
            scope: {
                restaurant: '=restaurant'
            },
            controller: 'RestaurantCardDirectiveCtrl',
            controllerAs: 'vm',
            restrict: 'EA'
        };

        return directive;
    }
})();