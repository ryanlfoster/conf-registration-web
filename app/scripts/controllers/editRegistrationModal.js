'use strict';

angular.module('confRegistrationWebApp')
  .controller('editRegistrationModalCtrl', function ($scope, $modalInstance, $http, $q, conference, registrantId, registration) {
    $scope.conference = angular.copy(conference);
    $scope.registration = angular.copy(registration);
    $scope.adminEditRegistrant = _.find($scope.registration.registrants, { 'id': registrantId });
    var originalRegistrantObject = angular.copy($scope.adminEditRegistrant);
    $scope.saving = false;

    $scope.close = function () {
      $modalInstance.dismiss();
    };

    $scope.blockInRegType = function(block, regTypeId){
      return block.type !== 'paragraphContent' && !_.contains(block.registrantTypes, regTypeId);
    };

    $scope.submit = function (setRegistrationAsCompleted) {
      $scope.saving = true;

      if(setRegistrationAsCompleted){
        if (!confirm('Are you sure you want to mark this registration as completed?')) {
          $scope.saving = false;
          return;
        }
        $scope.registration.completed = true;
        saveAllAnswers();
      }else if(originalRegistrantObject.registrantTypeId !== $scope.adminEditRegistrant.registrantTypeId){ //check if registrant type has been changed
        saveAllAnswers();
      }else{
        //PUT individual answers
        var answersUpdatePromises = [];
        angular.forEach($scope.adminEditRegistrant.answers, function(a){
          if(!angular.equals(a, _.find(originalRegistrantObject.answers, { 'id': a.id }))){
            answersUpdatePromises.push($http.put('answers/' + a.id, a));
          }
        });
        $q.all(answersUpdatePromises).then(getRegistrantAndClose);
      }
    };

    var saveAllAnswers = function() {
      $http.put('registrations/' + originalRegistrantObject.registrationId, $scope.registration).success(getRegistrantAndClose);
    };

    var getRegistrantAndClose = function(){
      $http.get('registrations/' + originalRegistrantObject.registrationId).success(function (registration) {
        $modalInstance.close(registration);
      });
    };
  });
