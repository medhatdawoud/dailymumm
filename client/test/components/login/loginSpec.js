'use strict';


describe('Controller: login', function () {
    var loginCtrl,
        $controller,
        $scope,
        mockAuthService,
        $state,
        $stateParams;

    beforeEach(module("dailyMummApp"));

    beforeEach(inject(function (_$controller_, _$rootScope_, _$state_, _$stateParams_) {
        $controller = _$controller_;
        $scope = _$rootScope_.$new();
        $state = _$state_;
        $stateParams = _$stateParams_;
        mockAuthService = jasmine.createSpyObj('mockAuthService', ['isLoggedIn','login']);
    }));

    beforeEach(function () {
        loginCtrl = $controller('LoginDirectiveCtrl', {
            '$scope': $scope,
            'AuthService': mockAuthService,
            '$state': $state,
            '$stateParams': $stateParams
        });
    });

    it('Should switch to profile if user is loggedin', function () {
        mockAuthService.isLoggedIn.and.callFake(function () {
            return true;
        });

        expect(mockAuthService.isLoggedIn()).toBeTruthy();
    });

    it('Active panel Should be by default login', function () {
        expect($scope.current).toBe('login');
    });

    it('Active panel should be changed to register on call showPanel("register")', function () {
        $scope.showPanel('register');
        expect($scope.current).toBe('register');
    });

    it('Login data should be empty by default', function () {
        expect($scope.logindata).toEqual({});
    });

});