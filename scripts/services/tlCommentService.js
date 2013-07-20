'use strict';

angular.module('soonseen3App')
  .factory('tlCommentService', function ($resource, api_url) {
    return $resource(api_url+'/timeline/:action', {action:'@action'}, {
      save: {method:'POST', params:{action:'comments'}}
    });
  });
