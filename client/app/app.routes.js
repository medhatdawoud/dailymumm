'use strict';

(function () {
    angular.module('dailyMummApp').config(["$stateProvider", "$urlRouterProvider", "$translateProvider",
        function ($stateProvider, $urlRouterProvider, $translateProvider) {
            //delete $httpProvider.defaults.headers.common['X-Requested-With'];
            $urlRouterProvider.otherwise('/');
            $stateProvider
                .state('home', {
                    url: '/',
                    templateUrl: 'views/home.html',
                    controller: 'HomeCtrl',
                    controllerAs: 'vm'
                })
                .state('order', {
                    url: '/order',
                    templateUrl: 'views/startOrder.html',
                    controller: 'OrderCtrl',
                    controllerAs: 'vm'
                })
                .state('orderlist', {
                    url: '/order/list',
                    templateUrl: 'views/orderList.html',
                    controller: 'OrderCtrl',
                    controllerAs: 'vm'
                })
                .state('profile', {
                    url: '/profile',
                    templateUrl: 'views/profile.html',
                    controller: 'ProfileCtrl',
                    controllerAs: 'vm'
                })
                .state('profile.view', {
                    url: '/view',
                    templateUrl: 'views/profile.view.html',
                    parent: 'profile'
                })
                .state('profile.edit', {
                    url: '/edit',
                    templateUrl: 'views/profile.edit.html',
                    parent: 'profile'
                });

            $translateProvider.useUrlLoader('localization/en.json');
            $translateProvider.preferredLanguage('en');
        }]);
})();