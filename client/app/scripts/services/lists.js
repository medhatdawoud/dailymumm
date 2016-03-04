'use strict';

(function(){
    angular
        .module('dailyMummApp')
        .service('ListsService', ListsService);

    ListsService.$inject = ['$http'];

    function ListsService($http) {
        var service = {};
        
        service.login = login;
    }
})();