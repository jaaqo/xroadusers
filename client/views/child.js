var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone'); Backbone.$ = $;

_.templateSettings = {
    interpolate: /\{\{(.+?)\}\}/g,
    evaluate: /\{\%(.+?)\%\}/g
};

var ChildView = Backbone.View.extend({
  tagName: 'tr',
  className: 'child',
  template: _.template($('#child-template').html()),
  initialize: function () {
    this.listenTo(this.model, 'change', this.render); 
  },
  render: function () {
    this.$el.html(this.template(this.model.attributes));
    return this;
  }
});

module.exports = ChildView;
