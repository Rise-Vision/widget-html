casper.test.begin("HTML Widget - e2e Testing", function (test) {
  var system = require('system');
  var e2ePort = system.env.E2E_PORT || 8099;

  casper.options.waitTimeout = 1000;

  casper.start("http://localhost:"+e2ePort+"/src/widget-e2e.html",
    function () {
      test.assertTitle("HTML Widget");
    }
  );

  casper.then(function() {
    casper.test.comment("iframe is present");

    test.assertExists("#html-frame");
  });

  casper.withFrame(0, function() {
    casper.test.comment("iframe is showing content")

    this.test.assertSelectorExists(".test", "Should show div element");

    this.test.assertSelectorHasText(".test", "Hello World!");
  });

  casper.run(function() {
    test.done();
  });
});
