'use strict';

angular.module('confRegistrationWebApp')
  .factory('enforceAuth', function ($route, $dialog, $cookies, $q) {
    var defer = $q.defer();

    if (angular.isDefined($cookies.crsToken)) {
      defer.resolve('Authorization present.');
    } else {
      var loginDialogOptions = {
        templateUrl: 'views/loginDialog.html',
        controller: 'LoginDialogCtrl'
      };
      $dialog.dialog(loginDialogOptions).open();
    }

    return defer.promise;
  });