'use strict';
/* global require */
/* jshint camelcase:false */
require.config({
    deps: [
        'main'
    ],
    paths: {
        bower_components: '../bower_components/',
        corejs: '../bower_components/corejs/app/scripts',
        requirejs: '../bower_components/requirejs/require',
        jquery: '../bower_components/jquery/dist/jquery',
        underscore: '../bower_components/underscore/underscore',
        backbone: '../bower_components/backbone/backbone',
        'backbone.marionette': '../bower_components/backbone.marionette/lib/core/backbone.marionette',
        handlebars: '../bower_components/handlebars/handlebars',
        i18next: '../bower_components/i18next/i18next',
        moment: '../bower_components/moment/moment',
        numeral: '../bower_components/numeral/numeral',
        loglevel: '../bower_components/loglevel/dist/loglevel.min',
        q: '../bower_components/q/q',
        chai: '../bower_components/chai/chai',
        mocha: '../bower_components/mocha/mocha',
        sinonjs: '../bower_components/sinonjs/sinon'
    },
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
        handlebars: {
            exports: 'Handlebars'
        },
        'backbone.marionette': [
            'backbone'
        ],
        corejs: [
            'backbone.marionette'
        ],
        i18next: [
            'jquery'
        ]
    }
});
