'use strict';

(function () {
    angular
        .module('dailyMummApp')
        .service('OrdersService', OrdersService);

    OrdersService.$inject = ['$http', 'apiServer', '$timeout'];

    function OrdersService($http, apiServer, $timeout) {
        var service = {};

        service.getOrderById = getOrderById;
        service.createOrder = createOrder;
        service.pushOrderItem = pushOrderItem;

        function getOrderById(orderId, callback) {
            $http.get(apiServer + '/api/order/byid', { params: { id: orderId } })
                .then(function (response) {
                    callback({ success: true, data: response.data });
                }, function (response) {
                    callback({ success: false, code: response.data });
                });
        }

        function createOrder(creator, list, restaurant, callback) {
            $http.post(apiServer + '/api/order', { creator: angular.toJson(creator), list: angular.toJson(list), restaurant: angular.toJson(restaurant) })
                .then(function (response) {
                    callback({ success: true, data: response.data });
                }, function (response) {
                    callback({ success: false, code: response.data });
                });
        }

        function pushOrderItem(orderId, orderItem, callback) {
            $http.put(apiServer + '/api/order', { orderId: orderId, orderItem: angular.toJson(orderItem) })
                .then(function (response) {
                    callback({ success: true, data: response.data });
                }, function (response) {
                    callback({ success: false, code: response.data });
                });
        }

        return service;
    }
})();