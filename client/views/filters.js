var $ = window.jQuery = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone'); Backbone.$ = $;
var BS = require('bootstrap');

_.templateSettings = {
    interpolate: /\{\{(.+?)\}\}/g,
    evaluate: /\{\%(.+?)\%\}/g
};

var FiltersView = Backbone.View.extend({
  el: '.members-table-head',
  events: {
    'click .filter-btn': 'showFilters' ,
    'click .reset-filter-btn': 'resetFilters' ,
    'keydown input': 'keyAction',
    'blur input': 'blurAction',
  },
  template: _.template($('#filters-template').html()),
  initialize: function () {
    this.listenTo(this.model, 'change', this.render); 
  },
  render: function () {
    this.$el.html(this.template(this.model.attributes));
    $('[data-toggle="tooltip"]').tooltip();
    return this;
  },
  showFilters: function (e) {
    var filtering = this.model.get('filtering');
    this.model.set('filtering', !filtering);
    this.render();
  },
  resetFilters: function (e) {
    this.model.set('name', ''); 
    this.model.set('memberClass', ''); 
    this.model.set('memberCode', ''); 
    this.model.set('objectType', ''); 
    this.model.set('subsystemCode', ''); 
  },
  keyAction: function (e) {
    var ENTER_KEY = 13;
    var input = $(e.currentTarget);

    if (e.which === ENTER_KEY) {
      this.setFilter(input);
    }
  },
  blurAction: function (e) {
    var that = this;
    var inputs = $('.filters input');
    
    _.each(inputs, function (i) {
      var input = $(i);
      that.setFilter(input);
    });
  },
  setFilter: function (input) {
    switch (input.attr('id')) {
      case 'name-input':
        this.model.set('name', input.val());
        break;
      case 'memberclass-input':
        this.model.set('memberClass', input.val());
        break;
      case 'membercode-input':
        this.model.set('memberCode', input.val());
        break;
      case 'objecttype-input':
        this.model.set('objectType', input.val());
        break;
      case 'subsystemcode-input':
        this.model.set('subsystemCode', input.val());
        break;
      default:
    }
  }
});

module.exports = FiltersView;
