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

    xit("Should apply default value in Ace editor", function () {
      /* The default HTML that gets applied in the controller via the $watch on settings.additionalParams.html doesn't
      get applied when running in these test scenarios. Not sure why.
       */
    });

    it("Should correctly save settings", function () {
      /* Using test input must be kept simple, no HTML tags. This is to avoid the test comparison never being equal
      due to the Ace Editor instance injecting ending HTML tags when it detects "</" being input.
       */
      var testInput = "Hello World",
        settings = {
          params: {},
          additionalParams:{
            html: testInput
          }
        };

      // add some text to the editor ( since default HTML doesn't get applied, see previous test above)
      element(by.css("textarea.ace_text-input")).sendKeys(testInput);

      // click save
      element(by.id("save")).click();

      expect(browser.executeScript("return window.result")).to.eventually.deep.equal(
        {
          'additionalParams': JSON.stringify(settings.additionalParams),
          'params': ''
        });
    });

  });

})();
