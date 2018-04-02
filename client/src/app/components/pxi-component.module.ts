import { NgModule, ModuleWithProviders } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";

import { PxiLoaderComponent } from "./loader/pxi-loader.component";
import { PxiLoaderService } from "./loader/pxi-loader.service";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule
    ],
    declarations: [
        PxiLoaderComponent
    ],
    bootstrap: [],
    providers: [
        PxiLoaderService
    ],
    exports: [
        PxiLoaderComponent
    ]
})

export class PxiComponentModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: PxiComponentModule,
            providers: [PxiLoaderService]
        };
    }
}

export * from "./loader/pxi-loader.component";
export * from "./loader/pxi-loader.service";
