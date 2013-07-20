'use strict';

angular.module('soonseen3App')
  .factory('communityService', function ($resource, api_url) {


    return $resource(api_url+'/:action', {action:'@action'}, {
      query: {method:'GET', params:{action:'communitys'}, isArray:true}
    });

  });
