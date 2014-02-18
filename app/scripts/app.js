'use strict';
angular.module('confRegistrationWebApp', ['ngRoute', 'ngResource', 'ngCookies', 'ui.bootstrap'])
  .config(function ($routeProvider, $injector) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/admin-dashboard.html',
        controller: 'MainCtrl',
        resolve: {
          enforceAuth: $injector.get('enforceAuth'),
          requireOnline: $injector.get('requireOnline')
        }
      })
      .when('/offline', {
        templateUrl: 'views/admin-dashboard.html',
        controller: 'OfflineMainCtrl',
        resolve: {
          conferences : [function () {
            var confKeys = [];
            var conferences = [];

            for (var i = 0; i < localStorage.length; i++) {
              if (localStorage.key(i).substring(0, 4) === 'conf') {
                confKeys.push(localStorage.key(i));
              }
            }
            _.each(confKeys, function (key) {
              conferences.push(JSON.parse(localStorage.getItem(key)));
            });
            return conferences;
          }]
        }
      })
      .when('/wizard/:conferenceId', {
        templateUrl: 'views/admin-wizard.html',
        controller: 'AdminWizardCtrl',
        resolve: {
          enforceAuth: $injector.get('enforceAuth'),
          requireOnline: $injector.get('requireOnline'),
          conference: ['$route', 'ConfCache', function ($route, ConfCache) {
            return ConfCache.get($route.current.params.conferenceId);
          }]
        }
      })
      .when('/register/:conferenceId/page/:pageId?', {
        templateUrl: 'views/registration.html',
        controller: 'RegistrationCtrl',
        resolve: {
          enforceAuth: $injector.get('enforceAuth'),
          requireOnline: $injector.get('requireOnline'),
          conference: ['$route', 'ConfCache', function ($route, ConfCache) {
            return ConfCache.get($route.current.params.conferenceId);
          }],
          currentRegistration: ['$route', 'RegistrationCache', function ($route, RegistrationCache) {
            return RegistrationCache.getCurrent($route.current.params.conferenceId);
          }]
        }
      })
      .when('/adminData/:conferenceId', {
        templateUrl: 'views/adminData.html',
        controller: 'AdminDataCtrl',
        resolve: {
          enforceAuth: $injector.get('enforceAuth'),
          registrations: ['$route', 'RegistrationCache', function ($route, RegistrationCache) {
            return RegistrationCache.getAllForConference($route.current.params.conferenceId);
          }],
          conference: ['$route', 'ConfCache', function ($route, ConfCache) {
            return ConfCache.get($route.current.params.conferenceId);
          }],
          permissions: ['$route', 'PermissionCache', function ($route, PermissionCache) {
            return PermissionCache.getForConference($route.current.params.conferenceId);
          }]
        }
      })
      .when('/adminDetails/:conferenceId', {
        templateUrl: 'views/adminDetails.html',
        controller: 'AdminDetailsCtrl',
        resolve: {
          enforceAuth: $injector.get('enforceAuth'),
          requireOnline: $injector.get('requireOnline'),
          registrations: ['$route', 'RegistrationCache', function ($route, RegistrationCache) {
            return RegistrationCache.getAllForConference($route.current.params.conferenceId);
          }],
          conference: ['$route', 'ConfCache', function ($route, ConfCache) {
            return ConfCache.get($route.current.params.conferenceId);
          }],
          permissions: ['$route', 'PermissionCache', function ($route, PermissionCache) {
            return PermissionCache.getForConference($route.current.params.conferenceId);
          }]
        }
      })
      .when('/register/:conferenceId', {
        resolve: {
          enforceAuth: $injector.get('enforceAuth'),
          requireOnline: $injector.get('requireOnline'),
          redirectToRegistration: ['$route', 'ConfCache', '$location', function ($route, ConfCache, $location) {
            var conferenceId = $route.current.params.conferenceId;
            ConfCache.get(conferenceId).then(function () {
              $location.replace().path('/register/' + conferenceId + '/page/');
            });
          }]
        }
      })
      .when('/reviewRegistration/:conferenceId', {
        templateUrl: 'views/reviewRegistration.html',
        controller: 'ReviewRegistrationCtrl',
        resolve: {
          enforceAuth: $injector.get('enforceAuth'),
          requireOnline: $injector.get('requireOnline'),
          registration: ['$route', 'RegistrationCache', function ($route, RegistrationCache) {
            return RegistrationCache.getCurrent($route.current.params.conferenceId)
              .then(function (currentRegistration) {
                return currentRegistration;
              });
          }],
          conference: ['$route', 'ConfCache', function ($route, ConfCache) {
            return ConfCache.get($route.current.params.conferenceId);
          }]
        }
      })
      .when('/payment/:conferenceId', {
        templateUrl: 'views/payment.html',
        controller: 'paymentCtrl',
        resolve: {
          enforceAuth: $injector.get('enforceAuth'),
          requireOnline: $injector.get('requireOnline'),
          registration: ['$route', 'RegistrationCache', function ($route, RegistrationCache) {
            return RegistrationCache.getCurrent($route.current.params.conferenceId)
              .then(function (currentRegistration) {
                return currentRegistration;
              });
          }],
          conference: ['$route', 'ConfCache', function ($route, ConfCache) {
            return ConfCache.get($route.current.params.conferenceId);
          }]
        }
      })
      .when('/permissions/:conferenceId', {
        templateUrl: 'views/admin-permissions.html',
        controller: 'AdminPermissionsCtrl',
        resolve: {
          enforceAuth: $injector.get('enforceAuth'),
          requireOnline: $injector.get('requireOnline'),
          conference: ['$route', 'ConfCache', function ($route, ConfCache) {
            return ConfCache.get($route.current.params.conferenceId);
          }]
        }
      })
      .when('/activatePermission/:permissionAuthCode', {
        template: '{{message}}',
        controller: 'ActiviatePermissionCtrl',
        resolve: {
          enforceAuth: $injector.get('enforceAuth'),
          requireOnline: $injector.get('requireOnline')
        }
      })
      .when('/auth/:token', {
        resolve: {
          requireOnline: $injector.get('requireOnline'),
          redirectToIntendedRoute: ['$location', '$cookies', '$route', '$rootScope', 'ProfileCache',
            function ($location, $cookies, $route, $rootScope, ProfileCache) {
              $cookies.crsAuthProviderType = '';
              if ($cookies.crsToken && ($cookies.crsToken !== $route.current.params.token)) {
                $cookies.crsPreviousToken = $cookies.crsToken;
              }
              $cookies.crsToken = $route.current.params.token;
              $rootScope.crsToken = $cookies.crsToken;
              ProfileCache.getCache(function (data) {
                $cookies.crsAuthProviderType = data.authProviderType;
                $location.replace().path($cookies.intendedRoute || '/');
              });
            }
          ]
        }
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .run(function ($rootScope, $cookies, $location) {
    $rootScope.$on('$locationChangeStart', function () {
      if (!/^\/auth\/.*/.test($location.url())) {
        $cookies.intendedRoute = $location.url();
      }
    });
  })
  .config(function ($httpProvider) {
    $httpProvider.interceptors.push('currentRegistrationInterceptor');
    $httpProvider.interceptors.push('httpUrlInterceptor');
    $httpProvider.interceptors.push('authorizationInterceptor');
    $httpProvider.interceptors.push('unauthorizedInterceptor');
    $httpProvider.interceptors.push('debouncePutsInterceptor');
    $httpProvider.interceptors.push('statusInterceptor');
  })
  .run(function ($rootScope, $location) {
    $rootScope.location = $location;
    $rootScope.$watch('location.url()', function (newVal) {
      $rootScope.adminDashboard = angular.equals(newVal, '/');

      $rootScope.subHeadStyle = {
        height: $rootScope.adminDashboard ? '100px' : '5px'
      };
    });
  })
  .config(function ($provide) {
    $provide.decorator('$exceptionHandler', ['$delegate', function ($delegate) {
      return function (exception, cause) {
        $delegate(exception, cause);
//        bugsense.notify(exception, cause);
      };
    }]);
  })
  .run(function ($window, $rootScope) {
    $rootScope.online = navigator.onLine;
    $window.addEventListener('offline', function () {
      $rootScope.$apply(function () {
        $rootScope.online = false;
      });
    }, false);
    $window.addEventListener('online', function () {
      $rootScope.$apply(function () {
        $rootScope.online = true;
      });
    }, false);
  });
