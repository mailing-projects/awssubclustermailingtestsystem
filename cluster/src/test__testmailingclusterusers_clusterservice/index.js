function createServicePack(execlib) {
  'use strict';
  return {
    service: {
      dependencies: ['allex:clusterrepresentativeuser']
    },
    sinkmap: {
      dependencies: ['allex:clusterrepresentativeuser']
    }, /*
    tasks: {
      dependencies: []
    }
    */
  }
}

module.exports = createServicePack;
