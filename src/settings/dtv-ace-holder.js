angular.module("risevision.widget.html.settings")
  .directive("aceHolder", function () {
    return {
      restrict: "A",
      link: function ($scope, elem) {
        var $el = $(elem),
          $container = $($el.parent(".wrapper.container")),
          containerHeight = $container.height(),
          headerHeight = $($container.find(".modal-header")).outerHeight(true),
          commandsListHeight = $($container.find(".commands-list")).outerHeight(true);

        // update the height of the ace holder
        $el.css("height", containerHeight - headerHeight - commandsListHeight);
      }
    };
  });
