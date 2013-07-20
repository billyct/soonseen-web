'use strict';

angular.module('soonseen3App', ['ngCookies', 'ngResource', 'ui.select2', 'ui.utils', 'ui.bootstrap'])
  .value('api_url', 'http://api.soonseen.in')
  .config(function ($routeProvider, $locationProvider) {


    $routeProvider
      .when('/', {templateUrl: '/views/sign/signin.html',controller: 'MainCtrl'})
      .when('/signin', {templateUrl: '/views/sign/signin.html', controller: 'SignCtrl'})
      .when('/signup', {templateUrl: '/views/sign/signup.html', controller: 'SignCtrl'})
      .when('/userinfo', {templateUrl: '/views/sign/userinfo.html', controller: 'UserinfoCtrl'})
      .when('/home', {templateUrl:'/views/timeline/home.v1.html', controller : 'TimelineQueryCtrl'})
      .when('/home/past/:num', {templateUrl:'/views/timeline/home.v1.html', controller : 'TimelinePastCtrl'})
      .when('/groups', {templateUrl:'/views/group/groups.v1.html', controller : 'GroupQueryCtrl'})
      .when('/groups/:id', {templateUrl:'/views/group/group.v1.html', controller : 'GroupDetailCtrl'})
      .when('/groups/:id/members', {templateUrl:'/views/group/members.v1.html', controller : 'GroupMemberQueryCtrl'})
      .when('/profile', {templateUrl:'/views/people/profile.v1.html', controller: 'ProfileStatsCtrl'})
      .when('/edit_profile', {templateUrl:'/views/people/profile-edit.v1.html', controller: 'ProfileQueryCtrl'})
      .when('/people/:id', {templateUrl:'/views/people/profile.v1.html', controller: 'ProfileQueryCtrl'})
      .otherwise({
        redirectTo: '/'
      });


      $locationProvider.html5Mode(true);

    
  });
