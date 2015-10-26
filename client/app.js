var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone'); Backbone.$ = $;

var Members = require('./collections/members.js');
var AllView = require('./views/all.js');

var members = new Members();
var allView = new AllView({collection: members});


$(document).ready(function () {
    allView.render();
});
