var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone'); Backbone.$ = $;

var Filters = Backbone.Model.extend({

  defaults: {
    name: '',
    filtering: false,
    total: 0,
    memberClass: '',
    memberCode: '',
    objectType: '',
    xRoadInstance: '',
    subsystemCode: ''
  }

});

module.exports = Filters;
