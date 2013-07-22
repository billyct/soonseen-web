'use strict';

angular.module('soonseen3App')
	.controller('GroupCtrl', function ($scope, $rootScope, $location, $http, api_url, groupService, userService) {

		$scope.create = function(group) {
			$scope.loading = true;
			group.token = $rootScope.user.token;
			groupService.save(group, function(result) {
				if (!result.error) {

					$scope.groupsList.push(result);
					// $scope.groupsJ.push(result);
					// $scope.groups.push(result);

					$('#formGroupModal').modal('hide');
					return;
				}

				$scope.error = data.error;
				$scope.loading = false;

			});

			this.group = {
				access: 1
			};
		};


		$scope.join = function(groupId) {
			groupService.join({id: groupId, token: $rootScope.user.token}, function(result) {
				if (!result.error) {
					if (_.contains($scope.group.users, $rootScope.user._id)) {
						$scope.group.users = _.without($scope.group.users, $rootScope.user._id);

						var index = _.indexOf($scope.groupsJ,_.find($scope.groupsJ, function(gp) {
							if (gp._id == $scope.group._id) {return true};
						}));

						$scope.groupsJ.splice(index, 1);

						//如果是members页面
						if (!_.isUndefined($scope.members)) {
							var index = _.indexOf($scope.members,_.find($scope.members, function(m) {
								if (m._id == $rootScope.user._id) {return true};
							}));
							$scope.members.splice(index,1);
						};

					} else {
						$scope.group.users.push($rootScope.user._id);
						$scope.groupsJ.push($scope.group);

						//如果是members页面
						if (!_.isUndefined($scope.members)) {
							$scope.members.push($rootScope.user);
						};
						
					}
				} else {
					$scope.group_error = {
						title : result.error,
						content : result.error
					};

				}
			});
		}

		$scope.delete = function(groupId) {
			var delete_gp = {
				token: $rootScope.user.token,
				id: groupId
			};

			var index = _.indexOf($scope.groupsJ,_.find($scope.groupsJ, function(gp) {
				if (gp._id == groupId) {return true};
			}));

			groupService.delete(delete_gp, function(result) {
				if (!result.error) {
					$scope.groupsJ.splice(index,1);
					$location.path('/home');
					//$scope.timelines = _.without($scope.timelines, $scope.timelines[index]);
				};
			});
		};


		$scope.invite = function(groupId) {
			console.log('x');
		};

		$scope.kick = function(groupId, userId) {
			groupService.kick({group_id: groupId, user_id: userId, token: $rootScope.user.token}, function(result) {
				if (!result.error) {

					var index = _.indexOf($scope.members,_.find($scope.members, function(m) {
						if (m._id == userId) {return true};
					}));
					$scope.members.splice(index,1);

					var index = _.indexOf($scope.group.users,_.find($scope.group.users, function(u) {
						if (u == userId) {return true};
					}));
					$scope.group.users.splice(index, 1);
				};
			});
		}


	})
	.controller('GroupDetailCtrl', function($scope, $rootScope, $routeParams, $location, groupService, timelineService) {

		var groupId = $routeParams.id;
		if (!_.isUndefined(groupId)) {
			$scope.group = groupService.get({id:groupId,token: $rootScope.user.token}, function(result) {
				if (result.error) {$location.path('/home')};
				$scope.actions = {
					joined : _.contains(result.users, $rootScope.user._id),
					created : result.user == $rootScope.user._id,
					public : result.access == 1
				};
			});

			$scope.timelines = timelineService.group({id:groupId,token: $rootScope.user.token});
			
		}


		

	})
	.controller('GroupQueryJCtrl', function($scope, $rootScope, groupService) {
		$scope.groupsJ = groupService.queryJoined({
			token: $rootScope.user.token
		});
	})
	.controller('GroupQueryCCtrl', function($scope, $rootScope, groupService) {
		$scope.groupsC = groupService.queryCreated({
			token: $rootScope.user.token
		});
	})
	.controller('GroupQueryCtrl', function($scope, $rootScope, groupService) {
		$scope.groups = groupService.query({
			token: $rootScope.user.token
		});

		$scope.groupsList = $scope.groups;
	})
	.controller('GroupMemberQueryCtrl', function($scope, $rootScope, $routeParams, groupService) {
		var groupId = $routeParams.id;
		if (!_.isUndefined(groupId)) {
			$scope.group = groupService.get({id:groupId,token: $rootScope.user.token}, function(result) {
				if (result.error) {$location.path('/home')};
				$scope.actions = {
					joined : _.contains(result.users, $rootScope.user._id),
					created : result.user == $rootScope.user._id,
					public : result.access == 1
				};
			});
			$scope.members = groupService.members({id: groupId, token: $rootScope.user.token});
		}
	})
	.controller('GroupMemberCtrl', function($scope, $rootScope, $routeParams, $http, groupService, api_url) {
		$scope.search = function(keyword, groupId) {
			console.log('abc');

  			/*
  			 *原来是想使用
  			 *return userService.search({keyword:keyword, token:$rootScope.user.token, group_id: groupId});
  			 *这里是一个关于$resource延迟的问题的问题待解决，因为这样写影响维护,可能吧，主要这里涉及到ui-bootrap的typehead
  			 */
  			return $http.get(api_url+'/search', {params:{
  				token : $rootScope.user.token,
  				keyword: keyword,
  				group_id:groupId
  			}}).then(function(response) {
  				return response.data;
  			});
  		}

  		$scope.$watch('neighbor_selected', function(neighbor) {
  			
  			if (!_.isString(neighbor) && _.isObject(neighbor)) {
  				groupService.invite({group_id: $scope.group._id, user_id: neighbor._id, token: $rootScope.user.token}, function(result) {
					if (!result.error) {
						$scope.members.push(neighbor);
						$scope.group.users.push(neighbor._id);
						$scope.neighbor_selected = '';
					};
	  			});
  			};
  			
  		});
	});