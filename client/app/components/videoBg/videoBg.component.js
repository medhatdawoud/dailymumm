'use strict';

(function () {
    angular
        .module('dailyMummApp')
        .component('bwVideoBg', {
            templateUrl: "components/videoBg/videoBg.html",
            controller: VideoBgCtrl
        });

    function VideoBgCtrl() {
    }
})();