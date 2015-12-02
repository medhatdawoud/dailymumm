'use strict';

(function(){
    angular.module('dailyMummApp').config(["$stateProvider", "$urlRouterProvider", "$translateProvider",
        function ($stateProvider, $urlRouterProvider, $translateProvider) {
            //delete $httpProvider.defaults.headers.common['X-Requested-With'];
            $urlRouterProvider.otherwise('/');
            $stateProvider
              .state('index', {
                url: '/',
                templateUrl: 'views/home.html',
                controller:'HomeCtrl',
                controllerAs: 'vm'
              });

            $translateProvider.useUrlLoader('local/en.json');
            $translateProvider.preferredLanguage('en');
        }]);
})();