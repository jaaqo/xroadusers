var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone'); Backbone.$ = $;

var Filters = Backbone.Model.extend({

  defaults: {
    name: '',
    memberClass: '',
    memberCode: '',
    objectType: '',
    xRoadInstance: '',
  }

});

module.exports = Filters;
