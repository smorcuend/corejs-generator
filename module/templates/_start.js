'use strict';
/* global define */
define([
    'corejs/app',

    'modules/<%- moduleName %>/dispatcher'

], function(app) {

    var Module = app.module('<%- moduleName %>', function(Module) {

        var dispatcher = new Module.Dispatcher();

        app.on('before:start', function() {

            dispatcher.start();

        });

    });

    return Module;

});
