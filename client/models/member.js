var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone'); Backbone.$ = $;

var Child = require('./child.js');
var Children = require('../collections/children.js');

var Member = Backbone.Model.extend({

  constructor: function () {
    this.children = new Children({ model: Child }); 
    Backbone.Model.apply(this, arguments);
  },

  defaults: {
    name: '',
    memberClass: '',
    memberCode: '',
    objectType: '',
    xRoadInstance: '',
    children: []
  },

  parse: function (data, options) {
    this.children.reset(data.children);
    return data; 
  }



});

module.exports = Member;
