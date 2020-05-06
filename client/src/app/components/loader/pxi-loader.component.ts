import { Component, OnInit, OnDestroy, Input, ViewEncapsulation } from "@angular/core";
import { PxiLoaderService } from "./pxi-loader.service";
import { Subscription } from "rxjs/Subscription";

@Component({
    selector: "pxi-loader",
    template: require("./pxi-loader.html"),
    encapsulation: ViewEncapsulation.None
})

export class PxiLoaderComponent implements OnDestroy {

    private _template = `<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>`;
    private _loadingText = "";
    private _threshold = 500;
    private _zIndex = 9999;
    
    @Input() public set zIndex(value: number) { this._zIndex = value; }
    @Input() public set template(value: string) { this._template = value; }
    @Input() public set loadingText(value: string) { this._loadingText = value; }
    @Input() public set threshold(value: number) { this._threshold = value; }

    public get zIndex(): number { return this._zIndex; }
    public get template(): string { return this._template; }
    public get loadingText(): string { return this._loadingText; }
    public get threshold(): number { return this._threshold; }
    
    public subscription: Subscription;
    public showSpinner = false;

    public constructor(private spinnerService: PxiLoaderService) {
        this.createServiceSubscription();
    }
    
    public ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    
    public createServiceSubscription() {
        let timer: any;

        this.subscription =
            this.spinnerService.getMessage().subscribe((show: boolean) => {
            if (show) {
                if (timer) {
                    return;
                }
                timer = setTimeout(function () {
                    timer = null;
                    this.showSpinner = show;
                }.bind(this), this.threshold);
            } else {
                if (timer) {
                    clearTimeout(timer);
                    timer = null;
                }
                this.showSpinner = false;
            }
        });
    }
}
