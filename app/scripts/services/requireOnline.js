'use strict';

angular.module('confRegistrationWebApp')
  .constant('requireOnline', function ($rootScope, $route, $location, $q) {
    var defer = $q.defer();

    var offlineControllers = ['OfflineMainCtrl', 'AdminDataCtrl'];

    if(offlineControllers.indexOf($route.current.$$route.controller) >= 0) {
      defer.resolve('Okay');
    } else {
      if($rootScope.online !== true) {
        $location.path('/offline');
        defer.resolve('Redirected');
      } else {
        defer.resolve('Okay');
      }
    }
    return defer.promise;
  });