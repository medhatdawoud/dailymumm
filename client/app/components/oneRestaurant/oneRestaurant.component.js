'use strict';

(function () {
    angular
        .module('dailyMummApp')
        .component('bwOneRestaurant', {
            templateUrl: "components/oneRestaurant/oneRestaurant.html",
            bindings: {
                restaurant: '=restaurant'
            },
            controllerAs: 'vm',
            controller: OneRestaurantCtrl
        });

    OneRestaurantCtrl.$inject = [];

    function OneRestaurantCtrl() {
        var vm = this;
    }
})();