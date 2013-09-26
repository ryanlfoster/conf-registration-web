'use strict';

angular.module('confRegistrationWebApp')
  .controller('RegistrationCtrl', function ($scope, conference, $routeParams, $location) {
    $scope.validPages = {};
    $scope.$on('pageValid', function (event, validity) {
      event.stopPropagation();
      $scope.validPages[event.targetScope.page.id] = validity;
      $scope.registrationComplete = _.filter($scope.validPages).length === conference.registrationPages.length;
    });

    $scope.conference = conference;

    function getPageById(pageId) {
      var pages = conference.registrationPages;

      for (var i = 0; i < pages.length; i++) {
        if (angular.equals(pageId, pages[i].id)) {
          return pages[i];
        }
      }
    }

    var pageId = $routeParams.pageId;
    $scope.activePageId = pageId;
    $scope.page = getPageById(pageId);

    function getPageAfterById(pageId) {
      var pages = conference.registrationPages;

      for (var i = 0; i < pages.length; i++) {
        if (angular.equals(pageId, pages[i].id)) {
          return pages[i + 1];
        }
      }
    }

    $scope.nextPage = getPageAfterById(pageId);

    $scope.validateAndGoToNext = function () {
      $location.path('/register/' + conference.id + '/page/' + $scope.nextPage.id);
    };

    $scope.goToReviewOrPayment = function () {
      if (conference.minimumDeposit > 0){
        $location.path('/payment/' + conference.id);
      }else{
        $location.path('/reviewRegistration/' + conference.id);
      }
    };
  });
