/* global gadgets, RiseVision */

(function (window, document, gadgets) {
  "use strict";

  var prefs = new gadgets.Prefs(),
    id = prefs.getString("id");

  // Disable context menu (right click menu)
  window.oncontextmenu = function () {
    return false;
  };

  function play() {
    RiseVision.EmbedHTML.play();
  }

  function pause() {
    RiseVision.EmbedHTML.pause();
  }

  function stop() {
    RiseVision.EmbedHTML.stop();
  }

  if (id && id !== "") {
    gadgets.rpc.register("rscmd_play_" + id, play);
    gadgets.rpc.register("rscmd_pause_" + id, pause);
    gadgets.rpc.register("rscmd_stop_" + id, stop);

    gadgets.rpc.register("rsparam_set_" + id, RiseVision.EmbedHTML.setParams);
    gadgets.rpc.call("", "rsparam_get", null, id, ["additionalParams"]);
  }

})(window, document, gadgets);


