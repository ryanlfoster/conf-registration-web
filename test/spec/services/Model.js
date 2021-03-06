'use strict';
/* jshint camelcase: false */
/* global describe: false, expect: false, it: false, inject: false, beforeEach: false */

describe('Service: Model', function () {

  // load the service's module
  beforeEach(module('confRegistrationWebApp'));

  // instantiate service
  var Model, $rootScope, $httpBackend;
  beforeEach(inject(function (_Model_, _$rootScope_, _$httpBackend_) {
    $rootScope = _$rootScope_;
    $httpBackend = _$httpBackend_;
    Model = _Model_;
  }));

  it('repeated calls to `get` should use cache', function () {
    $httpBackend.expectGET(/conferences\/$/).respond(201, [ { name: 'Tester', id: '456' } ]);
    Model.get('conferences/');
    $httpBackend.flush();


    Model.get('conferences/');
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('`create` should update parent collection', function () {
    $httpBackend.expectGET(/conferences\/$/).respond(201, [ { name: 'Tester', id: '456' } ]);
    Model.get('conferences/');
    $httpBackend.flush();

    $httpBackend.expectPOST(/conferences\/$/).respond(201, {
      name: 'Test',
      id: '123'
    });
    Model.create('conferences/', { name: 'Test' });
    $httpBackend.flush();

    var conferences;
    Model.get('conferences/').then(function (a) {
      conferences = a;
    });
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();

    $rootScope.$digest();

    expect(conferences.length).toBe(2);
  });

/*  it('`delete` should update parent collection', function () {
    $httpBackend.expectGET(/conferences\/$/).respond(201, [ { name: 'Tester', id: '456' } ]);
    Model.get('conferences/');
    $httpBackend.flush();

    $httpBackend.expectDELETE(/conferences\/456$/).respond(204);
    Model.delete('conferences/456');
    $httpBackend.flush();
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();

    var conferences;
    Model.get('conferences/').then(function (a) {
      conferences = a;
    });

    $rootScope.$digest();

    expect(conferences.length).toBe(0);
  });*/


});
