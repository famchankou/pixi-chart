import {
    Component,
    ViewChild,
    ElementRef,
    AfterViewInit,
    OnDestroy,
    OnChanges,
    Input,
    SimpleChanges,
    ChangeDetectionStrategy
} from "@angular/core";
import * as Highcharts from "highcharts";
import { PxiWeather } from "./pxi-weather";
import { PxiWeatherService } from "./pxi-weather.service";

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: "pxi-weather-chart",
    template: `<section #chartcontainer style="min-width: 310px; height: 400px; margin: 0 auto"></section>`
})

export class PxiWeatherChartComponent implements AfterViewInit, OnDestroy, OnChanges {

    @ViewChild("chartcontainer") chartElement: ElementRef;

    @Input() public preloadedData: any;

    private chart: any;
    private preloadedDataSet: Array<any> = [];

    private chartXAxisTitle: string = "Temperature per minute";
    private chartXAxisLegend: string = "Time";
    private chartYAxisLegend: string = "Temperature";

    private chartXAkisDateType: string = "datetime";

    public constructor(private weatherService: PxiWeatherService) { }

    public ngOnChanges(changes: SimpleChanges) {
        if (changes.preloadedData) {
            this.preloadedDataSet = changes.preloadedData.currentValue;
        }
    }

    public ngAfterViewInit() {
        let options: Highcharts.Options = this.initChartOptions();

        this.weatherService.messages.subscribe((data: PxiWeather) => {
            this.updateChartData(data);
        });

        if (this.chartElement && this.chartElement.nativeElement) {
            options.chart = {
                type: "spline",
                renderTo: this.chartElement.nativeElement,
                marginRight: 10,
                events: {
                    load: () => {
                        /* tslint:disable */
                        // Set up the updating of the chart each second
                        // var series = this.series[0];
                        // setInterval(function () {
                        //     var x = (new Date()).getTime(), // current time
                        //         y = Math.random();
                        //     series.addPoint([x, y], true, true);
                        // }, 3000);
                        /* tslint:enable */
                    }
                }
            };
            this.chart = new Highcharts.Chart(options);
        }
    }

    public initChartOptions(): Highcharts.Options {
        return {
            title: {
                text: this.chartXAxisTitle
            },
            xAxis: {
                type: this.chartXAkisDateType,
                tickPixelInterval: 150,
                title: {
                    text: this.chartXAxisLegend
                }
            },
            yAxis: {
                title: {
                    text: this.chartYAxisLegend
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: "#808080"
                }]
            },
            series: [{
                /* tslint:disable */
                name: "Weather Point",
                data: (function () {
                    let data = [];
                    let time = (new Date()).getTime();

                    for (let i = -19; i <= 0; i += 1) {
                        data.push({
                            x: time + i * 1000,
                            y: Math.floor(Math.random() * 10) + 0
                        });
                    }
                    return data;
                }())
                /* tslint:enable */
            }],
            // Renders HTML Template
            // tooltip: {
            //     formatter: () => {
            //         return "<b>" + "</b><br/>" + "<br/>";
            //     }
            // },
            credits: {
                enabled: false
            },
            legend: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
        };
    }

    public updateChartData(data?: PxiWeather): void {
        if (this.chart) {
            // console.log(`Time: ${data.time}, Temperature: ${data.temperature}`);
            this.chart["series"][0].addPoint([(new Date()).getTime(), data.temperature], true, true);
        }
    }

    public ngOnDestroy() {
        this.chart.destroy();
    }
}
