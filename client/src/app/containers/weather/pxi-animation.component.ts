import { Component, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import * as PIXI from 'pixi.js';
import { PxiAnimationService } from './pxi-animation.service';

import { PxiWeather } from "./pxi-weather";
import { PxiWeatherService } from "./pxi-weather.service";

@Component({
    selector: 'pxi-animation',
    template: require("./pxi-animation.html"),
    providers: [PxiAnimationService]
})

export class PxiAnimationComponent implements AfterViewInit {

    private app: PIXI.Application = new PIXI.Application(1217, 450, {
        antialias: true,
        backgroundColor: 0xFFFFFF,
    });

    public constructor(
        private renderer: Renderer2,
        private el: ElementRef,
        private greenLightService: PxiAnimationService,
        private formBuilder: FormBuilder,
        private weatherService: PxiWeatherService
    ) {
        this.renderer.appendChild(this.el.nativeElement, this.app.view);
    }

    public ngAfterViewInit(): void {
        this.initChartGrid();
        this.initVerticalLegend();
        this.initHorizontalLegend();
        this.initChart();
    }

    public initCoordsGrtid(): void {
        let graphics: Array<Array<PIXI.Graphics>> = [];
        for (let j = 0; j < 20; j++) {
            graphics[j] = [];
            for (let i = 0; i < 40; i++) {
                graphics[j][i] = new PIXI.Graphics();
                graphics[j][i].beginFill(0xFF3300);
                graphics[j][i].lineStyle(1, 0xBFBFBF, 1);
                graphics[j][i].drawRect(0, 0, 1, 1);
                graphics[j][i].position.x = 40 * i;
                graphics[j][i].position.y = 40 * j;
                this.app.stage.addChild(graphics[j][i]);
            };
        };
    }

    public initChartGrid(): void {
        let containerHeight: number = this.app.renderer.height;
        let containerWidth: number = this.app.renderer.width;
        let gridStep: number = 60;
        let leftOffset: number = 65;
        let rightOffset: number = 10;
        let counter: number = 35;

        for (let step = 60; step <= containerHeight; step += gridStep) {
            let graphics: PIXI.Graphics = new PIXI.Graphics();

            this.addTemperatureLegendPoint(containerHeight, step, { leftOffset: leftOffset }, () => {
                return counter -= 5;
            });

            graphics.beginFill(0xFF3300);
            graphics.lineStyle(1, 0xD9D9D9, 1);
            graphics.moveTo(leftOffset, step);
            graphics.lineTo(containerWidth - rightOffset, step);
            graphics.endFill();
            this.app.stage.addChild(graphics);
        }
    }

    public addTemperatureLegendPoint(height: number, point: number, params: any, callback: () => any): void {
        let label: PIXI.Text = new PIXI.Text(`${callback()}`, {
            fontFamily: 'Roboto', fontSize: 12, fill: 0x4D4D4D, align: 'center'
        });

        label.x = params.leftOffset - 25;
        label.y = point - 7;
        this.app.stage.addChild(label);
    }

    public initChart(): void {
        let containerHeight: number = this.app.renderer.height;
        let containerWidth: number = this.app.renderer.width;

        let dx: number = 60;
        let x: number = 0;

        let pixiRenderer = PIXI.autoDetectRenderer(containerWidth, containerHeight, this.app.stage);

        let chart = new PIXI.Graphics();
        let xdata: Array<number> = [0];
        let ydata: Array<number> = [0];

        this.app.stage.addChild(chart);

        chart.position.x = containerWidth;
        chart.position.y = containerHeight;

        this.weatherService.preloadDataSet().subscribe((data: any) => {
            let _data: Array<any> = data.dataPoints.slice(0, 23);
            let delta: number = 14;
            for (let i = 0; i < _data.length; i++) {
                draw(dx, _data[i].temperature * delta);
                pixiRenderer.render(this.app.stage);
            }
        });

        this.weatherService.messages.subscribe((data: PxiWeather) => {
            let delta: number = 14;
            draw(dx, +data.temperature * delta);
            pixiRenderer.render(this.app.stage);
        });

        function draw(_dx: number, _y: number) {
            x += _dx;
            let rightOffset: number = 10;
            xdata.push(x - rightOffset);
            ydata.push(-_y);

            if (x > containerWidth - 50) {
                xdata.shift();
                ydata.shift();
            }

            chart.clear();

            let n: number = xdata.length;

            for (let i = 0; i < n; i++) {
                chart.lineStyle(2, 0x3399FF, 1);
                chart.moveTo(xdata[i], ydata[i]);
                chart.lineTo(xdata[i + 1], ydata[i + 1]);
            }
            chart.position.x -= _dx;
        }
    }

    public debounce(callback: () => any, delay = 0): () => any {
        let timeoutId: any;
        return (...args: any[]) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => callback.apply(this, args), delay);
        };
    }

    public addDot(x: number, y: number): void {
        let radius: number = 4;
        let graphics: PIXI.Graphics = new PIXI.Graphics();

        graphics.beginFill(0x3399FF);
        graphics.drawCircle(x, y, radius);
        graphics.endFill();

        this.app.stage.addChild(graphics);
    }

    public initVerticalLegend(): void {
        let containerHeight: number = this.app.renderer.height;

        let legendText: string = "Temperature";
        let legend: PIXI.Text = new PIXI.Text(`${legendText}`, {
            fontFamily: 'Roboto', fontSize: 12, fill: 0x4D4D4D, align: 'center'
        });

        legend.x = 13;
        legend.y = (containerHeight / 2) + 30;
        legend.rotation = this.degreesToRadians(270);
        this.app.stage.addChild(legend);
    }

    public initHorizontalLegend(): void {
        let containerHeight: number = this.app.renderer.height;
        let containerWidth: number = this.app.renderer.width;

        let legendText: string = "Time";
        let legend: PIXI.Text = new PIXI.Text(`${legendText}`, {
            fontFamily: 'Roboto', fontSize: 12, fill: 0x4D4D4D, align: 'center'
        });

        legend.x = containerWidth / 2;
        legend.y = containerHeight - 20;
        this.app.stage.addChild(legend);
    }

    public addFigures(): void {
        let graphics: PIXI.Graphics = new PIXI.Graphics();

        graphics.beginFill(0xFF3300);
        graphics.lineStyle(4, 0xffd900, 1);

        graphics.moveTo(50, 50);
        graphics.lineTo(250, 50);
        graphics.lineTo(100, 100);
        graphics.lineTo(50, 50);
        graphics.endFill();

        graphics.lineStyle(2, 0x0000FF, 1);
        graphics.beginFill(0xFF700B, 1);
        graphics.drawRect(50, 250, 120, 120);

        graphics.lineStyle(2, 0xFF00FF, 1);
        graphics.beginFill(0xFF00BB, 0.25);
        graphics.drawRoundedRect(150, 450, 300, 100, 15);
        graphics.endFill();

        graphics.lineStyle(0);
        graphics.beginFill(0xFFFF0B, 0.5);
        graphics.drawCircle(470, 90, 60);
        graphics.endFill();

        this.app.stage.addChild(graphics);
    }

    public createElement(x: number, y: number, src: HTMLCanvasElement): void {
        let element: any = PIXI.Texture.from(src);
        let elements: any[] = [];
        element.scale.x = element.scale.y = 0.2;
        element.draggable({
            snap: true,
            snapTolerance: 0,
            grid: [50, 50],
            alpha: 0.5,
            mousedown: (data: any) => {
                let texture_w = (data.target.texture.width);
                let texture_h = (data.target.texture.height);

                let box = new PIXI.Graphics();
                box.lineStyle(5, 0x666666);
                box.drawRect(0, 0, texture_w, texture_h);
                data.target.type = "element";
                data.target.addChild(box);
            },
            drag: (data: any) => {

            },
            mouseup: (data: any) => { }
        });

        element.position.x = x;
        element.position.y = y;

        elements.push(element);
        this.app.stage.addChild(elements[elements.length - 1]);
    }

    private degreesToRadians(degrees: number): number {
        return degrees * (Math.PI / 180);
    }

}
