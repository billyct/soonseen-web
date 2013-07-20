'use strict';

angular.module('soonseen3App')
  .directive('btn1', function () {
    return {
      restrict: 'A',

      // scope: {
      //   loading:'=ngModel'
      // },
      link: function postLink(scope, element, attrs) {

      	var value = element.text();
      	var valueLoading = attrs.dataloading;


      	var loading = function() {
      		element.attr('disabled', true);
      		element.text(valueLoading);
      	};

        //console.log(attrs.dis);

      	var loaded = function() {
          //if (attrs.dis == 1) {
      		  element.attr('disabled', false);
          //};
      		element.text(value);
      	}



      	scope.$watch(attrs.ngModel, function(value) {

      		if (value) {
      			loading();
      		}

      		if (!value && !_.isUndefined(value)) {
            
      			loaded();
      		}
      	});
      }
    };
  });
