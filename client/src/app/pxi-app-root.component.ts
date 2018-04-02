import { Component, OnInit } from "@angular/core";
import { PxiLoaderService } from "./components/pxi-component.module";

/**
 * Spinner Example:
 * <pxi-loader [threshold]="2000"
 *              [template]="template"
 *              [loadingText]="'Please wait...'"
 *              [zIndex]="9999"></pxi-loader>
 * 
 * template: string =`<img src="http://pa1.narvii.com/5722/2c617cd9674417d272084884b61e4bb7dd5f0b15_hq.gif" />`
 */

@Component({
    selector: "pxi-app-root",
    template: require("./pxi-app-root.html")
})

export class PxiAppRootComponent implements OnInit {

    public constructor(private spinnerService: PxiLoaderService) { }

    public ngOnInit (): void {
        // this.spinnerService.show();
        // this.spinnerService.hide();
    }

}
