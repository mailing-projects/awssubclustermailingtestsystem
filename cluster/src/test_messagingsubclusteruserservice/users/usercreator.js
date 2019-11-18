function createUser(execlib, ParentUser) {
  'use strict';
  if (!ParentUser) {
    ParentUser = execlib.execSuite.ServicePack.Service.prototype.userFactory.get('user');
  }

  var qlib = execlib.lib.qlib;

  function User(prophash) {
    ParentUser.call(this, prophash);
  }
  
  ParentUser.inherit(User, require('../methoddescriptors/user'), [/*visible state fields here*/]/*or a ctor for StateStream filter*/);
  User.prototype.__cleanUp = function () {
    ParentUser.prototype.__cleanUp.call(this);
  };

  User.prototype.sendSingleMessage = function(recipient, subject, body, notbefore, notafter, defer){
    qlib.promise2defer(this.__service.sendSingleMessage(recipient, subject, body, notbefore, notafter), defer);
  };

  return User;
}

module.exports = createUser;
