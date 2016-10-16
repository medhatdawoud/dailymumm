'use strict';

(function () {
    angular
        .module('dailyMummApp')
        .service('CountDownService', CountDownService);

    CountDownService.$inject = ['$rootScope'];

    function CountDownService($rootScope) {
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
                var minutes = t.minutes < 10 ? '0'+t.minutes : t.minutes;
                var seconds = t.seconds < 10 ? '0'+t.seconds : t.seconds;
                clock.innerHTML =  '00:' + minutes + ':' + seconds;
                if (t.total <= 0) {
                    clearInterval(timeinterval);
                    $rootScope.$broadcast('timeout');
                }
            }, 1000);
        }

        return service;
    }
})();