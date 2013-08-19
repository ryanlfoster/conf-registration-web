"use strict";angular.module("confRegistrationWebApp",["ngResource","ngCookies","ui.bootstrap"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/admin-dashboard.html",controller:"MainCtrl",resolve:{enforceAuth:"enforceAuth"}}).when("/wizard/:conferenceId",{templateUrl:"views/admin-wizard.html",controller:"AdminWizardCtrl",resolve:{enforceAuth:"enforceAuth",conference:["$route","ConfCache",function(a,b){return b.get(a.current.params.conferenceId)}]}}).when("/register/:conferenceId/page/:pageId",{templateUrl:"views/registration.html",controller:"RegistrationCtrl",resolve:{enforceAuth:"enforceAuth",conference:["$route","ConfCache",function(a,b){return b.get(a.current.params.conferenceId)}],currentRegistration:["$route","RegistrationCache",function(a,b){return b.getCurrent(a.current.params.conferenceId)}]}}).when("/adminData/:conferenceId",{templateUrl:"views/adminData.html",controller:"AdminDataCtrl",resolve:{enforceAuth:"enforceAuth",registrations:["$route","RegistrationCache",function(a,b){return b.getAllForConference(a.current.params.conferenceId)}],conference:["$route","ConfCache",function(a,b){return b.get(a.current.params.conferenceId)}]}}).when("/register/:conferenceId",{resolve:{enforceAuth:"enforceAuth",redirectToRegistration:["$route","ConfCache","$location",function(a,b,c){var d=a.current.params.conferenceId;b.get(d).then(function(a){var b=a.registrationPages&&a.registrationPages[0]&&a.registrationPages[0].id;c.replace().path("/register/"+d+"/page/"+b)})}]}}).when("/reviewRegistration/:conferenceId",{templateUrl:"views/reviewRegistration.html",controller:"ReviewRegistrationCtrl",resolve:{enforceAuth:"enforceAuth",answers:["$route","RegistrationCache",function(a,b){return b.getCurrent(a.current.params.conferenceId).then(function(a){return a.answers})}],conference:["$route","ConfCache",function(a,b){return b.get(a.current.params.conferenceId)}]}}).when("/auth/:token",{resolve:{enforceAuth:"enforceAuth",redirectToIntendedRoute:["$location","$cookies","$route",function(a,b,c){b.crsToken=c.current.params.token,a.replace().path(b.intendedRoute)}]}}).otherwise({redirectTo:"/"})}]).run(["$rootScope","$cookies","$location",function(a,b,c){a.$on("$locationChangeStart",function(){b.intendedRoute=c.url()})}]).config(["$httpProvider",function(a){a.interceptors.push("currentRegistrationInterceptor"),a.interceptors.push("httpUrlInterceptor"),a.interceptors.push("authorizationInterceptor")}]).run(["$rootScope","$location",function(a,b){a.location=b,a.$watch("location.url()",function(b){a.adminDashboard=angular.equals(b,"/"),a.subHeadStyle={height:a.adminDashboard?"100px":"5px"}})}]),angular.module("confRegistrationWebApp").controller("MainCtrl",["$scope","ConfCache","$dialog",function(a,b,c){a.$on("conferences/",function(b,c){a.conferences=c}),b.query();var d={templateUrl:"views/createConference.html",controller:"CreateConferenceDialogCtrl"};a.createConference=function(){c.dialog(d).open()}}]);