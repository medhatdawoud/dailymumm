'use strict';

(function () {
    angular
        .module('dailyMummApp')
        .service('OrdersService', OrdersService);

    OrdersService.$inject = ['$http', 'apiServer', '$timeout','AuthService'];

    function OrdersService($http, apiServer, $timeout, AuthService) {
        var service = {};
        var userdata = AuthService.getCurrentUserInfo();

        service.getOrderById = getOrderById;
        service.createOrder = createOrder;
        service.pushOrderItem = pushOrderItem;
        service.getOrdersByUserId = getOrdersByUserId;
        service.updateOrder = updateOrder;
        service.checkCreatorOfOrder = checkCreatorOfOrder;

        function getOrderById(orderId, callback) {
            $http.get(apiServer + '/api/order/byid', { params: { id: orderId } })
                .then(function (response) {
                    callback({ success: true, data: response.data });
                }, function (response) {
                    callback({ success: false, code: response.data });
                });
        }

        function getOrdersByUserId(userId, callback) {
            $http.get(apiServer + '/api/order/byuser', { params: { userid: userId } })
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

        function updateOrder(orderObj, callback) {
            $http.put(apiServer + '/api/order', { order: angular.toJson(orderObj) })
                .then(function (response) {
                    callback({ success: true, data: response.data });
                }, function (response) {
                    callback({ success: false, code: response.data });
                });
        }

        function pushOrderItem(orderId, orderItem, callback) {
            $http.put(apiServer + '/api/order/additems', { orderId: orderId, orderItem: angular.toJson(orderItem) })
                .then(function (response) {
                    callback({ success: true, data: response.data });
                }, function (response) {
                    callback({ success: false, code: response.data });
                });
        }

        function checkCreatorOfOrder(order) {
            if (order.creator.id === userdata.id) {
                return true;
            }
            return false;
        }

        return service;
    }
})();