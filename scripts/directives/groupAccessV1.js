'use strict';

angular.module('soonseen3App')
  .directive('groupAccessV1', function () {
    return {
      template: '<b class="badge"><i></i></b>',
      restrict: 'E',
      scope: {
      	access: '=access'
      },
      link: function postLink(scope, element, attrs) {

        if (scope.access == 1) {
        	$(element).find('b').addClass('bg-success');
        	$(element).find('i').addClass('icon-unlock');
        	$(element).find('i').attr('title', '公开');
        } else if(scope.access == 2) {
        	$(element).find('b').addClass('bg-info');
        	$(element).find('i').addClass('icon-lock');
        	$(element).find('i').attr('title', '私密');
        }
      }
    };
  });
