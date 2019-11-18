describe ('Send Test', function () {
  loadMochaIntegration('allex_masterservice');
  it('Connect to Sender', function () {
    return setGlobal('Sender', findSink('Consumer',{name: 'user', role: 'user'}));
  });
  it('Send', function () {
    return Sender.call('sendSingleMessage', 'andrija.hers@gmail.com', 'Wow', {text: 'Divi sad', html: '<b>Divi</b><i>sad</i>'});
  });
  it('Destroy sink', function () {
    Sender.destroy();
  });
});
