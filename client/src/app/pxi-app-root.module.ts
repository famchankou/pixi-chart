import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";

import { pxiAppRoutes } from "./pxi-app-root.routes";
import { PxiAppRootComponent } from "./pxi-app-root.component";
import { PxiComponentModule } from "./components/pxi-component.module";
import { PxiContainerModule } from "./containers/pxi-container.module";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot(pxiAppRoutes),
        PxiContainerModule,
        PxiComponentModule.forRoot()
    ],
    declarations: [
        PxiAppRootComponent,
    ],
    bootstrap: [
        PxiAppRootComponent
    ],
    providers: []
})

export class PxiAppModule { }
