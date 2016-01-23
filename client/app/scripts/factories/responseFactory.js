'use strict';

(function(){
    angular
        .module('dailyMummApp')
        .factory('ResponseFactory', ResponseFactory);

    ResponseFactory.$inject = ['$injector','$q'];

    function ResponseFactory($injector, $q) {
        
        var factory = {};
        factory.response = response;
        factory.responseError = responseError;

        function response(response) {
            return response;
        }
        
        function responseError(response) {
            if (response.status == 401 && !response.config.ignore401) {
                var AuthService = $injector.get('AuthService'),
                    $state = $injector.get('$state');
                AuthService.clearCredintials();
                $state.go('home');
            }
            // do something on error
            return $q.reject(response);
        }
        
        return factory;
    };
})();

angular.module('dailyMummApp')
    .config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('ResponseFactory');
    }]);