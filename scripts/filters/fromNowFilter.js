'use strict';

/* require moment */
angular.module('soonseen3App')
  .filter('fromNowFilter', function () {
    return function (input) {
      return moment(input).fromNow()
    };
  });
