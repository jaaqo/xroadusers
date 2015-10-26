var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone'); Backbone.$ = $;

var Child = Backbone.Model.extend({

  defaults: {
    name: '',
    memberClass: '',
    memberCode: '',
    objectType: '',
    subsystemCode: '',
    xRoadInstance: '',
  }

});

module.exports = Child;
