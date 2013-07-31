"use strict";angular.module("confRegistrationWebApp",["ngMockE2E","ngResource"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/register/:conferenceId/page/:pageId",{templateUrl:"views/registration.html",controller:"RegistrationCtrl",resolve:{conference:["$route","ConfCache",function(a,b){return b.get(a.current.params.conferenceId)}],currentRegistration:["$route","RegistrationCache",function(a,b){return b.getCurrent(a.current.params.conferenceId)}]}}).when("/info/:conferenceId",{templateUrl:"views/info.html",controller:"InfoCtrl",resolve:{conference:["$route","ConfCache",function(a,b){return b.get(a.current.params.conferenceId)}]}}).when("/adminData/:conferenceId",{templateUrl:"views/adminData.html",controller:"AdminDataCtrl",resolve:{registrations:["$route","RegistrationCache",function(a,b){return b.getAllForConference(a.current.params.conferenceId)}],conference:["$route","ConfCache",function(a,b){return b.get(a.current.params.conferenceId)}]}}).otherwise({redirectTo:"/"})}]).config(["$httpProvider",function(a){a.interceptors.push("currentRegistrationInterceptor")}]),console.log("**********************USING MOCK BACKEND**********************"),angular.module("confRegistrationWebApp").run(["$httpBackend","uuid",function(a,b){a.whenGET(/views\/.*/).passThrough();var c={"012":[{user:"user-1",answers:[{block:"block-2",value:{firstName:"Ron",lastName:"Steve"}},{block:"block-4",value:"Man"},{block:"block-5",value:"Yes"},{block:"block-6",value:"No"},{block:"block-7",value:"Waffles"},{block:"block-8",value:"Burger"},{block:"block-9",value:"Steak"}]},{user:"user-2",answers:[{block:"block-2",value:"Jerry"},{block:"block-3",value:"Perdue"},{block:"block-4",value:"Man"},{block:"block-5",value:"Yes"},{block:"block-6",value:"Yes"},{block:"block-7",value:"Pancakes"},{block:"block-8",value:"Sandwich"},{block:"block-9",value:"Shrimp"}]},{user:"user-3",answers:[{block:"block-2",value:"Tom"},{block:"block-4",value:"Man"},{block:"block-5",value:"No"},{block:"block-6",value:"Yes"},{block:"block-7",value:"Omelettes"},{block:"block-8",value:"Soup"},{block:"block-9",value:"Lobster"}]}]},d=[{id:"012",name:"A Sweet Fall Retreat",landingPage:{blocks:[{id:"landingpage-1",title:"Location",type:"paragraphContent",content:"123 Main St. Orlando, FL, 32828"},{id:"landingpage-2",title:"Registration Begins",type:"paragraphContent",content:"August 19, 2013 12:00 AM Eastern Time"},{id:"landingpage-2",title:"Registration Ends",type:"paragraphContent",content:"October 12, 2013 3:00 AM Eastern Time"},{id:"landingpage-2",title:"Fall Retreat Starts",type:"paragraphContent",content:"October 18, 2013 6:00 PM Eastern Time"},{id:"landingpage-2",title:"Fall Retreat Ends",type:"paragraphContent",content:"October 20, 2013 10:00 AM Eastern Time"},{id:"landingpage-2",title:"Contact Info",type:"paragraphContent",content:"John Smith <john.smith@example.com> 555-555-5555"}]},pages:[{id:"1",title:"About You",blocks:[{id:"block-1",title:"Important Information",type:"paragraphContent",content:"We are glad you are coming to Fall Retreat!"},{id:"block-2",title:"What's your name?",required:!0,type:"nameQuestion"},{id:"block-3",title:"What school do you currently attend?",type:"textQuestion"},{id:"block-4",title:"Man or Lady?",type:"radioQuestion",required:!0,choices:["Man","Lady"]}]},{id:"2",title:"Rides",blocks:[{id:"block-1",title:"Ride Situation",type:"paragraphContent",content:"If you are driving, please give someone a ride."},{id:"block-5",title:"Do you have a car?",type:"radioQuestion",required:!0,choices:["Yes","No"]},{id:"block-6",title:"Do you need a ride?",type:"radioQuestion",required:!0,choices:["Yes","No"]}]},{id:"3",title:"Food",blocks:[{id:"block-7",title:"What do you want to eat for breakfast?",type:"radioQuestion",required:!0,choices:["Pancakes","Waffles","Omelettes"]},{id:"block-8",title:"What do you want to eat for lunch?",type:"radioQuestion",required:!0,choices:["Sandwich","Soup","Burger"]},{id:"block-9",title:"What do you want to eat for dinner?",type:"radioQuestion",required:!0,choices:["Steak","Shrimp","Lobster"]}]}]},{id:"123",name:"Fall Retreat WOOO"},{id:"234",name:"Fall Retreat!"},{id:"345",name:"Yet Another Fall Retreat (YAFR)"},{id:"456",name:"Fall Retreat Is Never Gonna Give You Up"}];a.whenGET(/^conferences\/?$/).respond(function(){console.log(arguments);var a={};return[200,d,a]}),a.whenPOST("conferences").respond(function(a,c,d){console.log(arguments);var e=angular.extend(angular.fromJson(d),{id:b()}),f={Location:"/conferences/"+e.id};return[201,e,f]}),a.whenGET(/^conferences\/[-a-zA-Z0-9]+\/?$/).respond(function(a,b){console.log(arguments);var c=b.split("/")[1],e=_.find(d,function(a){return angular.equals(a.id,c)});return[200,e,{}]}),a.whenPUT(/^conferences\/[-a-zA-Z0-9]+\/?$/).respond(function(a,b,c){console.log(arguments);var e=b.split("/")[1],f=_.find(d,function(a){return angular.equals(a.id,e)});return angular.extend(f,angular.fromJson(c)),[200,f,{}]}),a.whenGET(/^conferences\/[-a-zA-Z0-9]+\/registrations\/?$/).respond(function(a,b){console.log(arguments);var d=b.split("/")[1];return[200,c[d],{}]}),a.whenPOST(/^conferences\/[-a-zA-Z0-9]+\/registrations\/?$/).respond(function(a,c){console.log(arguments);var e=b(),f=c.split("/")[1],g=_.find(d,function(a){return angular.equals(a.id,f)}),h=[];angular.forEach(g.pages,function(a){angular.forEach(a.blocks,function(a){h.push(a)})});var i=[];angular.forEach(h,function(a){i.push({id:b(),block:a.id,registration:e,value:{}})});var j={id:e,conference:f,answers:i},k={Location:"/registrations/"+j.id},l=angular.toJson(j);return sessionStorage.setItem(k.Location,l),sessionStorage.setItem("/conferences/"+f+"/registrations/current",j.id),[201,j,k]}),a.whenGET(/^conferences\/[-a-zA-Z0-9]+\/registrations\/current\/?$/).respond(function(a,b){console.log(arguments);var c=b.split("/")[1],d=sessionStorage.getItem("/conferences/"+c+"/registrations/current");return d?[200,sessionStorage.getItem("/registrations/"+d)]:[404]}),a.whenGET(/^registrations\/[-a-zA-Z0-9]+\/?$/).respond(function(a,b){console.log(arguments);var c=b.split("/")[1],d=sessionStorage.getItem("/registrations/"+c);return d?[200,d]:[404]}),a.whenPUT(/^answers\/[-a-zA-Z0-9]+\/?$/).respond(function(a,c,d){console.log(arguments);var e=angular.fromJson(d);if(!e.registration)return[400,{message:"registration must be present"}];if(!e.block)return[400,{message:"block must be present"}];if(!e.value)return[400,{message:"value must be present"}];e.id||(e.id=b());var f="/registrations/"+e.registration,g=angular.fromJson(sessionStorage.getItem(f));if(g){var h=g.answers,i=_.findIndex(h,{block:e.block});-1!==i&&h.splice(i,1),h.push(e),sessionStorage.setItem(f,angular.toJson(g))}return[200,e]})}]),angular.module("confRegistrationWebApp").controller("MainCtrl",["$scope","ConfCache",function(a,b){a.$on("conferences/",function(b,c){a.conferences=c}),b.query()}]);