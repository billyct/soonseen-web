'use strict';

angular.module('soonseen3App')
  .filter('formatTimeFilter', function () {
    return function (input) {
      return moment(input).format('LLLL');
    };
  });
