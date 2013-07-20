'use strict';

/*require bootstrap-file-input*/
angular.module('soonseen3App')
  .directive('fileInput', function () {
    return {
      template: '<input type="file" class="btn btn-small btn-info m-b-small" onchange="angular.element(this).scope().setFiles(this)" accept="image/*" />',
      restrict: 'E',
      scope: {
        model: '=ngModel',
        clear: '=clear'
      },
      link: function postLink(scope, element, attrs) {
      	var fileInput = $(element).find('input[type="file"]');
        if (attrs.multiple) {
          fileInput.attr('multiple','true');
        };
      	fileInput.attr('title', attrs.title);
      	fileInput.bootstrapFileInput();
        


        scope.setFiles = function(element) {
          scope.$apply(function(scope) {
            // Turn the FileList object into an Array
            scope.model = []
            for (var i = 0; i < element.files.length; i++) {
              scope.model.push(element.files[i]);
            }
          });
        };


        scope.$watch('clear', function(value) {
          if (value) {
            $(element).find('span.file-input-name').text('');
          };
        });



      }
    };
  });
