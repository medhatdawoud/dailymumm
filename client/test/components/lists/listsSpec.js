'use strict';


describe('Controller: lists', function () {
    var listsCtrl,
        $controller,
        $scope,
        mockAuthService,
        mockListsService,
        mockUserData = { username: 'medhatdawoud' },
        $rootScope,
        $timeout;

    beforeEach(module("dailyMummApp"));

    beforeEach(inject(function (_$controller_, _$rootScope_, _$timeout_) {
        $controller = _$controller_;
        $scope = _$rootScope_.$new();
        $rootScope = _$rootScope_;
        $timeout = _$timeout_;
        mockAuthService = jasmine.createSpyObj('mockAuthService', ['getCurrentUserInfo']);
        mockListsService = jasmine.createSpyObj('mockListsService', ['createList', 'updateList', 'getLists']);
    }));

    beforeEach(function () {
        mockAuthService.getCurrentUserInfo.and.returnValue(mockUserData);

        listsCtrl = $controller('ListsDirectiveCtrl', {
            '$scope': $scope,
            'AuthService': mockAuthService,
            'ListsService': mockListsService,
            '$rootScope': $rootScope,
            '$timeout': $timeout
        });
    });

    describe('userData Object', function () {
        it('Should set the user data to userData variable', function () {
            expect(listsCtrl.userData).toBe(mockUserData);
        });

        it('Should has the username in the return value', function () {
            expect(listsCtrl.userData.username).toBe('medhatdawoud');
        });
    });

    describe('tempListData Object', function () {
        it('Should have no invitations in temp object in the first time', function () {
            expect(listsCtrl.tempListData.invitations.length).toEqual(0);
        });

        it('Should have at least one invitation after calling addToInvitations()', function () {
            listsCtrl.addToInvitations('medhat@gmail.com');

            expect(listsCtrl.tempListData.invitations.length).toEqual(1);
        });

        it('Should fire duplicated email when inserting the same email on calling addToInvitations()', function () {
            listsCtrl.addToInvitations('medhat@gmail.com');
            listsCtrl.addToInvitations('medhat@gmail.com');

            expect(listsCtrl.duplicatedEmail).toBeTruthy();
        });

        it('Should has 2 invitations after splicing 1st one', function () {
            listsCtrl.addToInvitations('medhat@gmail.com');
            listsCtrl.addToInvitations('medhat1@gmail.com');
            listsCtrl.addToInvitations('medhat2@gmail.com');

            listsCtrl.removeFromInvitations(1);

            expect(listsCtrl.tempListData.invitations.length).toEqual(2);
        });
    });

    describe('listOfGroups Array', function () {
        it('Should has no lists in the first time', function () {
            expect(listsCtrl.listOfGroups.length).toBe(0);
        });

        it('Should has lists after calling getLists()', function () {
            spyOn(listsCtrl, 'getLists').and.callFake(function () {
                listsCtrl.listOfGroups.push({ id: 123456789 });
            });

            listsCtrl.getLists();

            expect(listsCtrl.listOfGroups.length).not.toBe(0);
        });
    });

});
