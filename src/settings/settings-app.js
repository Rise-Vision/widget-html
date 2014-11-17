angular.module("risevision.widget.html.settings",
  ["risevision.widget.common",
    "risevision.widget.common.translate",
    "risevision.widget.common.widget-button-toolbar",
    "risevision.widget.common.tooltip"]);

angular.module("risevision.widget.common.translate", ["pascalprecht.translate"])
  .config(["$translateProvider", function ($translateProvider) {
    $translateProvider.useStaticFilesLoader({
      prefix: "locales/",
      suffix: "/translation.json"
    });
    $translateProvider.determinePreferredLanguage();
    if ($translateProvider.preferredLanguage().indexOf("en_") === 0) {
      //default to "en" on any of the English variants
      $translateProvider.preferredLanguage("en");
    }
  }]);
