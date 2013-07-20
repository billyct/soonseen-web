'use strict';

angular.module('soonseen3App')
  .factory('userService', function ($resource, api_url) {

    return $resource(api_url+'/:action', {action:'@action'}, {
      signin: { method:'POST', params:{action:'signin'}},
      signup: { method:'POST', params:{action:'signup'}},
      me: {method:'GET', params:{action:'me'}},
      neighbors : {method:'GET', params:{action:'neighbors'}, isArray:true},
      search : {method:'GET', params:{action:'search'}, isArray:true},
      stats : {method:'GET', params:{action:'stats'}},
      delete_avatar: {method:'PUT', params:{action:'delete_avatar'}},
      update: {method:'PUT', params:{action:'update_profile'}}
    });
  });
