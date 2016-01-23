'use strict';

(function(){
    angular.module('dailyMummApp').config(["$stateProvider", "$urlRouterProvider", "$translateProvider",
        function ($stateProvider, $urlRouterProvider, $translateProvider) {
            //delete $httpProvider.defaults.headers.common['X-Requested-With'];
            $urlRouterProvider.otherwise('/');
            $stateProvider
              .state('home', {
                url: '/',
                templateUrl: 'views/home.html',
                controller:'HomeCtrl',
                controllerAs: 'vm'
              })
              .state('profile', {
                url: '/profile',
                templateUrl: 'views/profile.html',
                controller: 'ProfileCtrl',
                controllerAs: 'vm'
              });

            $translateProvider.useUrlLoader('local/en.json');
            $translateProvider.preferredLanguage('en');
        }]);
})();