'use strict';

angular.module('soonseen3App')
  .directive('messagebox', function () {
    return {
      template: '<div class="modal fade">'+
				    '<div class="modal-dialog">'+
				      '<div class="modal-content">'+
				        '<div class="modal-header">'+
				          '<button type="button" class="close" data-dismiss="modal" aria-hidden="true" ng-click="close()">'+
				            '<i class="icon-remove"></i>'+
				          '</button>'+
				          '<h4 class="modal-title">{{title}}</h4>'+
				        '</div>'+
				        '<div class="modal-body">'+
				          '<p>{{content}}</p>'+
				        '</div>'+
				        '<div class="modal-footer">'+
				          '<a href="#" class="btn btn-primary" aria-hidden="true" data-dismiss="modal" ng-click="close()">确定</a>'+
				        '</div>'+
				      '</div>'+
				    '</div>'+
				'</div>',
      restrict: 'E',
      scope: {
      	title: '=',
      	content: '='
      },
      link: function postLink(scope, element, attrs) {
      	scope.close = function() {
      		scope.title = "";
      	};
      	scope.$watch('title', function(value) {
      		if(value)$(element).children().modal('show');
      	});
      }
    };
  });
