'use strict';


describe('Component: lists', function () {
    var listsCtrl, $controller, $scope, mockAuthService, mockListsService, $rootScope, $timeout;

    beforeEach(module("dailyMummApp"));

    beforeEach(inject(function (_$controller_, _$rootScope_, _$timeout_) {
        $controller = _$controller_;
        $scope = _$rootScope_.$new();
        $rootScope = _$rootScope_;
        $timeout = _$timeout_;
        mockAuthService = jasmine.createSpyObj('mockAuthService', ['getCurrentUserInfo']);
        mockListsService = jasmine.createSpyObj('mockListsService', ['createList', 'updateList', 'getLists']);
    }));

    it('Should set the user data to userData variable', function () {
        var mockUserData = {};

        mockAuthService.getCurrentUserInfo.and.returnValue(mockUserData);

        listsCtrl = $controller('ListsDirectiveCtrl', {
            '$scope': $scope,
            'AuthService': mockAuthService,
            'ListsService': mockListsService,
            '$rootScope': $rootScope,
            '$timeout': $timeout
        });

        expect(listsCtrl.userData).toBe(mockUserData);
    });

    it('should be defined', function () {
        expect(listsCtrl).toBeDefined();
    });

});
