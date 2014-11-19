/* jshint expr: true */

(function () {
  "use strict";

  /* https://github.com/angular/protractor/blob/master/docs/getting-started.md */

  var chai = require("chai");
  var chaiAsPromised = require("chai-as-promised");

  chai.use(chaiAsPromised);
  var expect = chai.expect;

  browser.driver.manage().window().setSize(1024, 768);

  describe("HTML Settings - e2e Testing", function() {
    beforeEach(function () {
      browser.get("/src/settings-e2e.html");
    });

    it("Should load all components", function () {
      // spreadsheet controls component
      expect(element(by.id("editor")).isPresent()).
        to.eventually.be.true;

    });

    it("Save button should be enabled", function () {
      // save button should be enabled
      expect(element(by.css("button#save[disabled=disabled")).isPresent()).
        to.eventually.be.false;
    });


    xit("Should correctly save settings", function (done) {
      var settings = {
        params: {},
        additionalParams:{}
      };

      expect(browser.executeScript("return window.result")).to.eventually.deep.equal(
        {
          'additionalParams': JSON.stringify(settings.additionalParams),
          'params': ''
        });
    });

  });

})();
