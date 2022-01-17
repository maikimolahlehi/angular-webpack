(function (global, factory) {
  typeof exports === "object" && typeof module !== "undefined"
    ? factory(exports, require("@angular/core"), require("@angular/router"))
    : typeof define === "function" && define.amd
    ? define(
        "moduloe",
        ["exports", "@angular/core", "@angular/router"],
        factory
      )
    : ((global = global || self),
      factory((global.moduloe = {}), global.ng.core, global.ng.router));
})(this, function (exports, core, router) {
  "use strict";

  var ModuloeService = /** @class */ (function () {
    function ModuloeService() {
      this.elem = "casa";
    }
    ModuloeService.ɵfac = function ModuloeService_Factory(t) {
      return new (t || ModuloeService)();
    };
    ModuloeService.ɵprov = core.ɵɵdefineInjectable({
      token: ModuloeService,
      factory: ModuloeService.ɵfac,
      providedIn: "root",
    });
    return ModuloeService;
  })();
  /*@__PURE__*/ (function () {
    core.ɵsetClassMetadata(
      ModuloeService,
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

  var ModuloeComponent = /** @class */ (function () {
    function ModuloeComponent() {}
    ModuloeComponent.prototype.ngOnInit = function () {};
    ModuloeComponent.ɵfac = function ModuloeComponent_Factory(t) {
      return new (t || ModuloeComponent)();
    };
    ModuloeComponent.ɵcmp = core.ɵɵdefineComponent({
      type: ModuloeComponent,
      selectors: [["riveroreyes-moduloe"]],
      decls: 2,
      vars: 0,
      template: function ModuloeComponent_Template(rf, ctx) {
        if (rf & 1) {
          core.ɵɵelementStart(0, "p");
          core.ɵɵtext(1, " moduloe works! ");
          core.ɵɵelementEnd();
        }
      },
      encapsulation: 2,
    });
    return ModuloeComponent;
  })();
  /*@__PURE__*/ (function () {
    core.ɵsetClassMetadata(
      ModuloeComponent,
      [
        {
          type: core.Component,
          args: [
            {
              selector: "riveroreyes-moduloe",
              template: "\n    <p>\n      moduloe works!\n    </p>\n  ",
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

  var ModuloeListComponent = /** @class */ (function () {
    function ModuloeListComponent() {}
    ModuloeListComponent.prototype.ngOnInit = function () {};
    ModuloeListComponent.ɵfac = function ModuloeListComponent_Factory(t) {
      return new (t || ModuloeListComponent)();
    };
    ModuloeListComponent.ɵcmp = core.ɵɵdefineComponent({
      type: ModuloeListComponent,
      selectors: [["riveroreyes-moduloe-list"]],
      decls: 2,
      vars: 0,
      template: function ModuloeListComponent_Template(rf, ctx) {
        if (rf & 1) {
          core.ɵɵelementStart(0, "p");
          core.ɵɵtext(1, "moduloe-list works!");
          core.ɵɵelementEnd();
        }
      },
      styles: [""],
    });
    return ModuloeListComponent;
  })();
  /*@__PURE__*/ (function () {
    core.ɵsetClassMetadata(
      ModuloeListComponent,
      [
        {
          type: core.Component,
          args: [
            {
              selector: "riveroreyes-moduloe-list",
              templateUrl: "./moduloe-list.component.html",
              styleUrls: ["./moduloe-list.component.css"],
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

  var routes = [
    { path: "list", component: ModuloeListComponent },
    { path: "", redirectTo: "", pathMatch: "full" },
  ];
  var ModuloeModule = /** @class */ (function () {
    function ModuloeModule() {}
    ModuloeModule.ɵmod = core.ɵɵdefineNgModule({ type: ModuloeModule });
    ModuloeModule.ɵinj = core.ɵɵdefineInjector({
      factory: function ModuloeModule_Factory(t) {
        return new (t || ModuloeModule)();
      },
      imports: [[router.RouterModule.forChild(routes)], router.RouterModule],
    });
    return ModuloeModule;
  })();
  (function () {
    (typeof ngJitMode === "undefined" || ngJitMode) &&
      core.ɵɵsetNgModuleScope(ModuloeModule, {
        declarations: [ModuloeComponent, ModuloeListComponent],
        imports: [router.RouterModule],
        exports: [ModuloeComponent, router.RouterModule],
      });
  })();
  /*@__PURE__*/ (function () {
    core.ɵsetClassMetadata(
      ModuloeModule,
      [
        {
          type: core.NgModule,
          args: [
            {
              declarations: [ModuloeComponent, ModuloeListComponent],
              imports: [router.RouterModule.forChild(routes)],
              exports: [ModuloeComponent, router.RouterModule],
            },
          ],
        },
      ],
      null,
      null
    );
  })();

  exports.ModuloeComponent = ModuloeComponent;
  exports.ModuloeModule = ModuloeModule;
  exports.ModuloeService = ModuloeService;

  Object.defineProperty(exports, "__esModule", { value: true });
});
//# sourceMappingURL=moduloe.umd.js.map
