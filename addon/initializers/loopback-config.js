export function initialize(container, app) {

  var config = app.get('loopback');

  if (!config || !config.host) {
    throw new Error('ENV.APP.loopback not set.');
  }

  app.register('config:loopback', config, { instantiate: false });
  app.inject('route', 'loopbackConfig', 'config:loopback');
  app.inject('controller', 'loopbackConfig', 'config:loopback');
  app.inject('adapter', 'loopbackConfig', 'config:loopback');

}

export default {
  name: 'loopback-config',
  initialize: initialize
};
