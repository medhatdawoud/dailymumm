'use strict';

(function () {
    var app = angular.module('dailyMummApp',
                                ['ngCookies',
                                'ngResource',
                                'ngSanitize',
                                'ui.router',
                                'pascalprecht.translate']);
                                
    app.value("apiServer", "https://http://dailymumm.herokuapp.com");
})();