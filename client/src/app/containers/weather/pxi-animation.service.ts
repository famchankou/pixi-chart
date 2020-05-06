import { Injectable } from "@angular/core";
import * as PIXI from "pixi.js";
const Bezier = require("bezier-js");

@Injectable()
export class PxiAnimationService {

    public constructor() { }

    public resourcesArray(total: any, pathPart: any) {
        let frames = 0;
        const textures: PIXI.Texture[] = [];
        do {
            frames += 1;
            textures.push(PIXI.Texture.fromImage(`${pathPart}${frames}.jpg`),
            );
        } while (frames < total);

        return textures;
    }

    public pieChart(): void {
        // var WIDTH = 300;
        // var HEIGHT = 300;
        // var RADIUS = 65;

        // var createPoint = function(x,y) { return {x:x,y:y}; };
        // var rotateXY = function(x,y,angle) {
        //     var rad = Math.PI * angle/180;
        //     var cosVal = Math.cos(rad);
        //     var sinVal = Math.sin(rad);
        //     return createPoint(cosVal*x - sinVal*y,
        //                     sinVal*x + cosVal*y);
        // };

        // var computeMaskPolygon = function(x,y,radius,angle) {
        //     while(angle<0) 
        //         angle += 360;
        //     angle%=360;

        //     var delta = rotateXY(0, -2*radius, angle);    
        //     var pts = [createPoint(x,y-2*radius), 
        //             createPoint(x,y),
        //             createPoint(x+delta.x, y+delta.y)];

        //     if(angle > 270)
        //         pts.push(createPoint(x-2*radius,y));
        //     if(angle > 180)
        //         pts.push(createPoint(x,y+2*radius));
        //     if(angle > 90)
        //         pts.push(createPoint(x+2*radius,y));

        //     return pts;
        // };


        // // Draw left on canvas.
        // var canvasPieFunc = (function() {    

        //     var c = document.getElementById("c1");
        //     c.width = WIDTH;
        //     c.height = HEIGHT;    
        //     var ctx = c.getContext("2d");

        //     var drawCircle = function(x,y,radius) {
        //         ctx.beginPath();
        //         ctx.arc(x, y, radius, 0, 2 * Math.PI);
        //         ctx.stroke();
        //     };

        //     var centerX = c.width/2;
        //     var centerY = c.height/2;

        //     return function(angle) {
        //         var pts = computeMaskPolygon(centerX, centerY, RADIUS, angle);

        //         ctx.clearRect(0,0,c.width,c.height);
        //         drawCircle(centerX, centerY, RADIUS);
        //         ctx.strokeStyle = "1px solid #000000";

        //         ctx.beginPath();        
        //         ctx.moveTo(pts[0].x, pts[0].y);
        //         for(var i=1;i<pts.length;++i) {
        //             ctx.lineTo(pts[i].x, pts[i].y);
        //         }
        //         ctx.lineTo(pts[0].x, pts[0].y);
        //         ctx.stroke();
        //     };
        // })();

        // var webglPieFunc = (function() {    
        //     var centerX = WIDTH/2;
        //     var centerY = HEIGHT/2;
        //     var radius = 65;

        //     var updatePieMask = function(g,x,y,radius,angle) {
        //         g.clear();
        //         var pts = computeMaskPolygon(x, y, radius, angle);
        //         g.beginFill(0xFFFFFF);        
        //         g.moveTo(pts[0].x, pts[0].y);
        //         for(var i=1;i<pts.length;++i) {
        //             g.lineTo(pts[i].x, pts[i].y);
        //         }
        //         g.lineTo(pts[0].x, pts[0].y);
        //         g.endFill();
        //     };

        //     var renderer = new PIXI.WebGLRenderer(WIDTH,HEIGHT,document.getElementById("c2"));
        //     document.body.appendChild(renderer.view);

        //     var stage = new PIXI.Stage(0xe0e0e0);

        //     var baseCircle = new PIXI.Graphics();
        //     baseCircle.beginFill(0x968763);    
        //     baseCircle.drawCircle(centerX, centerY,RADIUS);
        //     stage.addChild(baseCircle);

        //     var pieMask = new PIXI.Graphics();

        //     var pie = new PIXI.Graphics();
        //     pie.mask = pieMask;
        //     pie.beginFill(0xC9B585);
        //     pie.drawCircle(centerX, centerY,RADIUS);
        //     pie.endFill();

        //     stage.addChild(pie);

        //     return function(angle) {
        //         updatePieMask(pieMask, centerX, centerY, RADIUS, angle);
        //         renderer.render(stage);
        //     };

        // })();


        // (function() {
        //     var angle = 0;
        //     var func = function() {
        //         canvasPieFunc(angle);
        //         webglPieFunc(angle);
        //         angle+=1;

        //         requestAnimationFrame(func);
        //     };
        //     requestAnimationFrame(func);
        // })();
    }

    public bezier(): void {

        // var renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight);
        // renderer.backgroundColor = 0xFFFFFF;

        // document.body.appendChild(renderer.view);


        // var stage = new PIXI.Container();

        // this.renderer = renderer;
        // this.stage = stage;

        // /*////////////////////////////////////////*/

        // var snakeContainer = new PIXI.Container();
        // //snakeContainer.scale.set( renderer.width / renderer.height  );
        // //snakeContainer.position.x = (renderer.width/2) + 100;
        // snakeContainer.position.y = renderer.height/2;
        // stage.addChild(snakeContainer);


        // /*////////////////////////////////////////*/


        // var mouseX = renderer.width / 2, 
        //     mouseY = renderer.height / 2;

        // stage.interactive = true;
        // stage.on("mousemove",function(e){ 
        // mouseY = e.data.originalEvent.clientY;
        // mouseX = e.data.originalEvent.clientX;
        // });

        // /*////////////////////////////////////////*/


        // function Circle(){
        // var graphics = new PIXI.Graphics();
        // graphics.alpha = 0.5;
        // graphics.cacheAsBitmap = true;
        // graphics.beginFill(0xEE0033);
        // graphics.drawCircle(0, 0, 5); // drawCircle(x, y, radius)
        // graphics.endFill();
        // return graphics;
        // }

        // var pointMarkers = [ new Circle(), new Circle(), new Circle() ];
        // stage.addChild.apply(stage, pointMarkers);

        // /*////////////////////////////////////////*/


        // function ease(current,target,ease){ 
        // return current + (target - current) * ( ease || 0.2 );
        // }

        // var curve = new Bezier(mouseX, mouseY , renderer.width * 0.75, 100, renderer.width + 100, 0);

        // /*////////////////////////////////////////*/

        // var points = [];
        // var pointCount = 20;

        // var texture = new PIXI.Texture.fromImage("https://s3-us-west-2.amazonaws.com/s.cdpn.io/39255/tentacle.png");
        // texture.on("update",function(){

        // var ropeLength = this.width / pointCount;

        // var halfHeight = renderer.height / 2;
        // curve.points[0].x = mouseX;
        // curve.points[0].y = mouseY - halfHeight;
        // curve.points[1].x = ((renderer.width) - mouseX/2) * 0.8;
        // curve.points[1].y = ((halfHeight) - mouseY) * 0.8;
        // var LUT = curve.getLUT(pointCount);

        // for (var i = 0; i < pointCount; i++) {
        //     let point = new PIXI.Point( LUT[i].x, LUT[i].y );//i * ropeLength, 0)
        //     points.push(point);
        // }

        // var strip = new PIXI.mesh.Rope( this, points);
        // snakeContainer.addChild(strip);//, 0);

        // animate();
        // });

        // /*////////////////////////////////////////*/

        // var count = 0;

        // function animate() {
        // requestAnimationFrame(animate);

        // count += 0.01;

        // var halfHeight = renderer.height / 2;

        // curve.points[0].x = mouseX;
        // curve.points[0].y = mouseY - halfHeight;
        // curve.points[1].x = ((renderer.width) - mouseX/2) * 0.8;
        // curve.points[1].y = ((halfHeight) - mouseY) * 0.8;

        // pointMarkers.forEach(function(point,i){
        //     point.position.x = curve.points[i].x;
        //     point.position.y = curve.points[i].y + renderer.height/2;
        // });

        // // Points along the curve
        // var LUT = curve.getLUT(points.length);

        // for (var i = 0; i < points.length; i++) {

        //     points[i].__y = ( points[i].__y !== undefined ? points[i].__y : points[i].y );
        //     points[i].__y = ease( points[i].__y, LUT[i].y, 0.1 / ((i+1)/4) );

        //     points[i].y = points[i].__y + (Math.sin( (i * 0.8) + count) * 14);

        //     points[i].x = ease( points[i].x, LUT[i].x, 0.1 / ((i+1)/4) );

        // }

        // renderer.render(stage);
        // }
    }

    public claculateBezier(percent: number, p1: Position, cp1: Position, cp2: Position, p2: Position): Position {
        function b1(t: number) { return t * t * t; };
        function b2(t: number) { return 3 * t * t * (1 - t); };
        function b3(t: number) { return 3 * t * (1 - t) * (1 - t); };
        function b4(t: number) { return (1 - t) * (1 - t) * (1 - t); };

        let pos: Position = { x: 0, y: 0 };
        pos.x = p1.x * b1(percent) + cp1.x * b2(percent) + cp2.x * b3(percent) + p2.x * b4(percent);
        pos.y = p1.y * b1(percent) + cp1.y * b2(percent) + cp2.y * b3(percent) + p2.y * b4(percent);

        return pos;
    }

}

interface Position {
    x: number;
    y: number;
}
