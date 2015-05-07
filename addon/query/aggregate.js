import Ember from 'ember';

export default function aggregateQuery (store, config, type, query) {
  var url = config.host + '/api/' + type + '/aggregate?query=' + JSON.stringify(query);
  return Ember.$.ajax(url, 'GET');
};
