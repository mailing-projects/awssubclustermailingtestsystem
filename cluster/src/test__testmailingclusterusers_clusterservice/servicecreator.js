function createClusterService(execlib, ParentService) {
  'use strict';
  
  function factoryCreator(parentFactory) {
    return {
      'service': require('./users/serviceusercreator')(execlib, parentFactory.get('service')),
      'user': require('./users/usercreator')(execlib, parentFactory.get('user')) 
    };
  }

  function ClusterService(prophash) {
    ParentService.call(this, prophash);
  }
  
  ParentService.inherit(ClusterService, factoryCreator, void 0, {
    local: require('./localsinkinfo'),
    remote: require('./remotesinkinfo')
  });
  
  ClusterService.prototype.__cleanUp = function() {
    ParentService.prototype.__cleanUp.call(this);
  };
  
  return ClusterService;
}

module.exports = createClusterService;
