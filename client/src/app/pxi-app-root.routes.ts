import { Routes } from "@angular/router";
import { PxiWeatherComponent } from "./containers/weather/pxi-weather.component";

export const pxiAppRoutes: Routes = [
    {
        path: '',
        redirectTo: '/weather',
        pathMatch: 'full'
    },
    {
        path: 'weather',
        component: PxiWeatherComponent
    }
];
