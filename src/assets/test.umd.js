(function (global, factory) {
  typeof exports === "object" && typeof module !== "undefined"
    ? factory(exports, require("@angular/core"), require("@angular/router"))
    : typeof define === "function" && define.amd
    ? define(
        "test-module",
        ["exports", "@angular/core", "@angular/router"],
        factory
      )
    : ((global = global || self),
      factory((global["test-module"] = {}), global.ng.core, global.ng.router));
})(this, function (exports, core, router) {
  "use strict";

  var TestModuleService = /** @class */ (function () {
    function TestModuleService() {}
    TestModuleService.ɵfac = function TestModuleService_Factory(t) {
      return new (t || TestModuleService)();
    };
    TestModuleService.ɵprov = core.ɵɵdefineInjectable({
      token: TestModuleService,
      factory: TestModuleService.ɵfac,
      providedIn: "root",
    });
    return TestModuleService;
  })();
  /*@__PURE__*/ (function () {
    core.ɵsetClassMetadata(
      TestModuleService,
      [
        {
          type: core.Injectable,
          args: [
            {
              providedIn: "root",
            },
          ],
        },
      ],
      function () {
        return [];
      },
      null
    );
  })();

  var TestModuleComponent = /** @class */ (function () {
    function TestModuleComponent() {}
    TestModuleComponent.prototype.ngOnInit = function () {
      console.log("testing");
    };
    TestModuleComponent.ɵfac = function TestModuleComponent_Factory(t) {
      return new (t || TestModuleComponent)();
    };
    TestModuleComponent.ɵcmp = core.ɵɵdefineComponent({
      type: TestModuleComponent,
      selectors: [["tm-test-module"]],
      decls: 2,
      vars: 0,
      template: function TestModuleComponent_Template(rf, ctx) {
        if (rf & 1) {
          core.ɵɵelementStart(0, "p");
          core.ɵɵtext(1, "test-module works! I hope");
          core.ɵɵelementEnd();
        }
      },
      encapsulation: 2,
    });
    return TestModuleComponent;
  })();
  /*@__PURE__*/ (function () {
    core.ɵsetClassMetadata(
      TestModuleComponent,
      [
        {
          type: core.Component,
          args: [
            {
              selector: "tm-test-module",
              template: " <p>test-module works! I hope</p> ",
              styles: [],
            },
          ],
        },
      ],
      function () {
        return [];
      },
      null
    );
  })();

  var TestModuleModule = /** @class */ (function () {
    function TestModuleModule() {}
    TestModuleModule.ɵmod = core.ɵɵdefineNgModule({ type: TestModuleModule });
    TestModuleModule.ɵinj = core.ɵɵdefineInjector({
      factory: function TestModuleModule_Factory(t) {
        return new (t || TestModuleModule)();
      },
      imports: [
        [
          router.RouterModule.forChild([
            { path: "", component: TestModuleComponent },
          ]),
        ],
        router.RouterModule,
      ],
    });
    return TestModuleModule;
  })();
  (function () {
    (typeof ngJitMode === "undefined" || ngJitMode) &&
      core.ɵɵsetNgModuleScope(TestModuleModule, {
        declarations: [TestModuleComponent],
        imports: [router.RouterModule],
        exports: [TestModuleComponent, router.RouterModule],
      });
  })();
  /*@__PURE__*/ (function () {
    core.ɵsetClassMetadata(
      TestModuleModule,
      [
        {
          type: core.NgModule,
          args: [
            {
              declarations: [TestModuleComponent],
              imports: [
                router.RouterModule.forChild([
                  { path: "", component: TestModuleComponent },
                ]),
              ],
              exports: [TestModuleComponent, router.RouterModule],
            },
          ],
        },
      ],
      null,
      null
    );
  })();

  exports.TestModuleComponent = TestModuleComponent;
  exports.TestModuleModule = TestModuleModule;
  exports.TestModuleService = TestModuleService;

  Object.defineProperty(exports, "__esModule", { value: true });
});
//# sourceMappingURL=test-module.umd.js.map
