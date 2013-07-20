'use strict';

angular.module('soonseen3App')
  .factory('groupService', function ($resource, api_url) {
    return $resource(api_url+'/groups/:id/:action', {action:'@action', id:'@id'}, {
      queryJoined: {method:'GET', params:{'type':'joined'}, isArray:true},
      queryCreated: {method:'GET', params:{'type':'created'}, isArray:true},
      query: {method:'GET', isArray:true},
      join : {method: 'POST', params:{action:'join'}},
      get  : {method:'GET'},
      save : {method:'POST'},
      delete: {method:'DELETE'},
      members: {method:'GET', params:{action:'members'}, isArray:true},
      kick: {method:'POST', params:{action:'kick'}},
      invite: {method:'POST', params:{action:'invite'}}
    });
  });
