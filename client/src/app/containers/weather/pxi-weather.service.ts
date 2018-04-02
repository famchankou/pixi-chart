declare var Pusher: any;
import { Http, Response } from "@angular/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/Rx";
import "rxjs/add/operator/map";
import "rxjs/add/operator/share";

import { PxiWeather } from "./pxi-weather";
import { PxiWeatherConfig } from "./pxi-weather.config";

@Injectable()
export class PxiWeatherService {
    public pusher: any;

    public _messages: BehaviorSubject<PxiWeather> = new BehaviorSubject(new PxiWeather());
    public messages: Observable<PxiWeather> = this._messages.asObservable();

    public constructor(private http: Http) {
        this.initWeatherPusher();
        this.startWeatherSubscribtion();
        this.updateWeatherData();
    }

    public startWeatherSubscribtion(): void {
        let channel = this.pusher.subscribe("london-temp-chart");
        channel.bind("new-temperature", (data: any) => {
            this._messages.next(new PxiWeather({ time: data.dataPoint.time, temperature: data.dataPoint.temperature }));
        });
    }

    public initWeatherPusher(): void {
        this.pusher = new Pusher(PxiWeatherConfig.apiKey, {
            cluster: "eu",
            encrypted: true
        });
        this.pusher.logToConsole = true;
    }

    public getRandomInt(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    public updateWeatherData(): void {
        let dummyTime = 1500;
        setInterval(() => {
            dummyTime = dummyTime + 10;
            let url: string = PxiWeatherConfig.addApiUrl + "?temperature=" + this.getRandomInt(10, 20) + "&time=" + dummyTime;
            this.getWithCallback(url, (data) => {
                // console.log(data);
            });
        }, 2000);
    }

    public preloadDataSet(): Observable<any> {
        return this.http.get(PxiWeatherConfig.getApiUrl).map((response: Response) => response.json());
    }

    public getWithCallback(url: string, callback: (data: any) => void): void {
        this.http.get(url)
            .map((response: Response) => response.json())
            .subscribe((data: any) => {
                callback(data);
            });
    }

}
