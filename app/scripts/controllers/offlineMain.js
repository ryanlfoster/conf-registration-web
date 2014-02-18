'use strict';

angular.module('confRegistrationWebApp')
  .controller('OfflineMainCtrl', function ($scope, conferences) {
    $scope.conferences = conferences;

    $scope.isOffline = function(conferenceId) {
      return true;
    }
  });