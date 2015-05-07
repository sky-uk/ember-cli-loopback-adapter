import DS from 'ember-data';
import aggregateQuery from 'ember-cli-loopback-adapter/query/aggregate';

export function initialize(container, app) {

  var config = app.get('loopback');

  if (!config || !config.host) {
    throw new Error('ENV.APP.loopback not set.');
  }

  app.register('config:loopback', config, { instantiate: false });
  app.inject('route', 'loopbackConfig', 'config:loopback');
  app.inject('controller', 'loopbackConfig', 'config:loopback');
  app.inject('adapter', 'loopbackConfig', 'config:loopback');

  DS.Store.reopen({
    aggregate: function (type, query) {
      return aggregateQuery(this, config, type, query);
    }
  });

}

export default {
  name: 'loopback-config',
  initialize: initialize
};
