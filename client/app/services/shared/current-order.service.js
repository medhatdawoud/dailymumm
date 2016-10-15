'use strict';

(function () {
    angular
        .module('dailyMummApp')
        .service('CurrentOrderService', CurrentOrderService);

    CurrentOrderService.$inject = [];

    function CurrentOrderService() {
        var service = {};

        service.orderData = {};
        
        return service;
    }
})();