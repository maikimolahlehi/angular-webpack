import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { AppModule } from "./app/app.module";
import { environment } from "./environments/environment";

if (environment.production) {
  enableProdMode();
  const fn = () => {};
  // tslint:disable-next-line: no-console
  console.debug = console.warn = console.error = console.log = fn;
  if (window) {
    window.console.log =
      window.console.debug =
      window.console.error =
      window.console.warn =
        fn;
  }
}

platformBrowserDynamic()
  .bootstrapModule(AppModule, { preserveWhitespaces: true })
  .then((ref) => {
    // tslint:disable-next-line: no-string-literal
    if (window["ngRef"]) {
      // tslint:disable-next-line: no-string-literal
      window["ngRef"].destroy();
    }
    // tslint:disable-next-line: no-string-literal
    window["ngRef"] = ref;
  })
  .catch((err) => console.error(err));
