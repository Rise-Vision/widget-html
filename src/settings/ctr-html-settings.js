angular.module("risevision.widget.html.settings")
  .controller("htmlSettingsController", ["$scope", "$log",
    function ($scope, $log) {

      $scope.aceLoaded = function(_editor){

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
      };

    }])
  .value("defaultSettings", {
    params: {},
    additionalParams: {}
  });
