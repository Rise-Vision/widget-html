/* global config: true */
/* exported config */
/* jshint latedef: false */

if (typeof config === "undefined") {
  var config = {
    // variables go here
  };
}

if (typeof angular !== "undefined") {
  angular.module("risevision.common.i18n.config", [])
    .constant("LOCALES_PREFIX",
      "components/rv-common-i18n/dist/locales/translation_")
    .constant("LOCALES_SUFIX", ".json");
}

/* global gadgets */

var RiseVision = RiseVision || {};
RiseVision.EmbedHTML = {};

RiseVision.EmbedHTML = (function (document, gadgets) {

  "use strict";

  // private variables
  var _prefs = null,
    _html = "",
    _htmlInjected = false;

  function _ready() {
    gadgets.rpc.call("", "rsevent_ready", null, _prefs.getString("id"), true, true, true, true, true);
  }

  function _configureFrame() {
    var container = document.getElementById("html-container"),
      frame = document.getElementById("html-frame"),
      aspectRatio =  (_prefs.getInt("rsH") / _prefs.getInt("rsW")) * 100;

    // set the padding-bottom with the aspect ratio % (responsive)
    if (container) {
      container.setAttribute("style", "padding-bottom:" + aspectRatio + "%");
    }

    if (frame) {
      frame.setAttribute("scrolling", "yes");
    }
  }

  function _injectHTML() {
    var frame = document.getElementById("html-frame");

    if (frame) {
      frame.contentWindow.document.open();
      frame.contentWindow.document.write(_html);
      frame.contentWindow.document.close();

      _htmlInjected = true;
    }
  }

  function _removeHTML() {
    var frame = document.getElementById("html-frame");

    if (frame) {
      frame.contentWindow.document.open();
      frame.contentWindow.document.write("");
      frame.contentWindow.document.close();

      _htmlInjected = false;
    }
  }

  function _pause() {
    _removeHTML();
  }

  function _play() {
    if (!_htmlInjected) {
      _injectHTML();
    }
  }

  function _stop() {
    _removeHTML();
  }

  function _setParams(names, values) {
    var value;

    _prefs = new gadgets.Prefs();

    if (Array.isArray(names) && names.length > 0 && names[0] === "additionalParams") {
      if (Array.isArray(values) && values.length > 0) {
        value = JSON.parse(values[0]);

        _configureFrame();

        if (value && value.hasOwnProperty("html")) {
          _html = value.html;
        }

        _ready();
      }
    }
  }

  return {
    setParams: _setParams,
    pause: _pause,
    play: _play,
    stop: _stop
  };

})(document, gadgets);

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



/* jshint ignore:start */
var _gaq = _gaq || [];

_gaq.push(['_setAccount', 'UA-57092159-1']);
_gaq.push(['_trackPageview']);

(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();
/* jshint ignore:end */
