'use strict';

(function () {
    angular
        .module('dailyMummApp')
        .controller('RestaurantCardDirectiveCtrl', RestaurantCardDirectiveController);

    RestaurantCardDirectiveController.$inject = [];

    function RestaurantCardDirectiveController() {
        var vm = this;
    }
})();