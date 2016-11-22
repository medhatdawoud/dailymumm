'use strict';

(function () {
    angular
        .module('dailyMummApp')
        .directive('bwValidateUnique', ValidateUnique);

    ValidateUnique.$inject = ['$http'];

    function ValidateUnique($http) {
        var directive = {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attrs, ctrl) {
                //set the initial value as soon as the input comes into focus
                element.on('focus', function () {
                    if (!scope.initialValue) {
                        scope.initialValue = ctrl.$viewValue;
                    }
                });
                element.on('blur', function () {
                    var field = attrs.bwValidateUnique;
                    if (ctrl.$viewValue != scope.initialValue) {
                        $http.get('/api/user/verifyuserunique?' + field + '=' + ctrl.$viewValue)
                            .success(function (data) {
                                ctrl.$setValidity('isunique', !data);
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