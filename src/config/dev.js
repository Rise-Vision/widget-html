/* global config: true */
/* exported config */

var config = {
  // variables go here
};

if ( typeof angular !== "undefined" ) {
  angular.module( "risevision.common.i18n.config", [] )
    .constant( "LOCALES_PREFIX",
      "components/rv-common-i18n/dist/locales/translation_" )
    .constant( "LOCALES_SUFIX", ".json" );
}
