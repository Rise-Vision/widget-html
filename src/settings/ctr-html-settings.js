angular.module("risevision.widget.html.settings")
  .controller("htmlSettingsController", ["$scope", "$log", "$templateCache",
    function ($scope, $log, $templateCache) {

      var aceLoadComplete = false,
        defaultHTML = $templateCache.get("html5.html"),
        editor, session;

      $scope.aceLoaded = function(_editor){

        // Unsure as to why "onLoad" fires twice, preventing this logic happening twice with an aceLoadComplete flag
        if (!aceLoadComplete) {
          editor = _editor;
          session = editor.getSession();

          // Options
          /* The worker is live syntax checking which is not required, however, it's also not usable due to the dependency
           file getting requested at run time in the Ace code. Hence, ensuring the session turns the creation
           of the worker off
           */
          session.setUseWorker(false);

          aceLoadComplete = true;
        }

      };

      $scope.$watch("settings.additionalParams.html", function (newUrl, oldUrl) {
        if (newUrl === "" && typeof oldUrl === "undefined") {
          // app has begun with no previously saved html
          $scope.settings.additionalParams.html = defaultHTML;
        }
      });

    }])
  .value("defaultSettings", {
    params: {},
    additionalParams: {
      html: ""
    }
  });
