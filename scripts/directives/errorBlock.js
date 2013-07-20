'use strict';

angular.module('soonseen3App')
  .directive('errorBlock', function () {
    return {
      template: '<div class="alert alert-error alert-block" ng-show="error" ng-hide="closed">' +
                	'<a class="close" ng-click="close()">&times;</a>' +
        					'{{error}}' +
        				'</div>',
      restrict : 'E',
      scope : {
      	error : '='
      },
      link: function postLink(scope, element, attrs) {

      	scope.close = function() {
      		scope.closed = true;
          scope.error = "";
      	};

        scope.$watch('error', function(value) {

        	if (value) {
        		scope.closed = false;
        	} else {
        		scope.closed = true;
        	}
        });

      }
    };
  });
