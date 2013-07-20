'use strict';

angular.module('soonseen3App')
  .controller('ProfileCtrl', function ($scope, $rootScope, $cookieStore, $location, userService, api_url) {

  	$scope.save = function(profile) {

  		$scope.loading = true;

  		profile = {
  			token : $rootScope.user.token,
  			email : profile.contact_information.email,
  			phone : profile.contact_information.phone,
  			access : profile.access,
  			avatar : profile.avatar,
  			signature : profile.signature,
  			avatars : profile.avatars
  		};

  		if (profile.avatars && profile.avatars.length > 0 ) {
  			var fd = new FormData();
			fd.append('photo', profile.avatars[0]);
			fd.append('token', $rootScope.user.token);

			var xhr = new XMLHttpRequest();
			xhr.upload.addEventListener("progress", uploadProgress, false);
	        xhr.addEventListener("load", uploadComplete, false);
	        xhr.addEventListener("error", uploadFailed, false);
	        xhr.addEventListener("abort", uploadCanceled, false);
			xhr.open("POST", api_url+"/photos");
			xhr.send(fd);

  		} else {
  			userSaver(profile);
  		}

  		function uploadProgress(evt) {
	    }


  		function uploadComplete(evt) {
	        /* This event is raised when the server send back a response */
	        var result = JSON.parse(evt.target.responseText);
	        
	    	if (result.error) {

	    		$scope.$apply(function () {
		            $scope.image_error = {
		    			title : result.error,
		    			content : result.error
		    		};
		        });

		        $scope.loading = false;
		        
	    		return;
	    	}

	    	profile.avatar = result.path;
	    	userSaver(profile);
	    }



  		function uploadFailed(evt) {
	    	$scope.$apply(function () {
	            $scope.image_error = {
	    			title : "尝试上传文件时发生了错误。",
	    			content : "尝试上传文件时发生了错误。"
	    		};
	    		$scope.loading = false;
	        });
	    }

	    function uploadCanceled(evt) {
	        $scope.$apply(function(){
	            $scope.loading = false;
	        });

	        $scope.$apply(function () {
	            $scope.image_error = {
	    			title : "由用户或浏览器中断了连接的上传，已被取消。",
	    			content : "由用户或浏览器中断了连接的上传，已被取消。"
	    		};
	    		$scope.loading = false;
	        });
	    }
  		


  		function userSaver(profile) {
  			userService.update(profile, function(result) {
	  			if (!result.error) {
	  				$cookieStore.put('current_user', result);
	  				$rootScope.user = result;
	  				$scope.loading = false;
	  				$location.path('/profile');
	  			};
	  		});
  		}

  	};

  	$scope.delete_avatar = function() {
  		userService.delete_avatar({token: $rootScope.user.token}, function(result) {
  			if (!result.error) {

  				$rootScope.user.avatar = result.avatar;
  				$cookieStore.put('current_user', $rootScope.user);
  			};
  		});
  	};
    
  })
  .controller('ProfileQueryCtrl', function ($scope, $rootScope, userService) {
  	$scope.profile = $rootScope.user;
  })
  .controller('ProfileStatsCtrl', function ($scope, $rootScope, userService) {
  	$scope.activity_stats = userService.stats({token: $rootScope.user.token});
  });
