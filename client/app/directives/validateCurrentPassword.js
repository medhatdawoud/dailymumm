'use strict';

(function () {
    angular
        .module('dailyMummApp')
        .directive('bwValidateCurrentPassword', ValidateCurrentPassword);

    ValidateCurrentPassword.$inject = ['$http', 'AuthService'];

    function ValidateCurrentPassword($http, AuthService) {
        var directive = {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attrs, ctrl) {
                var userId = AuthService.getCurrentUserInfo().id;
                //set the initial value as soon as the input comes into focus
                element.on('focus', function () {
                    if (!scope.initialValue) {
                        scope.initialValue = ctrl.$viewValue;
                    }
                });
                element.on('blur', function () {
                    var field = attrs.bwValidateCurrentPassword;
                    if (ctrl.$viewValue != scope.initialValue) {
                        $http.get('/api/verifycurrentpassword?id=' + userId + '&password=' + ctrl.$viewValue)
                            .success(function (data) {
                                ctrl.$setValidity('isValid', !!data);
                            }).error(function (data, status) {
                                //handle server error
                            });
                    }
                });
            }
        };

        return directive;
    }
})();