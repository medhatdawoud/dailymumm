'use strict';

(function () {
    angular
        .module('dailyMummApp')
        .directive('bwValidatePasswordMatch', ValidatePassword);

    function ValidatePassword() {
        var directive = {
            require: 'ngModel',
            link: function (scope, elm, attrs, ctrl) {
                ctrl.$parsers.unshift(function (viewValue, $scope) {
                    var matchWith = attrs.matchWith;
                    var noMatch = viewValue != matchWith;
                    ctrl.$setValidity('noMatch', !noMatch);
                    return noMatch ? true : false;
                })
            }
        };

        return directive;
    }
})();