/// <reference path="../../../../typings/globals/d3/index.d.ts" />
/// <reference path="../../../../typings/globals/nvd3/index.d.ts" />

import * as d3 from "d3";

declare var jquery: any;
declare var $: any;


/**
 * 
 *  Arguments:
 * 	 containerId => id of container to insert SVG into [REQUIRED]
 * 	 marginTop => Number of pixels for top margin. [OPTIONAL => Default: 20]
 * 	 marginRight => Number of pixels for right margin. [OPTIONAL => Default: 20]
 * 	 marginBottom => Number of pixels for bottom margin. [OPTIONAL => Default: 35]
 * 	 marginLeft => Number of pixels for left margin. [OPTIONAL => Default: 90]
 * 	 data => a dictionary containing the following keys [REQUIRED]
 * 		 values => The data array of arrays to graph. [REQUIRED]
 * 		 start => The start time in milliseconds since epoch of the data. [REQUIRED]
 * 		 end => The end time in milliseconds since epoch of the data. [REQUIRED]
 * 		 step => The time in milliseconds between each data value.	 [REQUIRED]	
 * 		 names => The metric name for each array of data. [REQUIRED]
 * 		 displayNames => Display name for each metric. [OPTIONAL => Default: same as 'names' argument]
 * 				Example: ['MetricA', 'MetricB'] 
 * 		 axis => Which axis (left/right) to put each metric on. [OPTIONAL => Default: Display all values on single axis]
 * 				Example: ['left', 'right', 'right'] to display first metric on left axis, next two on right axis.
 * 		 colors => What color to use for each metric. [OPTIONAL => Default: black]
 * 				Example: ['blue', 'red'] to display first metric in blue and second in red.
 * 		 scale => What scale to display the graph with. [OPTIONAL => Default: linear]
 * 				Possible Values: linear, pow, log
 * 		 rounding => How many decimal points to round each metric to. [OPTIONAL => Default: Numbers are rounded to whole numbers (0 decimals)]
 * 				Example: [2, 1] to display first metric with 2 decimals and second metric with 1. 
 * 		 numAxisLabelsPowerScale => Hint for how many labels should be displayed for the Y-axis in Power scale. [OPTIONAL => Default: 6]
 * 		 numAxisLabelsLinearScale  => Hint for how many labels should be displayed for the Y-axis in Linear scale. [OPTIONAL => Default: 6]
 * 
 *  Events (fired from container):
 * 	 LineGraph:dataModification => whenever data is changed
 * 	 LineGraph:configModification => whenever config is changed
 * 
 */

export class LineGraph {

    // public argsMap: any;

    // private containerId: any;
    // private container: any;

    // private graph: any;
    // private x: any;
    // private yLeft: any;
    // private yRight: any;
    // private xAxis: any;
    // private yAxisLeft: any;
    // private yAxisRight: any;
    // // private yAxisLeftDomainStart: any;
    // private linesGroup: any;
    // private linesGroupText: any;
    // private lines: any;
    // private lineFunction: any;
    // private lineFunctionSeriesIndex: number = -1;

    // private yScale: string = 'linear';
    // private scales: Array<Array<any>> = [['linear', 'Linear'], ['pow', 'Power'], ['log', 'Log']];
    // private hoverContainer: any;
    // private hoverLine: any;
    // private hoverLineXOffset: any;
    // private hoverLineYOffset: any;
    // private hoverLineGroup: any;
    // private legendFontSize: number = 12;

    // private data: any;

    // private margin: Array<number> = [-1, -1, -1, -1];
    // private w: any;
    // private h: any;

    // private transitionDuration: number = 300;

    // private formatNumber: any = d3.format(",.0f");

    // private userCurrentlyInteracting: boolean = false;
    // private currentUserPositionX: number = -1;



    // public constructor(argsMap: any) {
    //     this.argsMap = argsMap;
    // }

    // public slideData(newData: any): void {
    //     let tempData: any = this.processDataMap(newData);

    //     if (tempData.step !== newData.step) {
    //         throw new Error("The step size on appended data must be the same as the existing data => " +
    //             this.data.step + " != " + tempData.step);
    //     }

    //     if (tempData.values[0].length === 0) {
    //         throw new Error("There is no data to append.");
    //     }

    //     let numSteps: number = tempData.values[0].length;
    //     tempData.values.forEach((dataArrays: any, i: number) => {
    //         let existingDataArrayForIndex: any = this.data.values[i];

    //         dataArrays.forEach((v: any) => {
    //             existingDataArrayForIndex.push(v);
    //             existingDataArrayForIndex.shift();
    //         });
    //     });

    //     this.data.startTime = new Date(this.data.startTime.getTime() + (this.data.step * numSteps));
    //     this.data.endTime = tempData.endTime;

    //     this.redrawAxes(false);
    //     this.redrawLines(false);

    //     this.graph.selectAll("g .lines path").attr("transform", "translate(-" + this.x(numSteps * this.data.step) + ")");

    //     this.handleDataUpdate();

    //     $(this.container).trigger('LineGraph:dataModification');
    // }

    // public updateData(newData: any): void {
    //     this.data = this.processDataMap(newData);
    //     this.graph.selectAll("g .lines path").data(this.data.values);

    //     this.redrawAxes(true);
    //     this.redrawLines(false);
    //     this.handleDataUpdate();

    //     $(this.container).trigger('LineGraph:dataModification');
    // }


    // public switchToPowerScale(): void {
    //     this.yScale = 'pow';
    //     this.redrawAxes(true);
    //     this.redrawLines(true);

    //     $(this.container).trigger('LineGraph:configModification');
    // }

    // public switchToLogScale(): void {
    //     this.yScale = 'log';
    //     this.redrawAxes(true);
    //     this.redrawLines(true);

    //     $(this.container).trigger('LineGraph:configModification');
    // }

    // public switchToLinearScale(): void {
    //     this.yScale = 'linear';
    //     this.redrawAxes(true);
    //     this.redrawLines(true);

    //     $(this.container).trigger('LineGraph:configModification');
    // }

    // public getScale(): any {
    //     return this.yScale;
    // }

    // public _init(): void {
    //     this.containerId = this.getRequiredVar(this.argsMap, 'containerId');
    //     this.container = document.querySelector('#' + this.containerId);

    //     console.log(document);

    //     this.margin[0] = this.getOptionalVar(this.argsMap, 'marginTop', 20);
    //     this.margin[1] = this.getOptionalVar(this.argsMap, 'marginRight', 20);
    //     this.margin[2] = this.getOptionalVar(this.argsMap, 'marginBottom', 35);
    //     this.margin[3] = this.getOptionalVar(this.argsMap, 'marginLeft', 90);

    //     this.data = this.processDataMap(this.getRequiredVar(this.argsMap, 'data'));

    //     this.yScale = this.data.scale;

    //     this.initDimensions();

    //     this.createGraph();

    //     let TO: any = false;
    //     $(window).resize(() => {
    //         if (TO !== false) {
    //             clearTimeout(TO);
    //         }
    //         TO = setTimeout(this.handleWindowResizeEvent, 200);
    //     });
    // }

    // public handleMouseOverLine(lineData: any, index: any): void {
    //     this.userCurrentlyInteracting = true;
    // }

    // public handleMouseOverGraph(event: any): void {
    //     let mouseX: any = event.pageX - this.hoverLineXOffset;
    //     let mouseY: any = event.pageY - this.hoverLineYOffset;

    //     if (mouseX >= 0 && mouseX <= this.w && mouseY >= 0 && mouseY <= this.h) {
    //         this.hoverLine.classed("hide", false);
    //         this.hoverLine.attr("x1", mouseX).attr("x2", mouseX);

    //         this.displayValueLabelsForPositionX(mouseX);

    //         this.userCurrentlyInteracting = true;
    //         this.currentUserPositionX = mouseX;
    //     } else {
    //         this.handleMouseOutGraph(event);
    //     }
    // }

    // private tickFormatForLogScale(d: any) {
    //     return this.formatNumber(d);
    // }

    // private processDataMap(dataMap: any): any {
    //     let dataValues: any = this.getRequiredVar(dataMap, 'values',
    //         "The data object must contain a 'values' value with a data array.");
    //     let startTime: any = new Date(this.getRequiredVar(dataMap, 'start',
    //         "The data object must contain a 'start' value with the start time in milliseconds since epoch."));
    //     let endTime: any = new Date(this.getRequiredVar(dataMap, 'end',
    //         "The data object must contain an 'end' value with the end time in milliseconds since epoch."));
    //     let step: any = this.getRequiredVar(dataMap, 'step',
    //         "The data object must contain a 'step' value with the time in milliseconds between each data value.");
    //     let names: any = this.getRequiredVar(dataMap, 'names',
    //         "The data object must contain a 'names' array with the same length as 'values' with a name for each data value array.");
    //     let displayNames: any = this.getOptionalVar(dataMap, 'displayNames', names);
    //     let numAxisLabelsPowerScale: any = this.getOptionalVar(dataMap, 'numAxisLabelsPowerScale', 6);
    //     let numAxisLabelsLinearScale: any = this.getOptionalVar(dataMap, 'numAxisLabelsLinearScale', 6);

    //     let axis: any = this.getOptionalVar(dataMap, 'axis', []);

    //     if (axis.length === 0) {
    //         displayNames.forEach((v: any, i: number) => {
    //             axis[i] = "left";
    //         });
    //     } else {
    //         let hasRightAxis: boolean = false;

    //         axis.forEach((v: any) => {
    //             if (v === 'right') {
    //                 hasRightAxis = true;
    //             }
    //         });

    //         if (hasRightAxis) {
    //             this.margin[1] = this.margin[1] + 50;
    //         }
    //     }

    //     let colors: any = this.getOptionalVar(dataMap, 'colors', []);
    //     if (colors.length === 0) {
    //         displayNames.forEach((v: any, i: number) => {
    //             colors[i] = "black";
    //         });
    //     }

    //     let maxValues: Array<any> = [];
    //     let rounding: any = this.getOptionalVar(dataMap, 'rounding', []);
    //     if (rounding.length === 0) {
    //         displayNames.forEach((v: any, i: number) => {
    //             rounding[i] = 0;
    //         });
    //     }

    //     let newDataValues: Array<any> = [];
    //     dataValues.forEach((v: any, i: number) => {
    //         newDataValues[i] = v.slice(0);
    //         maxValues[i] = d3.max(newDataValues[i]);
    //     });

    //     return {
    //         values: newDataValues,
    //         startTime: startTime,
    //         endTime: endTime,
    //         step: step,
    //         names: names,
    //         displayNames: displayNames,
    //         axis: axis,
    //         colors: colors,
    //         scale: this.getOptionalVar(dataMap, 'scale', this.yScale),
    //         maxValues: maxValues,
    //         rounding: rounding,
    //         numAxisLabelsLinearScale: numAxisLabelsLinearScale,
    //         numAxisLabelsPowerScale: numAxisLabelsPowerScale
    //     };
    // }

    // private redrawAxes(withTransition: any): void {
    //     this.initY();
    //     this.initX();

    //     if (withTransition) {
    //         this.graph.selectAll("g .x.axis").transition()
    //             .duration(this.transitionDuration)
    //             .ease("linear")
    //             .call(this.xAxis);


    //         this.graph.selectAll("g .y.axis.left").transition()
    //             .duration(this.transitionDuration)
    //             .ease("linear")
    //             .call(this.yAxisLeft);

    //         if (this.yAxisRight !== undefined) {
    //             this.graph.selectAll("g .y.axis.right").transition()
    //                 .duration(this.transitionDuration)
    //                 .ease("linear")
    //                 .call(this.yAxisRight);
    //         }
    //     } else {
    //         this.graph.selectAll("g .x.axis").call(this.xAxis);
    //         this.graph.selectAll("g .y.axis.left").call(this.yAxisLeft);

    //         if (this.yAxisRight !== undefined) {
    //             this.graph.selectAll("g .y.axis.right").call(this.yAxisRight);
    //         }
    //     }
    // }

    // private redrawLines(withTransition: any): void {
    //     this.lineFunctionSeriesIndex = -1;

    //     if (withTransition) {
    //         this.graph.selectAll("g .lines path")
    //             .transition()
    //             .duration(this.transitionDuration)
    //             .ease("linear")
    //             .attr("d", this.lineFunction)
    //             .attr("transform", null);
    //     } else {
    //         this.graph.selectAll("g .lines path")
    //             .attr("d", this.lineFunction)
    //             .attr("transform", null);
    //     }
    // }

    // private initY(): void {
    //     this.initYleft();
    //     this.initYright();
    // }

    // private initYleft(): void {
    //     let maxYscaleLeft: any = this.calculateMaxY(this.data, 'left');
    //     let numAxisLabels: number = 6;

    //     if (this.yScale === 'pow') {
    //         this.yLeft = d3.scale.pow().exponent(0.3).domain([0, maxYscaleLeft]).range([this.h, 0]).nice();
    //         numAxisLabels = this.data.numAxisLabelsPowerScale;
    //     } else if (this.yScale === 'log') {
    //         this.yLeft = d3.scale.log().domain([0.1, maxYscaleLeft]).range([this.h, 0]).nice();
    //     } else if (this.yScale === 'linear') {
    //         this.yLeft = d3.scale.linear().domain([0, maxYscaleLeft]).range([this.h, 0]).nice();
    //         numAxisLabels = this.data.numAxisLabelsLinearScale;
    //     }

    //     this.yAxisLeft = d3.svg.axis().scale(this.yLeft).ticks(numAxisLabels, this.tickFormatForLogScale).orient("left");
    // }

    // private initYright(): void {
    //     let maxYscaleRight: any = this.calculateMaxY(this.data, 'right');

    //     if (maxYscaleRight !== undefined) {
    //         let numAxisLabels: number = 6;
    //         if (this.yScale === 'pow') {
    //             this.yRight = d3.scale.pow().exponent(0.3).domain([0, maxYscaleRight]).range([this.h, 0]).nice();
    //             numAxisLabels = this.data.numAxisLabelsPowerScale;
    //         } else if (this.yScale === 'log') {
    //             this.yRight = d3.scale.log().domain([0.1, maxYscaleRight]).range([this.h, 0]).nice();
    //         } else if (this.yScale === 'linear') {
    //             this.yRight = d3.scale.linear().domain([0, maxYscaleRight]).range([this.h, 0]).nice();
    //             numAxisLabels = this.data.numAxisLabelsLinearScale;
    //         }

    //         this.yAxisRight = d3.svg.axis().scale(this.yRight).ticks(numAxisLabels, this.tickFormatForLogScale).orient("right");
    //     }
    // }

    // private calculateMaxY(data: any, whichAxis: any): any {
    //     let maxValuesForAxis: Array<any> = [];
    //     data.maxValues.forEach((v: any, i: number) => {
    //         if (data.axis[i] === whichAxis) {
    //             maxValuesForAxis.push(v);
    //         }
    //     });

    //     return d3.max(maxValuesForAxis);
    // }

    // private initX(): void {
    //     this.x = d3.time.scale().domain([this.data.startTime, this.data.endTime]).range([0, this.w]);
    //     this.xAxis = d3.svg.axis().scale(this.x).tickSize(-this.h); // .tickSubdivide(1);
    //     // this.xAxis = d3.svg.axis().scale(x); // without ticks
    // }

    // private createGraph(): void {
    //     this.graph = d3.select("#" + this.containerId)
    //         .append("svg:svg")
    //         .attr("class", "line-graph")
    //         .attr("width", this.w + this.margin[1] + this.margin[3])
    //         .attr("height", this.h + this.margin[0] + this.margin[2])
    //         .append("svg:g")
    //         .attr("transform", "translate(" + this.margin[3] + "," + this.margin[0] + ")");

    //     this.initX();

    //     this.graph.append("svg:g")
    //         .attr("class", "x axis")
    //         .attr("transform", "translate(0," + this.h + ")")
    //         .call(this.xAxis);

    //     this.initY();

    //     this.graph.append("svg:g")
    //         .attr("class", "y axis left")
    //         .attr("transform", "translate(-10,0)")
    //         .call(this.yAxisLeft);

    //     if (this.yAxisRight !== undefined) {
    //         this.graph.append("svg:g")
    //             .attr("class", "y axis right")
    //             .attr("transform", "translate(" + (this.w + 10) + ",0)")
    //             .call(this.yAxisRight);
    //     }

    //     this.lineFunction = d3.svg.line()
    //         .x((d: any, i: number) => {
    //             let _x: any = this.x(this.data.startTime.getTime() + (this.data.step * i));
    //             return _x;
    //         })
    //         .y((d: any, i: number) => {
    //             if (this.yScale === 'log' && d < 0.1) {
    //                 d = 0.1;
    //             }

    //             if (i === 0) {
    //                 this.lineFunctionSeriesIndex++;
    //             }

    //             let axis: any = this.data.axis[this.lineFunctionSeriesIndex];
    //             let _y: any;

    //             if (axis === 'right') {
    //                 _y = this.yRight(d);
    //             } else {
    //                 _y = this.yLeft(d);
    //             }

    //             return _y;
    //         })
    //         .defined((d: any) => {
    //             return d >= 0;
    //         });

    //     this.lines = this.graph.append("svg:g")
    //         .attr("class", "lines")
    //         .selectAll("path")
    //         .data(this.data.values);

    //     this.hoverContainer = this.container.querySelector('g .lines');


    //     $(this.container).mouseleave((event: any) => {
    //         console.log("[MOUSELEAVE]", event);
    //         // handleMouseOutGraph(event);
    //     });

    //     $(this.container).mousemove((event: any) => {
    //         console.log("[MOUSELEAVE]", event);
    //         // handleMouseOverGraph(event);
    //     });

    //     this.linesGroup = this.lines.enter().append("g")
    //         .attr("class", (d: any, i: number) => {
    //             return "line_group series_" + i;
    //         });

    //     this.linesGroup.append("path")
    //         .attr("class", (d: any, i: number) => {
    //             return "line series_" + i;
    //         })
    //         .attr("fill", "none")
    //         .attr("stroke", (d: any, i: number) => {
    //             return this.data.colors[i];
    //         })
    //         .attr("d", this.lineFunction)
    //         .on('mouseover', (d: any, i: number) => {
    //             this.handleMouseOverLine(d, i);
    //         });

    //     this.linesGroupText = this.linesGroup.append("svg:text");
    //     this.linesGroupText.attr("class", (d: any, i: number) => {
    //         return "line_label series_" + i;
    //     })
    //         .text((d: any, i: number) => {
    //             return "";
    //         });

    //     this.hoverLineGroup = this.graph.append("svg:g").attr("class", "hover-line");
    //     this.hoverLine = this.hoverLineGroup
    //         .append("svg:line")
    //         .attr("x1", 10).attr("x2", 10)
    //         .attr("y1", 0).attr("y2", this.h);

    //     this.hoverLine.classed("hide", true);

    //     this.createScaleButtons();
    //     this.createDateLabel();
    //     this.createLegend();
    //     this.setValueLabelsToLatest();
    // }

    // private createLegend(): void {
    //     let legendLabelGroup: any = this.graph.append("svg:g")
    //         .attr("class", "legend-group")
    //         .selectAll("g")
    //         .data(this.data.displayNames)
    //         .enter().append("g")
    //         .attr("class", "legend-labels");

    //     legendLabelGroup.append("svg:text")
    //         .attr("class", "legend name")
    //         .text((d: any, i: number) => {
    //             return d;
    //         })
    //         .attr("font-size", this.legendFontSize)
    //         .attr("fill", (d: any, i: number) => {
    //             return this.data.colors[i];
    //         })
    //         .attr("y", (d: any, i: number) => {
    //             return this.h + 28;
    //         });

    //     legendLabelGroup.append("svg:text")
    //         .attr("class", "legend value")
    //         .attr("font-size", this.legendFontSize)
    //         .attr("fill", (d: any, i: number) => {
    //             return this.data.colors[i];
    //         })
    //         .attr("y", (d: any, i: number) => {
    //             return this.h + 28;
    //         });
    // }

    // private redrawLegendPosition(animate: any): void {
    //     let legendText: any = this.graph.selectAll('g.legend-group text');
    //     if (animate) {
    //         legendText.transition()
    //             .duration(this.transitionDuration)
    //             .ease("linear")
    //             .attr("y", (d: any, i: number) => {
    //                 return this.h + 28;
    //             });
    //     } else {
    //         legendText.attr("y", (d: any, i: number) => {
    //             return this.h + 28;
    //         });
    //     }
    // }

    // private createScaleButtons(): void {
    //     let cumulativeWidth: number = 0;
    //     /*let buttonGroup: any = */this.graph.append("svg:g")
    //         .attr("class", "scale-button-group")
    //         .selectAll("g")
    //         .data(this.scales)
    //         .enter().append("g")
    //         .attr("class", "scale-buttons")
    //         .append("svg:text")
    //         .attr("class", "scale-button")
    //         .text((d: any, i: number) => {
    //             return d[1];
    //         })
    //         .attr("font-size", "12")
    //         .attr("fill", (d: any) => {
    //             if (d[0] === this.yScale) {
    //                 return "black";
    //             } else {
    //                 return "blue";
    //             }
    //         })
    //         .classed("selected", (d: any) => {
    //             if (d[0] === this.yScale) {
    //                 return true;
    //             } else {
    //                 return false;
    //             }
    //         })
    //         .attr("x", (d: any, i: number) => {
    //             let returnX: any = cumulativeWidth;
    //             // cumulativeWidth += this.getComputedTextLength() + 5;
    //             return returnX;
    //         })
    //         .attr("y", -4)
    //         .on('click', (d: any, i: number) => {
    //             this.handleMouseClickScaleButton(this, d, i);
    //         });
    // }

    // private handleMouseClickScaleButton(button: any, buttonData: any, index: any): void {
    //     if (index === 0) {
    //         this.switchToLinearScale();
    //     } else if (index === 1) {
    //         this.switchToPowerScale();
    //     } else if (index === 2) {
    //         this.switchToLogScale();
    //     }

    //     this.graph.selectAll('.scale-button')
    //         .attr("fill", (d: any) => {
    //             if (d[0] === this.yScale) {
    //                 return "black";
    //             } else {
    //                 return "blue";
    //             }
    //         })
    //         .classed("selected", (d: any) => {
    //             if (d[0] === this.yScale) {
    //                 return true;
    //             } else {
    //                 return false;
    //             }
    //         });
    // }

    // private createDateLabel(): void {
    //     let date: Date = new Date();
    //     /*let buttonGroup: any = */this.graph.append("svg:g")
    //         .attr("class", "date-label-group")
    //         .append("svg:text")
    //         .attr("class", "date-label")
    //         .attr("text-anchor", "end")
    //         .attr("font-size", "10")
    //         .attr("y", -4)
    //         .attr("x", this.w)
    //         .text(date.toDateString() + " " + date.toLocaleTimeString());
    // }

    // private handleMouseOutGraph(event: any): void {
    //     this.hoverLine.classed("hide", true);
    //     this.setValueLabelsToLatest();
    //     this.userCurrentlyInteracting = false;
    //     this.currentUserPositionX = -1;
    // }

    // private handleDataUpdate(): void {
    //     if (this.userCurrentlyInteracting) {
    //         if (this.currentUserPositionX > -1) {
    //             this.displayValueLabelsForPositionX(this.currentUserPositionX);
    //         }
    //     } else {
    //         this.setValueLabelsToLatest();
    //     }
    // }

    // private displayValueLabelsForPositionX(xPosition: any, withTransition?: any): void {
    //     let animate: boolean = false;

    //     if (withTransition !== undefined) {
    //         if (withTransition) {
    //             animate = true;
    //         }
    //     }

    //     let dateToShow: any;
    //     // let labelValueWidths: Array<any> = [];
    //     this.graph.selectAll("text.legend.value")
    //         .text((d: any, i: number) => {
    //             let valuesForX: any = this.getValueForPositionXFromData(xPosition, i);
    //             dateToShow = valuesForX.date;
    //             return valuesForX.value;
    //         })
    //         .attr("x", (d: any, i: number) => {
    //             // labelValueWidths[i] = this.getComputedTextLength();
    //         });

    //     let cumulativeWidth: number = 0;
    //     let labelNameEnd: Array<any> = [];
    //     this.graph.selectAll("text.legend.name")
    //         .attr("x", (d: any, i: number) => {
    //             let returnX: any = cumulativeWidth;
    //             // cumulativeWidth += this.getComputedTextLength() + 4 + labelValueWidths[i] + 8;
    //             // labelNameEnd[i] = returnX + this.getComputedTextLength() + 5;
    //             return returnX;
    //         });

    //     cumulativeWidth = cumulativeWidth - 8;

    //     if (cumulativeWidth > this.w) {
    //         this.legendFontSize = this.legendFontSize - 1;
    //         this.graph.selectAll("text.legend.name").attr("font-size", this.legendFontSize);
    //         this.graph.selectAll("text.legend.value").attr("font-size", this.legendFontSize);

    //         this.displayValueLabelsForPositionX(xPosition);
    //         return;
    //     }

    //     this.graph.selectAll("text.legend.value")
    //         .attr("x", (d: any, i: number) => {
    //             return labelNameEnd[i];
    //         });

    //     this.graph.select('text.date-label').text(dateToShow.toDateString() + " " + dateToShow.toLocaleTimeString());

    //     if (animate) {
    //         this.graph.selectAll("g.legend-group g")
    //             .transition()
    //             .duration(this.transitionDuration)
    //             .ease("linear")
    //             .attr("transform", "translate(" + (this.w - cumulativeWidth) + ",0)");
    //     } else {
    //         this.graph.selectAll("g.legend-group g")
    //             .attr("transform", "translate(" + (this.w - cumulativeWidth) + ",0)");
    //     }
    // }

    // private setValueLabelsToLatest(withTransition?: any): void {
    //     this.displayValueLabelsForPositionX(this.w, withTransition);
    // }

    // private getValueForPositionXFromData(xPosition: any, dataSeriesIndex: any): any {
    //     let d: any = this.data.values[dataSeriesIndex];
    //     let xValue: any = this.x.invert(xPosition);

    //     let index: any = (xValue.getTime() - this.data.startTime) / this.data.step;

    //     if (index >= d.length) {
    //         index = d.length - 1;
    //     }
    //     index = Math.round(index);

    //     let bucketDate: any = new Date(this.data.startTime.getTime() + this.data.step * (index + 1));
    //     let v: any = d[index];
    //     let roundToNumDecimals: any = this.data.rounding[dataSeriesIndex];

    //     return {
    //         value: this.roundNumber(v, roundToNumDecimals),
    //         date: bucketDate
    //     };
    // }

    // private handleWindowResizeEvent(): void {
    //     this.initDimensions();
    //     this.initX();

    //     d3.select("#" + this.containerId + " svg")
    //         .attr("width", this.w + this.margin[1] + this.margin[3])
    //         .attr("height", this.h + this.margin[0] + this.margin[2]);

    //     this.graph
    //         .selectAll("g .x.axis")
    //         .attr("transform", "translate(0," + this.h + ")");

    //     if (this.yAxisRight !== undefined) {
    //         this.graph.selectAll("g .y.axis.right")
    //             .attr("transform", "translate(" + (this.w + 10) + ",0)");
    //     }

    //     this.legendFontSize = 12;
    //     this.graph
    //         .selectAll("text.legend.name")
    //         .attr("font-size", this.legendFontSize);
    //     this.graph
    //         .selectAll("text.legend.value")
    //         .attr("font-size", this.legendFontSize);

    //     this.graph.select('text.date-label')
    //         .transition()
    //         .duration(this.transitionDuration)
    //         .ease("linear")
    //         .attr("x", this.w);

    //     this.redrawAxes(true);
    //     this.redrawLines(true);

    //     this.redrawLegendPosition(true);
    //     this.setValueLabelsToLatest(true);
    // }

    // private initDimensions(): void {
    //     this.w = $("#" + this.containerId).width() - this.margin[1] - this.margin[3];
    //     this.h = $("#" + this.containerId).height() - this.margin[0] - this.margin[2];

    //     this.hoverLineXOffset = this.margin[3] + $(this.container).offset().left;
    //     this.hoverLineYOffset = this.margin[0] + $(this.container).offset().top;
    // }

    // private getRequiredVar(argsMap: Array<any>, key: any, message?: any): any {
    //     if (!argsMap[key]) {
    //         if (!message) {
    //             throw new Error(key + " is required");
    //         } else {
    //             throw new Error(message);
    //         }
    //     } else {
    //         return argsMap[key];
    //     }
    // }

    // private getOptionalVar(argsMap: any, key: any, defaultValue: any): any {
    //     if (!argsMap[key]) {
    //         return defaultValue;
    //     } else {
    //         return argsMap[key];
    //     }
    // }

    // private roundNumber(num: any, dec: any): string {
    //     let result: number = Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
    //     let resultAsString: string = result.toString();
    //     if (dec > 0) {
    //         if (resultAsString.indexOf('.') === -1) {
    //             resultAsString = resultAsString + '.';
    //         }

    //         let indexOfDecimal: number = resultAsString.indexOf('.');
    //         while (resultAsString.length <= (indexOfDecimal + dec)) {
    //             resultAsString = resultAsString + '0';
    //         }
    //     }
    //     return resultAsString;
    // };

}
