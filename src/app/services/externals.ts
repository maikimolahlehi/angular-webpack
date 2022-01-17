import * as AngularCore from "@angular/core";
import * as AngularCommon from "@angular/common";
import * as AngularRouter from "@angular/router";
import * as BrowserAnimations from "@angular/platform-browser/animations";
import * as AngularForms from "@angular/forms";
import * as Bootstrap from "@ng-bootstrap/ng-bootstrap";
import * as AngularCompiler from "@angular/compiler";
import * as Rx from "rxjs";

export const externals = [
  {
    packageName: "@angular/core",
    module: AngularCore,
  },
  {
    packageName: "@angular/common",
    module: AngularCommon,
  },
  {
    packageName: "@angular/platform-browser/animations",
    module: BrowserAnimations,
  },
  {
    packageName: "@angular/router",
    module: AngularRouter,
  },
  {
    packageName: "@angular/forms",
    module: AngularForms,
  },
  {
    packageName: "@angular/core",
    module: Bootstrap,
  },
  {
    packageName: "@angular/compiler",
    module: AngularCompiler,
  },
  {
    packageName: "rxjs",
    module: Rx,
  },
];
