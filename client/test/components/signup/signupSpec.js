'use strict';


describe('Controller: signup', function () {
    var signupCtrl,
        $controller,
        $scope,
        mockAuthService,
        mockUserService,
        mockRegisterData = {
            username: 'MedhatDawoud',
            email: 'medhat@gmail.com',
            password: 123456
        };

    beforeEach(module("dailyMummApp"));

    beforeEach(inject(function (_$controller_, _$rootScope_) {
        $controller = _$controller_;
        $scope = _$rootScope_.$new();
        mockAuthService = jasmine.createSpyObj('mockAuthService', ['isLoggedIn']);
        mockUserService = jasmine.createSpyObj('mockUserService', ['createNewUser']);
    }));

    beforeEach(function () {
        signupCtrl = $controller('SignupDirectiveCtrl', {
            '$scope': $scope,
            'AuthService': mockAuthService,
            'UserService': mockUserService
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

    it('registerdata should be empty by default', function () {
        expect($scope.registerdata).toEqual({});
    });

    it('registerdata should has password', function () {
        $scope.registerdata = mockRegisterData;
        expect($scope.registerdata.password).toBe(123456);
    });

    it('Should call userservice createNewUser with registerdata parameters', function () {
        $scope.registerdata = mockRegisterData;
        $scope.register(true);

        expect(mockUserService.createNewUser).toHaveBeenCalledWith(mockRegisterData.username, mockRegisterData.email, mockRegisterData.password, jasmine.any(Function));
    });

});