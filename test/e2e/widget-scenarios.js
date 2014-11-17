casper.test.begin("HTML Widget - e2e Testing", function (test) {
  var system = require('system');
  var e2ePort = system.env.E2E_PORT || 8099;

  casper.options.waitTimeout = 1000;

  casper.start("http://localhost:"+e2ePort+"/src/widget-e2e.html",
    function () {
      test.assertTitle("HTML Widget");
    }
  );

  // TODO: more eventual tests

  casper.run(function() {
    test.done();
  });
});
