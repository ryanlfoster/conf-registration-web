'use strict';

angular.module('confRegistrationWebApp')
  .service('AnswerCache', function AnswerCache($cacheFactory, $rootScope, $http, $q) {
    var cache = $cacheFactory('answers');
    var blockIndex = $cacheFactory('blockIndex');

    var path = function (id) {
      return 'answers/' + (id || '');
    };

    var update = function (path, object, callback) {
      updateServer(object, callback);
      blockIndex.put(object.block, object);
    };

    var updateServer = function (answer, callback) {
      $http.put(path(answer.id), answer).then(callback);
    };

    var checkCache = function (path, callback) {
      var cachedObject = cache.get(path);
      if (angular.isDefined(cachedObject)) {
        callback(cachedObject, path);
      } else {
        $http.get(path).success(function (conferences) {
          cache.put(path, conferences);
          callback(conferences, path);
        });
      }
    };

    this.update = function(answer, callback) {
      update(path(answer.id), answer, callback);
    };

    this.query = function (id) {
      checkCache(path(id), function (conferences, path) {
        $rootScope.$broadcast(path, conferences);
      });
    };

    this.get = function (id) {
      var defer = $q.defer();
      checkCache(path(id), function (conferences) {
        defer.resolve(conferences);
      });
      return defer.promise;
    };

    this.put = function (answer) {
      cache.put(path(answer.id), answer);
    };

    this.syncBlock = function (scope, name, registration, cb) {
      scope.$watch(name, function (answer) {
        if (angular.isDefined(answer)) {
          if(angular.isDefined(registration) &&
              JSON.parse(localStorage.getItem('offlineMode-' + registration.conferenceId)) === true) {
            localStorage.setItem('answer-' + answer.id, JSON.stringify(answer));
          } else {
            var callback = cb || function () {
              cache.put(path, angular.copy(answer));
              $rootScope.$broadcast(path, answer);
            };
            update(path(answer.id), answer, callback);
          }
        }
      }, true);
    };
  });
