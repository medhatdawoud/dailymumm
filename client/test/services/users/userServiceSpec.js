'use strict';

describe('UserService service', function() {
    var UserService, $httpBackend;
    var mockRegisterData = {
        username: 'medhatdawoud',
        email: "medhatdawoud@gmail.com",
        password: 123456
    };

    beforeEach(function() {
        module('dailyMummApp');
    });

    beforeEach(inject(function(_UserService_, _$httpBackend_) {
        UserService = _UserService_;
        $httpBackend = _$httpBackend_;

        // to capture the GET requests for html files
        $httpBackend.whenGET(/./)
            .respond(200);
    }));

    it('Should issue a POST request to /api/user when createnewUser is called and username is medhat', function() {
        var expectedData = function(data) {
            return '{"username":"medhatdawoud","email":"medhatdawoud@gmail.com","password":123456}';
        }

        $httpBackend.expectPOST(/./, expectedData)
            .respond(200);

        UserService.createNewUser(mockRegisterData.username, mockRegisterData.email, mockRegisterData.password, function(data) {});

        $httpBackend.flush();

        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    }
    );



});
