'use strict';

(function () {
    angular.module('dailyMummApp').config(["$stateProvider", "$urlRouterProvider", "$translateProvider",
        function ($stateProvider, $urlRouterProvider, $translateProvider) {
            $urlRouterProvider.otherwise('/');
            $stateProvider
                .state('home', {
                    url: '/',
                    templateUrl: 'pages/home/home.html',
                    controller: 'HomeCtrl',
                    controllerAs: 'vm'
                })
                .state('order', {
                    url: '/order',
                    templateUrl: 'pages/order/startOrder.html',
                    controller: 'OrderCtrl',
                    controllerAs: 'vm'
                })
                .state('orderlist', {
                    url: '/order/list',
                    templateUrl: 'pages/order/orderList.html',
                    controller: 'OrderCtrl',
                    controllerAs: 'vm'
                })
                .state('profile', {
                    url: '/profile',
                    templateUrl: 'pages/profile/profile.html',
                    controller: 'ProfileCtrl',
                    controllerAs: 'vm'
                })
                .state('profile.view', {
                    url: '/view',
                    templateUrl: 'pages/profile/profile.view.html',
                    parent: 'profile'
                })
                .state('profile.lists', {
                    url: '/lists',
                    templateUrl: 'pages/profile/profile.lists.html',
                    parent: 'profile'
                })
                .state('profile.list', {
                    url: '/list/:id',
                    templateUrl: 'pages/profile/profile.onelist.html',
                    parent: 'profile'
                })
                .state('profile.edit', {
                    url: '/edit',
                    templateUrl: 'pages/profile/profile.edit.html',
                    parent: 'profile'
                });

            $translateProvider.useUrlLoader('localization/en.json');
            $translateProvider.preferredLanguage('en');
        }]);
})();