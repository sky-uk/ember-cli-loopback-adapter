import DS from 'ember-data';

export default DS.RESTAdapter.extend({
    namespace: function () {
      var config = this.get('loopbackConfig');
      return config.namespace ? config.namespace : 'api';
    }.property()
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

  , createRecord: function (store, type, snapshot) {

      var data = snapshot.get('_inFlightAttributes');
      return this.ajax(this.buildURL(type.typeKey, null, snapshot), "POST", { data: data });

    }
});
