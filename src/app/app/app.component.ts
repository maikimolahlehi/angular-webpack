import { Component, OnInit } from "@angular/core";
import { tap } from "rxjs";
import { ModuleLoaderServiceService } from "../services/module-loader-service.service";
import { RouterService } from "../services/router-service.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  installedModules$: any;
  errorMessage: string;
  errorVisible = false;

  constructor(
    private routerService: RouterService,
    private moduleService: ModuleLoaderServiceService
  ) {}

  ngOnInit(): void {
    // this.installedModules$ = this.moduleService.loadModules().pipe(
    //   tap((res) =>
    //     res.forEach((x) => {
    //       if (x.registered) {
    //         this.registerRoute(x);
    //         this.enableModule(x);
    //       }
    //     })
    //   )
    // );
  }

  private registerRoute(moduleToEnable: any) {
    this.moduleService.loadModuleSystemJS(moduleToEnable).then(
      (exports) => {
        this.routerService.createAndRegisterRoute(moduleToEnable, exports);
      },
      (err) =>
        this.showError(
          `${moduleToEnable.moduleName} could not be found, did you copy the umd file to ${moduleToEnable.location}?`,
          err
        )
    );
  }

  private showError(message: string, err) {
    this.errorMessage = message;
    this.errorVisible = true;
  }

  closeError() {
    this.errorVisible = false;
  }

  enableModule(moduleToEnable: any) {
    if (this.isRegistered(moduleToEnable)) {
      this.routerService.unRegisterRoute(moduleToEnable.path);
    } else {
      this.registerRoute(moduleToEnable);
    }
  }

  isRegistered(moduleData: any): boolean {
    return this.routerService.routeIsRegistered(moduleData.path);
  }
}
