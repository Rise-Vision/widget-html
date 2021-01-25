/* jshint node: true */

(function () {
  "use strict";

  var gulp = require("gulp");
  var gutil = require("gulp-util");
  var rimraf = require("gulp-rimraf");
  var concat = require("gulp-concat");
  var bower = require("gulp-bower");
  var bump = require("gulp-bump");
  var eslint = require("gulp-eslint");
  var file = require("gulp-file");
  var minifyCSS = require("gulp-minify-css");
  var usemin = require("gulp-usemin");
  var uglify = require("gulp-uglify");
  var runSequence = require("run-sequence");
  var path = require("path");
  var rename = require("gulp-rename");
  var factory = require("widget-tester").gulpTaskFactory;
  var sourcemaps = require("gulp-sourcemaps");
  var html2js = require("gulp-html2js");

  var appJSFiles = [
    "src/**/*.js",
    "!./src/components/**/*"
  ];

  gulp.task("clean-dist", function () {
    return gulp.src("dist", {read: false})
      .pipe(rimraf());
  });

  gulp.task("clean-tmp", function () {
    return gulp.src("tmp", {read: false})
      .pipe(rimraf());
  });

  gulp.task("clean", ["clean-dist", "clean-tmp"]);

  gulp.task("config", function() {
    var env = process.env.NODE_ENV || "dev";
    gutil.log("Environment is", env);

    return gulp.src(["./src/config/" + env + ".js"])
      .pipe(rename("config.js"))
      .pipe(gulp.dest("./src/config"));
  });

  gulp.task("bump", function(){
    return gulp.src(["./package.json", "./bower.json"])
      .pipe(bump({type:"patch"}))
      .pipe(gulp.dest("./"));
  });

  gulp.task( "lint", function() {
    return gulp.src(appJSFiles)
      .pipe( eslint() )
      .pipe( eslint.format() )
      .pipe( eslint.failAfterError() );
  } );

  gulp.task("version", function () {
    var pkg = require("./package.json"),
      str = '/* exported version */\n' +
        'var version = "' + pkg.version + '";';

    return file("version.js", str, {src: true})
      .pipe(gulp.dest("./src/config/"));
  });

  gulp.task("html-templates", function() {
    return gulp.src("./src/settings/html-templates/*.html")
      .pipe(html2js({
        outputModuleName: "risevision.widget.html.settings",
        useStrict: true,
        base: "./src/settings/html-templates"
      }))
      .pipe(rename({extname: ".js"}))
      .pipe(gulp.dest("tmp/html-templates"));
  });

  gulp.task("source", ["html-templates", "lint"], function () {
    return gulp.src(['./src/settings.html', './src/widget.html'])
      .pipe(usemin({
        css: [minifyCSS()],
        js: [sourcemaps.init(), uglify(), sourcemaps.write()]
      }))
      .pipe(gulp.dest("dist/"));
  });

  gulp.task("unminify", function () {
    return gulp.src(['./src/settings.html', './src/widget.html'])
      .pipe(usemin({
        css: [rename(function (path) {
          path.basename = path.basename.substring(0, path.basename.indexOf(".min"))
        }), gulp.dest("dist")],
        js: [rename(function (path) {
          path.basename = path.basename.substring(0, path.basename.indexOf(".min"))
        }), gulp.dest("dist")]
      }))
  });

  gulp.task("fonts", function() {
    return gulp.src("src/components/common-style/dist/fonts/**/*")
      .pipe(gulp.dest("dist/fonts"));
  });

  gulp.task("images", function() {
    return gulp.src("src/components/rv-bootstrap-formhelpers/img/bootstrap-formhelpers-googlefonts.png")
      .pipe(gulp.dest("dist/img"));
  });

  gulp.task("i18n", function(cb) {
    return gulp.src(["src/components/rv-common-i18n/dist/locales/**/*"])
      .pipe(gulp.dest("dist/locales"));
  });

  gulp.task("bower-update", function (cb) {
    return bower({ cmd: "update"}).on("error", function(err) {
      console.log(err);
      cb();
    });
  });

  gulp.task("build", function (cb) {
    runSequence(["clean", "config", "bower-update", "version"], ["source", "fonts", "images", "i18n"], ["unminify"], cb);
  });

  gulp.task("html:e2e",
    factory.htmlE2E({
      files: ["./src/settings.html", "./src/widget.html"],
      e2eMockData: "../test/mock-data.js",
      mockLogger: "../node_modules/widget-tester/mocks/logger-mock.js"
    }));

  gulp.task("test:unit:settings", factory.testUnitAngular(
    {testFiles: [
      "src/components/jquery/dist/jquery.js",
      "src/components/q/q.js",
      "src/components/angular/angular.js",
      "src/components/angular-translate/angular-translate.js",
      "src/components/angular-translate-loader-static-files/angular-translate-loader-static-files.js",
      "src/components/angular-route/angular-route.js",
      "src/components/angular-mocks/angular-mocks.js",
      "node_modules/widget-tester/mocks/common-mock.js",
      "src/components/bootstrap-sass-official/assets/javascripts/bootstrap.js",
      "src/components/angular-bootstrap/ui-bootstrap-tpls.js",
      "src/components/widget-settings-ui-components/dist/js/**/*.js",
      "src/components/widget-settings-ui-core/dist/*.js",
      "src/components/bootstrap-form-components/dist/js/**/*.js",
      "src/components/ace-builds/src-noconflict/ace.js",
      "src/components/ace-builds/src-noconflict/mode-html.js",
      "src/components/ace-builds/src-noconflict/theme-chrome.js",
      "src/components/angular-ui-ace/ui-ace.js",
      "src/config/test.js",
      "src/settings/settings-app.js",
      "src/settings/**/*.js",
      "test/unit/settings/**/*spec.js"]}
  ));

  gulp.task("test:unit:widget", factory.testUnitAngular(
    {testFiles: [
      "src/components/jquery/dist/jquery.js",
      "node_modules/widget-tester/mocks/gadget-mocks.js",
      "node_modules/widget-tester/mocks/logger-mock.js",
      "test/mock-data.js",
      "src/components/widget-common/dist/config.js",
      "src/config/test.js",
      "src/config/version.js",
      "src/widget/embedHTML.js",
      "src/widget/main.js",
      "test/unit/widget/**/*spec.js"]}
  ));

  gulp.task("webdriver_update", factory.webdriveUpdate());
  gulp.task("e2e:server-close", factory.testServerClose());
  gulp.task("test:metrics", factory.metrics());

  gulp.task("e2e:server", ["config", "html:e2e"], factory.testServer());

  gulp.task("test:e2e:widget", factory.testE2E({
      testFiles: "test/e2e/widget-scenarios.js"}
  ));

  gulp.task("test:e2e:settings", ["webdriver_update"], factory.testE2EAngular({
      testFiles: "test/e2e/settings-scenarios.js"}
  ));

  gulp.task("test:e2e", function(cb) {
    runSequence(["html:e2e", "e2e:server"], "test:e2e:widget", "test:e2e:settings", "e2e:server-close", cb);
  });

  gulp.task("test:unit", function(cb) {
    runSequence("test:unit:widget", "test:unit:settings", cb);
  });

  gulp.task("test", function(cb) {
    runSequence("version", "test:unit", "test:e2e", "test:metrics", cb);
  });

  gulp.task("default", function(cb) {
    runSequence("test", "build", cb);
  });

})();
