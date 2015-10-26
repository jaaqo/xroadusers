var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone'); Backbone.$ = $;

var Member = require('../models/member.js');

var Members = Backbone.Collection.extend({
  url: '/all',
  model: function (attrs, options) {
    return new Member(attrs, {parse: true});
  }
});

module.exports = Members;
