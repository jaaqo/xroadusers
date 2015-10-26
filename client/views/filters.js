var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone'); Backbone.$ = $;

_.templateSettings = {
    interpolate: /\{\{(.+?)\}\}/g,
    evaluate: /\{\%(.+?)\%\}/g
};

var FiltersView = Backbone.View.extend({
  template: _.template($('#filters-template').html()),
  initialize: function () {
    this.listenTo(this.model, 'change', this.render); 
  },
  render: function () {
    this.$el.html(this.template(this.model.attributes));
    return this;
  }
});

module.exports = FiltersView;
