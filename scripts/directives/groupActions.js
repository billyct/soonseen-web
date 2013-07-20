'use strict';

angular.module('soonseen3App')
  .directive('groupActions', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the groupActions directive');
      }
    };
  });
