'use strict';

(function () {
    angular
        .module('dailyMummApp')
        .directive('bwHistory', History);

    function History() {
        var directive = {
            templateUrl: 'components/history/history.html',
            controller: 'HistoryDirectiveCtrl',
            controllerAs: 'hvm',
            restric: 'EA'
        };

        return directive;
    }
})();