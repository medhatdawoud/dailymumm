'use strict';

describe('UserService service', function () {

    var mockRegisterData = {
        username: 'medhatdawoud',
        email: "medhatdawoud@gmail.com",
        password: 123456
    };

    var httpApiServer = 'http://localhost';

    beforeEach(function () {
        module('dailyMummApp');
    });
    
    it('Should issue a POST request to /api/user when createnewUser is called and username is medhat',
        inject(function (UserService, $httpBackend) {
            $httpBackend.expectPOST(httpApiServer + '/api/user');
            $httpBackend.when('POST', httpApiServer + '/api/user').respond({});
            UserService.createNewUser(
                mockRegisterData.username,
                mockRegisterData.email,
                mockRegisterData.password,
                jasmine.any('Function'));
            // $httpBackend.flush();

            // $httpBackend.verifyNoOutstandingExpectation();
            // $httpBackend.verifyNoOutstandingRequest();
        })
    );



});
