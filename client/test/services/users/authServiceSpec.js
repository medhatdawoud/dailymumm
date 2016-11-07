'use strict';

describe('AuthService service', function () {

    var mockUserService,
        mockLoginData = {
            email: "medhatdawoud@gmail.com",
            password: 123456
        };

    beforeEach(function () {
        mockUserService = jasmine.createSpyObj('mockUserService', ['checkForUserByEmailAndPassword']);

        module('dailyMummApp', function ($provide) {
            $provide.value('UserService', mockUserService);
        });

        inject(function ($q) {
            mockUserService.checkForUserByEmailAndPassword.and.callFake(function () {
                var deferred = $q.defer();
                return deferred.promise;
            });
        });
    });

    describe('login', function () {
        it('Should call UserService.checkForUserByEmailAndPassword with the same parameters', inject(function (AuthService) {
            AuthService.login(mockLoginData.email, mockLoginData.password);

            expect(mockUserService.checkForUserByEmailAndPassword).toHaveBeenCalledWith(mockLoginData.email, mockLoginData.password);
        }));
    });



});
