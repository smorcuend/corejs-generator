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
        ],
        mocha: {
            exports: 'mocha'
        },
        'chai-as-promised': [
            'chai'
        ],
        testem: [
            'mocha',
            'chai'
        ]
    }
});

/* require test suite */
require([
        'jquery',
        'sinonjs',
        'mocha',
        'chai',
        'chai-as-promised',
        'spec/testSuite'
    ],
    function($, sinonjs, mocha, chai, chaiAsPromised, testSuite) {

        // testem load fails at simple mocha run, and ssuccess at testem run
        require(['testem'], function() {
            // console.debug('testem.success');
        }, function() {
            // console.debug('testem.error');
        });

        mocha.ui('bdd');
        mocha.reporter('html');

        chai.Assertion.includeStack = true;

        // https://github.com/chaijs/chai/issues/107
        var should = chai.should();
        window.expect = chai.expect;
        window.assert = chai.assert;

        chaiAsPromised.transferPromiseness = function(assertion, promise) {
            // This is all you get by default
            assertion.then = promise.then.bind(promise);
            assertion['finally'] = promise['finally'].bind(promise);
            assertion.done = promise.done.bind(promise);
            assertion['catch'] = promise['catch'].bind(promise);
        };

        chai.use(chaiAsPromised);

        /* on dom ready require all specs and run */
        $(function() {
            require(testSuite.specs, function() {

                if (window.mochaPhantomJS) {
                    mochaPhantomJS.run();
                } else {
                    mocha.run();
                }

            });
        });
    });
