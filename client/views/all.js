var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone'); Backbone.$ = $;

var Members = require('../collections/members.js');
var MemberView = require('./member.js');
var ChildView = require('./child.js');

var AllView = Backbone.View.extend({
  el: '.members-table-body',
  initialize: function () {
    this.listenTo(this.collection, 'change reset add remove', this.render);
    var initialMembers = $('.table').attr('data-members');
    this.collection.reset(JSON.parse(initialMembers));
  },
  render: function () {
    this.$el.empty();
    var sorted = this.collection.sortBy(function (m) { return m.get('name').toLowerCase(); });

    sorted.forEach(function (member) {
      var that = this;
      var memberView = new MemberView({model: member}); 
      this.$el.append(memberView.render().el);

      member.children.each(function (child) {
        var childView = new ChildView({ model: child });
        that.$el.append(childView.render().el);
      });

    }, this); 

    return this;
  }
});

module.exports = AllView;
