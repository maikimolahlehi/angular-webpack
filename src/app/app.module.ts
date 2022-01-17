import { APP_INITIALIZER, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app/app.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { RouterService } from "./services/router-service.service";
import { ModuleLoaderServiceService } from "./services/module-loader-service.service";
import {
  concatMap,
  delay,
  flatMap,
  from,
  mergeMap,
  Observable,
  of,
  tap,
  toArray,
} from "rxjs";

function initializeAppFactory(
  routerService: RouterService,
  moduleService: ModuleLoaderServiceService
): () => Observable<any> {
  return () =>
    moduleService.loadModules().pipe(
      concatMap((modules) => of(...modules)),
      concatMap((module) => from(moduleService.loadModuleSystemJS(module))),
      tap(({ info, exports }) => {
        if (info) {
          routerService.createAndRegisterRoute(info, exports);
        }
      }),
      delay(Math.random())
    );
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([], { useHash: true }),
    HttpClientModule,
  ],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeAppFactory,
      deps: [RouterService, ModuleLoaderServiceService],
      multi: true,
    },
  ],
})
export class AppModule {
  constructor() {}
}
