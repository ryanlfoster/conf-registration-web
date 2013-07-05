"use strict";angular.module("confRegistrationWebApp",["ngMockE2E","ngResource"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/register/:conferenceId/page/:pageId",{templateUrl:"views/registration.html",controller:"RegistrationCtrl",resolve:{conference:["$route","Conferences","$q",function(a,b,c){var d=c.defer();return b.get({id:a.current.params.conferenceId},function(a){d.resolve(a)}),d.promise}],answers:["$route","Registrations","$q",function(a,b){return b.getForConference(a.current.params.conferenceId).then(function(a){return a.answers})}]}}).when("/info/:conferenceId",{templateUrl:"views/info.html",controller:"InfoCtrl",resolve:{conference:["$route","Conferences","$q",function(a,b,c){var d=c.defer();return b.get({id:a.current.params.conferenceId},function(a){d.resolve(a)}),d.promise}]}}).otherwise({redirectTo:"/"})}]),console.log("**********************USING MOCK BACKEND**********************"),angular.module("confRegistrationWebApp").run(["$httpBackend",function(a){a.whenGET(/views\/.*/).passThrough();var b=[{id:"012",name:"A Sweet Fall Retreat",landingPage:{blocks:[{id:"landingpage-1",title:"Location",type:"paragraphContent",content:"123 Main St. Orlando, FL, 32828"},{id:"landingpage-2",title:"Registration Begins",type:"paragraphContent",content:"August 19, 2013 12:00 AM Eastern Time"},{id:"landingpage-2",title:"Registration Ends",type:"paragraphContent",content:"October 12, 2013 3:00 AM Eastern Time"},{id:"landingpage-2",title:"Fall Retreat Starts",type:"paragraphContent",content:"October 18, 2013 6:00 PM Eastern Time"},{id:"landingpage-2",title:"Fall Retreat Ends",type:"paragraphContent",content:"October 20, 2013 10:00 AM Eastern Time"},{id:"landingpage-2",title:"Contact Info",type:"paragraphContent",content:"John Smith <john.smith@example.com> 555-555-5555"}]},pages:[{id:"1",title:"About You",blocks:[{id:"block-1",title:"Important Information",type:"paragraphContent",content:"We are glad you are coming to Fall Retreat!"},{id:"block-2",title:"What's your name?",required:!0,type:"textQuestion"},{id:"block-3",title:"What school do you currently attend?",type:"textQuestion"},{id:"block-4",title:"Man or Lady?",type:"radioQuestion",required:!0,choices:["Man","Lady"]}]},{id:"2",title:"Rides",blocks:[{id:"block-1",title:"Ride Situation",type:"paragraphContent",content:"If you are driving, please give someone a ride."},{id:"block-5",title:"Do you have a car?",type:"radioQuestion",required:!0,choices:["Yes","No"]},{id:"block-6",title:"Do you need a ride?",type:"radioQuestion",required:!0,choices:["Yes","No"]}]},{id:"3",title:"Food",blocks:[{id:"block-7",title:"What do you want to eat for breakfast?",type:"radioQuestion",required:!0,choices:["Pancakes","Waffles","Omelettes"]},{id:"block-8",title:"What do you want to eat for lunch?",type:"radioQuestion",required:!0,choices:["Sandwich","Soup","Burger"]},{id:"block-9",title:"What do you want to eat for dinner?",type:"radioQuestion",required:!0,choices:["Steak","Shrimp","Lobster"]}]}]},{id:"123",name:"Fall Retreat WOOO"},{id:"234",name:"Fall Retreat!"},{id:"345",name:"Yet Another Fall Retreat (YAFR)"},{id:"456",name:"Fall Retreat Is Never Gonna Give You Up"}];a.whenGET("conferences").respond(function(){console.log("GET /conferences");var a={};return[200,b,a]}),angular.forEach(b,function(b){a.whenGET("conferences/"+b.id).respond(function(){console.log("GET /conference/"+b.id);var a={};return[200,b,a]}),a.whenGET("conferences/"+b.id+"/registrations").respond(function(){console.log("GET /conferences/"+b.id+"/registrations");var a={},c={answers:[{block:"block-2",value:"Robby"}]};return[200,c,a]})})}]),angular.module("confRegistrationWebApp").controller("MainCtrl",["$scope","Conferences",function(a,b){a.conferences=b.query()}]);