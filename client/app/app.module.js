'use strict';

(function () {
    var app = angular.module('dailyMummApp',
                                ['ngCookies',
                                'ngResource',
                                'ngSanitize',
                                'ui.router',
                                'pascalprecht.translate']);
    
    app.value("apiServer", "https://dailymumm.herokuapp.com");
    // app.value("apiServer", "http://localhost");
})();