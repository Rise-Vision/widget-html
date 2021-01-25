/* global gadgets, RiseVision, version */

( function( window, document, gadgets ) {
  "use strict";

  var prefs = new gadgets.Prefs(),
    id = prefs.getString( "id" );

  // Disable context menu (right click menu)
  window.oncontextmenu = function() {
    return false;
  };

  function configure( names, values ) {
    var additionalParams,
      companyId = "",
      displayId = "";

    if ( Array.isArray( names ) && names.length > 0 && Array.isArray( values ) && values.length > 0 ) {
      // company id
      if ( names[ 0 ] === "companyId" ) {
        companyId = values[ 0 ];
      }

      // display id
      if ( names[ 1 ] === "displayId" ) {
        if ( values[ 1 ] ) {
          displayId = values[ 1 ];
        } else {
          displayId = "preview";
        }
      }

      // provide LoggerUtils the ids to use
      RiseVision.Common.LoggerUtils.setIds( companyId, displayId );
      RiseVision.Common.LoggerUtils.setVersion( version );
      RiseVision.Common.LoggerUtils.startEndpointHeartbeats( "widget-html" );

      // additional params
      if ( names[ 2 ] === "additionalParams" ) {
        additionalParams = JSON.parse( values[ 2 ] );

        RiseVision.EmbedHTML.setParams( additionalParams );
      }
    }
  }

  function play() {
    RiseVision.EmbedHTML.play();
  }

  function pause() {
    RiseVision.EmbedHTML.pause();
  }

  function stop() {
    RiseVision.EmbedHTML.stop();
  }

  if ( id && id !== "" ) {
    gadgets.rpc.register( "rscmd_play_" + id, play );
    gadgets.rpc.register( "rscmd_pause_" + id, pause );
    gadgets.rpc.register( "rscmd_stop_" + id, stop );

    gadgets.rpc.register( "rsparam_set_" + id, RiseVision.EmbedHTML.setParams );
    gadgets.rpc.register( "rsparam_set_" + id, configure );
    gadgets.rpc.call( "", "rsparam_get", null, id, [ "companyId", "displayId", "additionalParams" ] );
  }

} )( window, document, gadgets );


