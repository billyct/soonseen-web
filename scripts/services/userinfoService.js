'use strict';

angular.module('soonseen3App')
  .factory('userinfoService', function ($resource, api_url) {
    return $resource(api_url+'/:action/:type', {action:'@action', type:'@type'}, {
      save_address: { method:'POST', params:{action:'userinfo', type:'address'}}
    });
  });
