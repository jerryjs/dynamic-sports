/*global describe: true, beforeEach: true, it: true, expect: true, module: true, inject: true, spyOn */
	describe("HomeCtrl", function () {
	  "use strict";
	  var scope, geoLocationService, fileService;

	  beforeEach(module("dynamic-sports"));

	  beforeEach(inject(function ($rootScope, $controller, _geoLocationService_, _fileService_) {
	    scope = $rootScope.$new();
	    geoLocationService = _geoLocationService_;
	    fileService = _fileService_;
	    $controller("HomeCtrl", {$scope: scope, geoLocationService: geoLocationService, fileService: fileService});
	  }));

	  describe("#recording() start", function () {

	    beforeEach(function () {
	      spyOn(geoLocationService, "start").andReturn("123456");
	      spyOn(fileService, "save");
	      scope.recording(true);
	    });

	    it("should start recording", function () {
	      expect(geoLocationService.start).toHaveBeenCalled();
	    });

	    it("should call the fileService.save method", function () {
	      var payload = {coords: {}, timestamp: "time-stamp-here"};
	      geoLocationService.start.mostRecentCall.args[0](payload);
	      expect(fileService.save).toHaveBeenCalled();
	    });
	  });

	  describe("#recording() stop", function () {

	    beforeEach(function () {
	      spyOn(geoLocationService, "stop");
	      scope.recording(false);
	    });

	    it("should stop recording if 'on' === false", function () {
	      expect(geoLocationService.stop).toHaveBeenCalled();
	    });
	  });
	});
