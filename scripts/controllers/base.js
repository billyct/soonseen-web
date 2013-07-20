'use strict';

angular.module('soonseen3App')
  .controller('BaseCtrl', function ($scope, $cookieStore, $rootScope, $location, userService) {

  	console.log("have fun");
  	/* check the user and the userinfo*/
    var current_user = $cookieStore.get('current_user');

    if (!current_user) {
      $location.path('/signin');
      return;
    }

    userService.me({token: current_user.token}, function(result) {
      if (result.error) {
        $cookieStore.remove('current_user');
        delete $rootScope.user;
        delete $rootScope.userinfo;
        $location.path('/signin');
        return;
      };
      $rootScope.user = result;
    });

    $rootScope.user = current_user;

    if (_.isEmpty(current_user.addresses)) {
      $location.path('/userinfo');
    };
    /* end for check the user and the userinfo*/
    //$scope.groupsJ = groupService.queryJoined({token:$rootScope.user.token});
    
    // $scope.groups = groupService.query({token:$rootScope.user.token});



    $scope.days = new Array(7);
    var today_unix = moment().unix();

    for (var i = 0; i < $scope.days.length; i++) {

      var past = moment.unix(today_unix-86400*(i+3));

      $scope.days[i] = {
        month : past.format('MMM'),
        date : past.date(),
      };
    }




    $scope.has = function(o, i) {
      return _.contains(o, i);
    }




  });
