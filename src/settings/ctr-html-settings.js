angular.module("risevision.widget.html.settings")
  .controller("htmlSettingsController", ["$scope", "$log", "$templateCache",
    function ($scope, $log, $templateCache) {

      var initialLoad = true;

      $scope.defaultHTML = $templateCache.get("html5.html");

      $scope.aceLoaded = function(_editor){

        // Unsure as to why "onLoad" fires twice, preventing this logic happening twice with an initialLoad flag
        if (initialLoad) {
          var _session = _editor.getSession();

          // Options
          /* The worker is live syntax checking which is not required, however, it's also not usable due to the dependency
           file getting requested at run time in the Ace code. Hence, ensuring the session turns the creation
           of the worker off
           */
          _session.setUseWorker(false);

          // Events
          _session.on("change", function(){
            // TODO: may or may not need this
            $log.info("editor change!");
          });

          _session.setValue($scope.defaultHTML);

          initialLoad = false;
        }

      };

    }])
  .value("defaultSettings", {
    params: {},
    additionalParams: {}
  });
