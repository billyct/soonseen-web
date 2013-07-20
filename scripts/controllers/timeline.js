'use strict';

angular.module('soonseen3App')
	.controller('TimelineCtrl', function ($scope, $rootScope, $http, $routeParams, timelineService, tlCommentService, api_url) {
		//发布timeline
		$scope.publish = function(timeline) {

			$scope.loading = true;

			timeline.token = $rootScope.user.token;

			if (!_.isArray(timeline.groups) && !_.isEmpty($scope.group)) {
				timeline.groups = new Array();
				timeline.groups.push($scope.group._id);
			};
			
			if (timeline.photos && timeline.photos.length > 0 ) {
				for (var i = timeline.photos.length - 1; i >= 0; i--) {
					var fd = new FormData();
					fd.append('photo', timeline.photos[i]);
					fd.append('token', $rootScope.user.token);

					var xhr = new XMLHttpRequest();
					xhr.upload.addEventListener("progress", uploadProgress, false);
			        xhr.addEventListener("load", uploadComplete, false);
			        xhr.addEventListener("error", uploadFailed, false);
			        xhr.addEventListener("abort", uploadCanceled, false);
					xhr.open("POST", api_url+"/photos");
					$scope.progressVisible = true;
					xhr.send(fd);

				};
			} else {
				timelineSaver(timeline);
			}


			function uploadProgress(evt) {
		        $scope.$apply(function(){
		            if (evt.lengthComputable) {
		                $scope.progress = Math.round(evt.loaded * 100 / evt.total);
		            } else {
		                $scope.progress = 100;
		            }
		        })
		    }

		    var stats = 0; //用来判断几张图片上传成功~
		    var photos = new Array(); //用来存储图片的数据库ID
		    function uploadComplete(evt) {
		        /* This event is raised when the server send back a response */
		        stats++;
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

		    	photos.push(result._id);

		    	//判断如果全部都是上传成功了
		    	if (stats == timeline.photos.length) {
		    		//将图片数据重新赋值给timeline，是图片的objectids
			    	timeline.photos = photos;
			    	//提交timeline
		    		timelineSaver(timeline);
		    		
				};
		        //alert(evt.target.responseText);
		    }

		    function uploadFailed(evt) {
		    	$scope.$apply(function () {
		            $scope.image_error = {
		    			title : "尝试上传文件时发生了错误。",
		    			content : "尝试上传文件时发生了错误。"
		    		};
		        });
		    }

		    function uploadCanceled(evt) {
		        $scope.$apply(function(){
		            $scope.progressVisible = false;
		        });

		        $scope.$apply(function () {
		            $scope.image_error = {
		    			title : "由用户或浏览器中断了连接的上传，已被取消。",
		    			content : "由用户或浏览器中断了连接的上传，已被取消。"
		    		};
		        });
		    }

		    function timelineSaver(timeline) {
		    	timelineService.save(timeline, function(timeline) {
		    		$scope.loading = false;
		    		if (timeline.error) {
		    			return;
		    		};

					$scope.timelines.splice(0, 0, timeline);
					$scope.timeline = {};
					$scope.fileclear = true;
					$scope.progressVisible = false;
				});
		    }

			


			
		};


		//评论timeline
		$scope.comment = function(comment, index) {

			var ct = {
				comment: comment,
				token: $rootScope.user.token,
				id: this.timelines[index]._id
			};

			tlCommentService.save(ct, function(comment) {
				if (!comment.error) {

					comment.user = $rootScope.user;

					$scope.timelines[index].comments.push(comment);
				};
			});
			this.content = "";

		};

		$scope.thanks = function(index) {
			var thx_timeline = {
				token: $rootScope.user.token,
				id: $scope.timelines[index]._id
			};

			timelineService.thanks(thx_timeline, function(result) {
				if (!result.error) {
					if (_.contains($scope.timelines[index].thxed_users, $rootScope.user._id)) {
						$scope.timelines[index].thxed_users = _.without($scope.timelines[index].thxed_user, $rootScope.user._id);
					} else {
						$scope.timelines[index].thxed_users.push($rootScope.user._id);
					}
				};
			});
		};

		$scope.delete = function(index) {
			var delete_tl = {
				token: $rootScope.user.token,
				id: $scope.timelines[index]._id
			};

			timelineService.delete(delete_tl, function(result) {
				if (!result.error) {
					$scope.timelines.splice(index,1);
					//$scope.timelines = _.without($scope.timelines, $scope.timelines[index]);
				};
			});
		};

		$scope.page = 1;

		

		function timelineGeter(page, callback) {

			var past = 0;
			if (!_.isEmpty($routeParams.num)) {
				past = $routeParams.num;
			};

			//判断是不是group里的timeline
			if (!_.isEmpty($scope.group)) {
				timelineService.group({
					id : $scope.group._id,
					token : $rootScope.user.token,
					page : page,
					past : past
				}, callback);
			} else {
				timelineService.query({
					token : $rootScope.user.token,
					page : page,
					past : past
				}, callback);
			}
		}

		$scope.more = function(page) {
			timelineGeter(page, function(timelines) {
				//如果没有数据了
				if (_.isEmpty(timelines)) {
					$scope.nodata = "没有更多了";
					return ;
				};

				for (var i = 0; i <=timelines.length - 1; i++) {
					$scope.timelines.push(timelines[i]);
				};
				$scope.page = page;
			});

		};
	})
	.controller('TimelineQueryCtrl', function($scope, $rootScope, timelineService) {
		if (!_.isEmpty($rootScope.user)) {
			var current_user = $rootScope.user;
			$scope.timelines = timelineService.query({
				token: current_user.token
			});

		}	
		
	})
	.controller('TimelinePastCtrl', function($scope, $rootScope, $routeParams, timelineService) {
		var num = $routeParams.num;
		if (!_.isEmpty($rootScope.user)) {
			var current_user = $rootScope.user;
			$scope.timelines = timelineService.query({
				token: current_user.token,
				past: num
			});

		}	
		
	});