function createMessagingSubclusterUserService(execlib, ParentService) {
  'use strict';
  
  var execSuite = execlib.execSuite,
    RemoteServiceListenerServiceMixin = execSuite.RemoteServiceListenerServiceMixin;


  function factoryCreator(parentFactory) {
    return {
      'service': require('./users/serviceusercreator')(execlib, parentFactory.get('service')),
      'user': require('./users/usercreator')(execlib, parentFactory.get('user')) 
    };
  }

  function MessagingSubclusterUserService(prophash) {
    ParentService.call(this, prophash);
    RemoteServiceListenerServiceMixin.call(this, prophash);
    this.findRemote([
      {name: 'Clusters', identity: {role: 'monitor', name: 'monitor'}},
      {name: 'messenger_gateway', identity: {role: 'user', name: 'user'}}
    ], null, 'Messenger');
  }
  
  ParentService.inherit(MessagingSubclusterUserService, factoryCreator);
  RemoteServiceListenerServiceMixin.addMethods(MessagingSubclusterUserService);
  
  MessagingSubclusterUserService.prototype.__cleanUp = function() {
    RemoteServiceListenerServiceMixin.prototype.destroy.call(this);
    ParentService.prototype.__cleanUp.call(this);
  };

  MessagingSubclusterUserService.prototype.sendSingleMessage = execSuite.dependentServiceMethod([], ['Messenger'], function (sendersink, recipient, subject, body, notbefore, notafter, defer) {
    console.log('sendSingleMessage');
    console.log(sendersink.role, sendersink.modulename);
    execlib.lib.qlib.promise2defer(sendersink.call('sendSingleMessage', recipient, subject, body, notbefore, notafter), defer);
  });
  
  return MessagingSubclusterUserService;
}

module.exports = createMessagingSubclusterUserService;
