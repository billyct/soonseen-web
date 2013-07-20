'use strict';

angular.module('soonseen3App')
  .controller('UserinfoCtrl', function ($scope, $cookieStore, $location, communityService, userinfoService) {

  	/* check the user and the userinfo*/    
    var current_user = $cookieStore.get('current_user');

    if (!current_user) {
      $location.path('/signin');
      return;
    }

    if (!_.isEmpty(current_user.addresses)) {
      $location.path('/home');
      return;
    };

    current_user.addresses = new Array;

    
    $scope.communitys = communityService.query({token: current_user.token}, function(communitys) {
      $scope.userinfo = {
        community : communitys[0]
      };
    });

    $scope.save = function(userinfo) {
    	
    	$scope.loading = true;

  		userinfo.community = userinfo.community._id;
  		userinfo.token = current_user.token;
  		userinfoService.save_address(userinfo, function(userinfo) {
  		if (userinfo.error) {
        $scope.loading = false;
  		  $scope.error = userinfo.error;
  		} else {
  		  current_user.addresses.push(userinfo);
  		  $cookieStore.put('current_user', current_user);
  		  $location.path('/home');
  		}
  		});
    };

  });
