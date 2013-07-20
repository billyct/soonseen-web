'use strict';

angular.module('soonseen3App')
  .controller('SignCtrl', function($rootScope, $scope, $cookieStore, $location, userService, userinfoService, $timeout) {

    $scope.signin = function(user) {

      $scope.loading = true;

      userService.signin(user, function(data){
        if (data.error) {

          $scope.error = data.error;
          $scope.loading = false;

        }else{
          $cookieStore.put('current_user', data);
          $rootScope.user = data;

          $location.path('/userinfo');
        };
      });
    };

    $scope.signup = function(user) {
      $scope.loading = true;
      userService.signup(user, function(data){
        if (data.error) {
          $scope.error = data.error;
          $scope.loading = false;
        }else{

          $cookieStore.put('current_user', data);
          $rootScope.user = data;
          $location.path('/userinfo');
          return;
        };

      });
    };

    $scope.signout = function() {
      $cookieStore.remove('current_user');
      delete $rootScope.user;
      delete $rootScope.userinfo;
      $location.path('/signin');
      return;
    }

  });
