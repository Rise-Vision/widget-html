/* global gadgets */

var RiseVision = RiseVision || {};

RiseVision.EmbedHTML = {};

RiseVision.EmbedHTML = ( function( document, gadgets ) {

  "use strict";

  // private variables
  var _prefs = null,
    _html = "",
    _htmlInjected = false;

  function _ready() {
    gadgets.rpc.call( "", "rsevent_ready", null, _prefs.getString( "id" ), true, true, true, true, true );
  }

  function _logConfiguration() {
    var configParams = {
      "event": "configuration",
      "event_details": _html ? _html : null
    };

    _logEvent( configParams, { severity: "info", debugInfo: JSON.stringify( configParams ) } );
  }

  function _configureFrame() {
    var container = document.getElementById( "html-container" ),
      frame = document.getElementById( "html-frame" ),
      aspectRatio = ( _prefs.getInt( "rsH" ) / _prefs.getInt( "rsW" ) ) * 100;

    // set the padding-bottom with the aspect ratio % (responsive)
    if ( container ) {
      container.setAttribute( "style", "padding-bottom:" + aspectRatio + "%" );
    }

    if ( frame ) {
      frame.setAttribute( "scrolling", "yes" );
    }
  }

  function _injectHTML() {
    var frame = document.getElementById( "html-frame" );

    if ( frame ) {
      frame.contentWindow.document.open();
      frame.contentWindow.document.write( _html );
      frame.contentWindow.document.close();

      _htmlInjected = true;
    }
  }

  function _removeHTML() {
    var frame = document.getElementById( "html-frame" );

    if ( frame ) {
      frame.contentWindow.document.open();
      frame.contentWindow.document.write( "" );
      frame.contentWindow.document.close();

      _htmlInjected = false;
    }
  }

  function getTableName() {
    return "html_events";
  }

  function _logEvent( params, endpointLoggingFields ) {
    if ( endpointLoggingFields ) {
      endpointLoggingFields.eventApp = "widget-html";
    }

    RiseVision.Common.LoggerUtils.logEvent( getTableName(), params, endpointLoggingFields );
  }

  function _pause() {
    _removeHTML();
  }

  function _play() {
    if ( !_htmlInjected ) {
      _injectHTML();
    }
  }

  function _stop() {
    _removeHTML();
  }

  function _setParams( value ) {
    _prefs = new gadgets.Prefs();

    _configureFrame();

    if ( value && value.hasOwnProperty( "html" ) ) {
      _html = value.html;
    }

    _logConfiguration();
    _ready();
  }

  return {
    setParams: _setParams,
    pause: _pause,
    play: _play,
    stop: _stop
  };

} )( document, gadgets );
