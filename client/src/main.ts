import './main.less';

// import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { PxiAppModule } from "./app/pxi-app-root.module";

// if (__IS_PROD__) {
//     enableProdMode();
// }

let platform = platformBrowserDynamic();

platform.bootstrapModule(PxiAppModule);
