'use strict';

var model = require('./MyPageModel.js');

function MyPage(driver) {
    this.driver = driver;
    this.model = new model(driver);
}

MyPage.prototype.exampleFunction = function (account) {
    // exampleFunction implementation
};

/**
 * Other page functions
 */

module.exports = MyPage;
