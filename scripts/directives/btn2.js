'use strict';

angular.module('soonseen3App')
  .directive('btn2', function () {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {

      	scope.$watch(attrs.ngDisabled, function(value) {
      		$(element).text(value);
      	});
        
      }
    };
  });
