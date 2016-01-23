'use strict';

(function(){
    angular
        .module('dailyMummApp')
        .directive('bwValidatePassword', ValidatePassword);

    function ValidatePassword() {
        var directive = {
            require: 'ngModel',
            link: function (scope, elm, attrs, ctrl) {
                ctrl.$parsers.unshift(function (viewValue, $scope) {
                    var noMatch = viewValue != scope.formRegister.password.$viewValue;
                    ctrl.$setValidity('noMatch', !noMatch);
                    return noMatch ? true: false;
                })
            }
        };
        
        return directive;
    }
})();