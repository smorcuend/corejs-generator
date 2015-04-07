'use strict';
/* global define */
define([
    'corejs/app',

    'backbone.marionette'

], function(app, Marionette) {
    var Module = app.module('<%- moduleName %>', function(Module) {

        Module.Controller = Marionette.Controller.extend({

        });

    });
    return Module.Controller;
});
