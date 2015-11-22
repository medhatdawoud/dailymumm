'use strict';

(function(){
    angular.module('dailyMummApp').config(function ($stateProvider, $urlRouterProvider) {
        //delete $httpProvider.defaults.headers.common['X-Requested-With'];
        $urlRouterProvider.otherwise('/');
        $stateProvider
          .state('index', {
            url: '/',
            templateUrl: 'views/home.html',
            controller:'HomeCtrl',
            controllerAs: 'vm'
          })
    });
})();