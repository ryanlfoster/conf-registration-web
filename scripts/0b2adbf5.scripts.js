"use strict";angular.module("confRegistrationWebApp",["ngMockE2E","ngResource"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/register/:conferenceId",{controller:"RegisterCtrl",template:"",resolve:{conference:["$route","Conferences",function(a,b){return a.getById(b.current.params.conferenceId)}]}}).when("/register/:conferenceId/page/:pageId",{templateUrl:"views/page.html",controller:"PageCtrl",resolve:{conference:["$route","Conferences","$q",function(a,b,c){var d=c.defer();return b.get({id:a.current.params.conferenceId},function(a){d.resolve(a)}),d.promise}]}}).otherwise({redirectTo:"/"})}]),console.log("**********************USING MOCK BACKEND**********************"),angular.module("confRegistrationWebApp").run(["$httpBackend",function(a){a.whenGET(/views\/.*/).passThrough();var b=[{id:"012",name:"A Sweet Fall Retreat",pages:[{id:"1",title:"About You",blocks:[{id:"block-1",title:"Important Information",type:"paragraphContent",content:"We are glad you are coming to Fall Retreat!"},{id:"block-2",title:"What's your name?",required:!0,type:"textQuestion"},{id:"block-3",title:"What school do you currently attend?",type:"textQuestion"},{id:"block-4",title:"Man or Lady?",type:"radioQuestion",required:!0,choices:["Man","Lady"]}]},{id:"2",title:"Rides",blocks:[{id:"block-1",title:"Ride Situation",type:"paragraphContent",content:"If you are driving, please give someone a ride."},{id:"block-5",title:"Do you have a car?",type:"radioQuestion",required:!0,choices:["Yes","No"]},{id:"block-6",title:"Do you need a ride?",type:"radioQuestion",required:!0,choices:["Yes","No"]}]},{id:"3",title:"Food",blocks:[{id:"block-7",title:"What do you want to eat for breakfast?",type:"radioQuestion",required:!0,choices:["Pancakes","Waffles","Omelettes"]},{id:"block-8",title:"What do you want to eat for lunch?",type:"radioQuestion",required:!0,choices:["Sandwich","Soup","Burger"]},{id:"block-9",title:"What do you want to eat for dinner?",type:"radioQuestion",required:!0,choices:["Steak","Shrimp","Lobster"]}]}]},{id:"123",name:"Fall Retreat WOOO"},{id:"234",name:"Fall Retreat!"},{id:"345",name:"Yet Another Fall Retreat (YAFR)"},{id:"456",name:"Fall Retreat Is Never Gonna Give You Up"}];a.whenGET("conferences").respond(b),angular.forEach(b,function(b){a.whenGET("conferences/"+b.id).respond(b)})}]),angular.module("confRegistrationWebApp").controller("MainCtrl",["$scope","Conferences",function(a,b){a.conferences=b.query()}]);