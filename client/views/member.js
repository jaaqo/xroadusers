var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone'); Backbone.$ = $;

_.templateSettings = {
    interpolate: /\{\{(.+?)\}\}/g,
    evaluate: /\{\%(.+?)\%\}/g
};

var MemberView = Backbone.View.extend({
  tagName: 'tr',
  className: 'member',
  events: {
    'click': function (e) {this.toggleArrow(e); this.toggleChildren(e);}
  },
  template: _.template($('#member-template').html()),
  initialize: function () {
    this.listenTo(this.model, 'change', this.render); 
  },
  render: function () {
    this.$el.html(this.template(this.model.attributes));
    return this;
  },
  toggleArrow: function (e) {
    var arrow = this.$el.find('.glyphicon');
    if (arrow.hasClass('glyphicon-triangle-top')) {
      arrow.removeClass('glyphicon-triangle-top');
      arrow.addClass('glyphicon-triangle-bottom');
    } else {
      arrow.removeClass('glyphicon-triangle-bottom');
      arrow.addClass('glyphicon-triangle-top');
    }
  },
  toggleChildren: function (e) {
    this.$el.nextUntil('.member').toggle(200, 'linear'); 
  }
});

module.exports = MemberView;
