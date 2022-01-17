import { HttpClient } from "@angular/common/http";
import { Injectable, Compiler } from "@angular/core";
import { catchError, map } from "rxjs/operators";

import * as AngularCore from "@angular/core";
import * as AngularCommon from "@angular/common";
import * as AngularRouter from "@angular/router";
import * as BrowserAnimations from "@angular/platform-browser/animations";
import * as AngularForms from "@angular/forms";
import * as Bootstrap from "@ng-bootstrap/ng-bootstrap";
import * as AngularCompiler from "@angular/compiler";
import { Observable, throwError, of, shareReplay } from "rxjs";
import * as Rx from "rxjs";

import { externals } from "./externals";

declare var SystemJS: any;

@Injectable({
  providedIn: "root",
})
export class ModuleLoaderServiceService {
  source = `http://${window.location.host}/`;
  constructor(private compiler: Compiler, private httpClient: HttpClient) {
    console.log("SOURCE", this.source);
    console.log("COMPILER", compiler);
  }

  loadModules(): Observable<any> {
    const apps = [
      {
        path: "module-e",
        location: "assets/moduloe.umd.js",
        moduleName: "ModuloeModule",
        description: "Modulo de pruebas",
        registered: true,
      },
      {
        path: "library-ext",
        location: "assets/library-ext.umd.js",
        moduleName: "LibraryExtModule",
        description: "Librería externa creada en otro entorno",
        registered: true,
      },
      {
        path: "",
        location: "assets/test.umd.js",
        moduleName: "TestModuleModule",
        description: "Librería externa creada en otro entorno",
        registered: true,
      },
    ];

    return this.httpClient.get(this.source + "assets/modules.json").pipe(
      shareReplay(1),
      map((modulesData: any[]) => {
        return modulesData;
      }),
      catchError((error: Response) => {
        console.log(error);
        return throwError("Fallo al leer los modulesData");
      })
    );
  }

  loadModuleSystemJS(moduleInfo: any): Promise<any> {
    const url = this.source + moduleInfo.location;
    console.log("AngularCore", AngularCore);
    // SystemJS.set("@angular/core", SystemJS.newModule(AngularCore));
    // SystemJS.set("@angular/common", SystemJS.newModule(AngularCommon));
    // SystemJS.set("@angular/router", SystemJS.newModule(AngularRouter));
    // SystemJS.set(
    //   "@angular/platform-browser/animations",
    //   SystemJS.newModule(BrowserAnimations)
    // );
    // SystemJS.set("@angular/forms", SystemJS.newModule(AngularForms));
    // SystemJS.set("@angular/compiler", SystemJS.newModule(AngularCompiler));
    // SystemJS.set("rxjs", SystemJS.newModule(Rx));
    // SystemJS.set("@ng-bootstrap/ng-bootstrap", SystemJS.newModule(Bootstrap));

    of(...externals)
      .pipe(Rx.delay(100))
      .subscribe(({ packageName, module }) => {
        console.log(packageName, module);
        SystemJS.set(packageName, SystemJS.newModule(module));
      });

    // now, import the new module
    return new Promise<any>((resolve, reject) => {
      return SystemJS.import(`${url}`)
        .then((module) => {
          return this.compiler
            .compileModuleAndAllComponentsAsync(
              module[`${moduleInfo.moduleName}`]
            )
            .then((compiled) => {
              resolve({ exports: module, info: moduleInfo });
            });
        })
        .catch((err) => {
          resolve({ exports: null, info: null });
        });
    });
  }
}
