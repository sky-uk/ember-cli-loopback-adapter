import DS from 'ember-data';

export default DS.RESTAdapter.extend({
    namespace: 'api'
  , host: function () {
      var config = this.get('loopbackConfig');
      return config.host;
    }.property()
  , pathForType: function (type) {
      return type;
    }
  , findQuery: function (store, type, query) {
      var url = this.buildURL(type.typeKey) + '?filter=' + JSON.stringify(query);

      return new Ember.RSVP.Promise(function (resolve, reject) {

        Ember.$.getJSON(url)
          .then(function (data) {
            Ember.run(null, resolve, data);
          }, function (jqXHR) {
            jqXHR.then = null;
            Ember.run(null, reject, jqXHR);
          });


      });
    }
});
