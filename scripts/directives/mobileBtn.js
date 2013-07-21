'use strict';

angular.module('soonseen3App')
  .directive('mobileBtn', function () {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        element.click(function(){
        	console.log('aaa');
        	$('body').toggleClass('slide-nav slide-nav-left');
        	element.toggleClass('active');
        });
      }
    };
  });
