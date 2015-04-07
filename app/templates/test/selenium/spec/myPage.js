/* global describe, it, beforeEach, afterEach */
'use strict';

var seleniumUtils = require('grunt-corejs-build/lib/selenium/common.js');

describe('Page tests spec', function () {

    this.timeout(40000);
    this.slow(20000);

    var driver,
        TIMEOUT = 10000;

    beforeEach(function () {
        driver = seleniumUtils.getDriver();
        driver.setDefaultTimeout(TIMEOUT);
        driver.manage().window().maximize();
    });

    afterEach(function (done) {
        driver.quit().thenFinally(done.bind(this));
    });

    it('Example test spec', function (done) {
        // Example spec
    });
});
