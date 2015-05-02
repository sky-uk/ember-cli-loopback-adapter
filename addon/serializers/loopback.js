import DS from 'ember-data';

export default DS.RESTSerializer.extend({

  extractArray: function (store, type, payload, id, requestType) {
    var result = {};
    result[type.typeKey] = payload;
    payload = result;

    return this._super(store, type, payload, id, requestType);
  }

});
