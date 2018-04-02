import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from "@angular/http";

import { PxiWeatherComponent } from "./weather/pxi-weather.component";
import { PxiWeatherChartComponent } from "./weather/pxi-weather-chart.component";
import { PxiAnimationComponent } from "./weather/pxi-animation.component";

import { PxiAnimationService } from './weather/pxi-animation.service';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        RouterModule,
        CommonModule
    ],
    declarations: [
        PxiWeatherComponent,
        PxiWeatherChartComponent,
        PxiAnimationComponent
    ],
    bootstrap: [],
    providers: [ ],
    exports: [
        PxiWeatherComponent,
        PxiWeatherChartComponent,
        PxiAnimationComponent
    ]
})

export class PxiContainerModule { }
