'use strict';

angular.module('soonseen3App')
  .factory('timelineService', function ($resource, api_url) {
  	
    return $resource(api_url+'/timelines/:action', {action:'@action'}, {
      query: {method:'GET', isArray:true},
      save: {method:'POST'},
      delete: {method:'DELETE'},
      thanks:{method:'POST', params:{action:'thanks'}},
      group: {method:'GET', params:{action:'group'}, isArray:true},
      //past : {method:'GET', params:{action:'past'}, isArray:true}
    });
  });
