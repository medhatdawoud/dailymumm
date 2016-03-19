'use strict';

(function () {
    angular
        .module('dailyMummApp')
        .service('CountDownService', CountDownService);

    CountDownService.$inject = [];

    function CountDownService() {
        var service = {};

        service.initializeClock = initializeClock;
        
        function getTimeRemaining(endtime) {
            var t = Date.parse(endtime) - Date.parse(new Date());
            var seconds = Math.floor((t / 1000) % 60);
            var minutes = Math.floor((t / 1000 / 60) % 60);
            var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
            var days = Math.floor(t / (1000 * 60 * 60 * 24));
            return {
                'total': t,
                'days': days,
                'hours': hours,
                'minutes': minutes,
                'seconds': seconds
            };
        }

        function initializeClock(id, endtime) {
            var clock = document.getElementById(id);
            var timeinterval = setInterval(function () {
                var t = getTimeRemaining(endtime);
                clock.innerHTML =  '00:' + t.minutes + ':' + t.seconds;
                if (t.total <= 0) {
                    clearInterval(timeinterval);
                }
            }, 1000);
        }

        return service;
    }
})();