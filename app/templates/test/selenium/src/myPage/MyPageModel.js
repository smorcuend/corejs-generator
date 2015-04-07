'use strict';

var seleniumUtils = require('grunt-corejs-build/lib/selenium/common.js'),
    _ = require('underscore');

function MyPageModel(driver) {
    this.driver = driver;

    this.ui = {
        // UI Elements
        // element1: ''
    };

    this.locators = {
        // UI locators
        // element1: {xpath/id/css: 'locator'}
    };
}

MyPageModel.prototype.getUI = function() {

    var that = this,
        promises = [];

    _.each(_.values(that.locators), function(value) {
        promises.push(that.driver.findElement(value));
    });

    return seleniumUtils.webdriver.promise.all(promises).then(function(elements) {
        // UI Elements assignment
    });
};

/**
 * Other model functions
 */

module.exports = MyPageModel;