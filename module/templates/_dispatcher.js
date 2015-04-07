'use strict';
/* global define */
define([
    'corejs/app',
    'backbone.marionette',

    'modules/<%- moduleName %>/models',

    'modules/<%- moduleName %>/controller',

    'modules/<%- moduleName %>/layouts/twoRows'

], function(app, Marionette, myModel, Controller, TwoRowsLayout) {

    var Module = app.module('<%- moduleName %>', function(Module) {

        Module.Dispatcher = Marionette.Dispatcher.extend({

            // Module Controller
            Controller: Controller,

            // Router handlers
            routes: {
                'book/:id': 'handlerBook',
                'book/:title/:id': 'handlerBook'
            },

            // listen global app.vent
            events: {
                'show:books:related': 'handlerListRelateds'
            },

            // listen global app.commands
            commands: {
                'some:action': 'handlerSomeAction'
            },

            // Add objects to factory
            factory: {
                'MyModelName': myModel,
                'TwoRowsLayout': TwoRowsLayout
            },

            handlerBook: function(id) {
                this.controller.showBook(id);
            },

            handlerListRelateds: function() {
                this.controller.showBookRelateds();
            },

            handlerSomeAction: function() {
                this.controller.SomeAction();
            }
        });

    });

    return Module.Dispatcher;
});
