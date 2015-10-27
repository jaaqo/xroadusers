var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone'); Backbone.$ = $;

var Members = require('../collections/members.js');
var MemberView = require('./member.js');
var ChildView = require('./child.js');
var Filters = require('../models/filters');
var FiltersView = require('./filters.js');

var AllView = Backbone.View.extend({
  el: '.members-table-body',
  initialize: function () {
    this.listenTo(this.collection, 'change reset add remove', this.render);

    // Init filters
    this.filters = new Filters();
    var filtersView = new FiltersView({ model: this.filters });
    filtersView.render();

    this.listenTo(this.filters, 'change reset add remove', this.render);

    // Init data
    var initialMembers = $('.table').attr('data-members');
    this.collection.reset(JSON.parse(initialMembers));
  },
  render: function () {
    this.$el.empty();
    var sorted = this.collection.sortBy(function (m) { return m.get('name').toLowerCase(); });
    var filtered = this.filterCollection(sorted);

    var all = 0;

    if (this.filters.get('name') === '' && 
        this.filters.get('memberClass') === '' &&
        this.filters.get('memberCode') === '') {
      all = sorted.length + sorted.reduce(function (all, member) { return all + member.children.length; }, 0);
    } else {
      all = filtered.length + filtered.reduce(function (all, member) { return all + member.children.length; }, 0);
    }

    this.filters.set('total', all);

    filtered.forEach(function (member) {
      var that = this;
      var memberView = new MemberView({ model: member}); 
      this.$el.append(memberView.render().el);

      member.children.each(function (child) {
        var childView = new ChildView({ model: child });
        that.$el.append(childView.render().el);
      });

    }, this); 

    return this;
  },
  filterCollection: function (coll) {
    var that = this;

    function filter (arg) {
      return function (m) {
        if (that.filters.get(arg) === '') return true; 
        var re = new RegExp(that.filters.get(arg).toLowerCase());
        return re.test(m.get(arg).toLowerCase());
      };
    }

    var filtered = _.chain(coll)
                     .filter(filter('name'))
                     .filter(filter('memberClass'))
                     .filter(filter('memberCode'))
                     .filter(filter('subsystemCode'))
                     .value();
    return filtered;
  }
});

module.exports = AllView;
