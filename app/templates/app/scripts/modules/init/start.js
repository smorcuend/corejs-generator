'use strict';
/* global define */
define([
    'corejs/app'
], function(app) {

    /**
     * This module defines custom initialization tasks
     * like defining app regions
     */
    app.addRegions({
        main: '[data-region="main"]'
    });

    app.addInitializer(function() {});
});
