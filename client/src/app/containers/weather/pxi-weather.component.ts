import { Component, OnInit, ChangeDetectionStrategy, NgZone } from "@angular/core";
import { PxiWeatherService } from "./pxi-weather.service";
import { PxiWeather } from "./pxi-weather";

@Component({
    changeDetection: ChangeDetectionStrategy.Default,
    selector: "pxi-weather",
    template: require("./pxi-weather.html"),
    providers: [PxiWeatherService]
})

export class PxiWeatherComponent implements OnInit {

    public weatherData: any;
    public preloadedWeatherData: any;
    public weatherTitle: string = "LONDON WEATHER";

    public constructor(private weatherService: PxiWeatherService, private ngZone: NgZone) { }

    public ngOnInit() {
        this.weatherService.preloadDataSet().subscribe((data: any) => {
            this.preloadedWeatherData = data;
        });

        this.ngZone.runOutsideAngular(() => {
            this.weatherService.messages.subscribe((data: PxiWeather) => {
                this.weatherData = new PxiWeather(data);
            });
        });

    }

}
