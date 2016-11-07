'use strict';


describe('Controller: login', function () {
    var loginCtrl,
        $controller,
        $scope,
        mockAuthService,
        mockLogindata = {
            email: 'medhat@gmail.com',
            password: 123456
        };

    beforeEach(module("dailyMummApp"));

    beforeEach(inject(function (_$controller_, _$rootScope_) {
        $controller = _$controller_;
        $scope = _$rootScope_.$new();
        mockAuthService = jasmine.createSpyObj('mockAuthService', ['isLoggedIn', 'login']);
    }));

    beforeEach(function () {
        loginCtrl = $controller('LoginDirectiveCtrl', {
            '$scope': $scope,
            'AuthService': mockAuthService
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

    it('Logindata should be empty by default', function () {
        expect($scope.logindata).toEqual({});
    });

    it('logindata should has password', function () {
        $scope.logindata = mockLogindata;
        expect($scope.logindata.password).toBe(123456);
    });

    it('Should call authservice login with logindata parameters', function () {
        $scope.logindata = mockLogindata;
        $scope.login(true);

        expect(mockAuthService.login).toHaveBeenCalledWith(mockLogindata.email, mockLogindata.password, jasmine.any(Function));
    });

});