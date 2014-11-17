/*jshint expr:true */
"use strict";

describe("HTML Settings", function () {

  var defaultSettings, $scope;

  beforeEach(module("risevision.widget.html.settings"));

  beforeEach(function(){
    inject(function($injector, $rootScope, $controller){
      defaultSettings = $injector.get("defaultSettings");
      $scope = $rootScope.$new();
      $controller("htmlSettingsController", {$scope: $scope});
    });
  });

  it("should define defaultSettings", function (){
    expect(defaultSettings).to.be.truely;
    expect(defaultSettings).to.be.an("object");
  });

});
