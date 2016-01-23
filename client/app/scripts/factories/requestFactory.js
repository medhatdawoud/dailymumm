'use strict';

(function(){
    angular
        .module('dailyMummApp')
        .factory('RequestFactory', RequestFactory);

    RequestFactory.$inject = ['$cookies','$cookieStore'];

    function RequestFactory($cookies, $cookieStore) {
        var token = null;
        
        var factory = {};
        factory.getToken = getToken;
        factory.setToken = setToken;
        factory.request = request;

        function setToken(accessToken) {
            token = accessToken;
        };

        function getToken() {
            if (token && token.length > 0) {
                return token;
            }
            if ($cookieStore.get('globals') && $cookieStore.get('globals').currentUser) {
                var cokkieToken = $cookieStore.get('globals').currentUser.token;
                if (cokkieToken && cokkieToken.length > 0) {
                    token = cokkieToken;
                }
            }
            return token;
        };

        function request(config) {
            var accessToken = getToken();
            if (accessToken) {
                config.headers['x-access-token'] = accessToken;
            }
            if (config.url == '/api/logout')
                config.ignore401 = true;
            return config;
        };

        return factory;
    };
})();

angular.module('dailyMummApp')
    .config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('RequestFactory');
    }]);