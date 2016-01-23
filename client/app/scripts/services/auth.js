'use strict';

(function(){
    angular
        .module('dailyMummApp')
        .service('AuthService', AuthService);

    AuthService.$inject = ['$http','UserService','$cookieStore','$rootScope','RequestFactory'];

    function AuthService($http, UserService, $cookieStore, $rootScope, RequestFactory) {
        var service = {};
        
        service.login = login;
        service.getCurrentUserInfo = getCurrentUserInfo;
        service.isLoggedIn = isLoggedIn;
        service.setCredintials = setCredintials;
        service.clearCredintials = clearCredintials;
        
        function login( email, password, callback) {
            UserService.checkForUserByEmailAndPassword(email, password)
                .then(function(response) {
                    var result;
                    if (response.data)
                        result = { success: true, data: response.data };
                    else
                        result = { success: false, code: 'ERROR_INVALID_USER_OR_PASSWORD' };
                    callback(result);
                }, function(response) {

                    if (response.status == 404) {
                        callback({ success: false, code: 'ERROR_INVALID_USER_OR_PASSWORD' });
                    } else if (response.status == 500) {
                        callback({ success: false, code: 'ERROR_SOMETHING_WRONG' });
                    } else {
                        callback({ success: false, code: 'ERROR_CANNOT_CONNECT' });
                    }
                });
        }
        
        function isLoggedIn() {
            return !!$cookieStore.get('globals');
        };

        function getCurrentUserInfo() {
            if (this.isLoggedIn()) {
                var cookies = $cookieStore.get('globals').currentUser;
                return cookies;
            }
        };

        function setCredintials(loginInfo) {
            $rootScope.globals = {
                currentUser: {
                    loginData: loginInfo,
                    token: loginInfo.token
                }
            };

            $cookieStore.put('globals', $rootScope.globals);
            RequestFactory.setToken(loginInfo.token);
        };

        function clearCredintials() {
            $http.defaults.headers.common['x-access-token'] = RequestFactory.getToken();
            $rootScope.globals = {};
            $cookieStore.remove('globals');
            RequestFactory.setToken(null);
        };
        
        return service;
    }
})();