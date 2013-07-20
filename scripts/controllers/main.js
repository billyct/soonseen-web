'use strict';

angular.module('soonseen3App')
  .controller('MainCtrl', function ($scope, $rootScope, $cookieStore, $location) {
  	/* check the user and the userinfo*/
    var current_user = $cookieStore.get('current_user');

    if (current_user) {
      $location.path('/home');
    }
  });
