'use strict';

(function () {
    angular
        .module('dailyMummApp')
        .directive('bwLists', Lists);

    function Lists() {
        var directive = {
            templateUrl: 'components/lists/lists.html',
            controller: 'ListsDirectiveCtrl',
            controllerAs: 'lvm',
            restric: 'EA'
        };

        return directive;
    }
})();