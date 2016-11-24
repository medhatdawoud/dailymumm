'use strict';

(function () {
    angular.module('dailyMummApp')
    .config(["$stateProvider", "$urlRouterProvider", "$translateProvider",
        function ($stateProvider, $urlRouterProvider, $translateProvider) {
            $urlRouterProvider.otherwise('/404');
            $stateProvider
                .state('home', {
                    url: '/',
                    templateUrl: 'pages/home/home.html',
                    controller: 'HomeCtrl',
                    controllerAs: 'vm'
                })
                .state('login', {
                    url: '/login/:lid',
                    templateUrl: 'pages/login/login.html',
                    controller: 'LoginCtrl',
                    controllerAs: 'vm'
                })
                .state('startOrder', {
                    url: '/startorder',
                    templateUrl: 'pages/order/startOrder.html',
                    controller: 'StartOrderCtrl',
                    controllerAs: 'vm'
                })
                .state('order', {
                    url: '/order/:id',
                    templateUrl: 'pages/order/order.html',
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
                .state('profile.edit', {
                    url: '/edit',
                    templateUrl: 'pages/profile/profile.edit.html',
                    parent: 'profile'
                })
                .state('404', {
                    url: '/404',
                    templateUrl: '404.html',
                })
                ;

            $translateProvider.useUrlLoader('localization/en.json');
            $translateProvider.preferredLanguage('en');
            $translateProvider.useSanitizeValueStrategy('escape');
        }]);
})();