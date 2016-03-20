"use strict"; //严格模式
var displayArray = [];
var mainButton = [];
var button = [];

/*var xx=document.createElement("div");
xx.setAttribute("id","xx");
document.body.appendChild(xx);
var canvas=document.createElement("div");
canvas.setAttribute("id","zz");
document.body.appendChild(canvas);*/


var SOUNDFILE;
var sketch;
var XMLHTTP;
var ANCHOR;
var MARK;
var pp;
var attractPt;
var attractPt_1;

sketch = function(p){
	pp = p;
	p.preload = function() {
		p.soundFormats('wav', 'ogg');
		SOUNDFILE = p.loadSound('wp-content/themes/zbs/sound/water2.wav');
		ANCHOR = new p5.Vector(200,200);
	};
	p.setup = function(){
		p.createCanvas(960,600);
		p.canvas.id = "sketch_1";
		var option = {
			"p":p,
			"position" : new p5.Vector(300,300),
			"strength" : 0.1
		};
		
		var option_1 = {
			"p":p,
			"position" : new p5.Vector(600,300),
			"strength" : 0.1,
			"clockwise" : true
		};
		attractPt = new AttractPoint(option);
		attractPt_1 = new AttractPoint(option_1);
	};
	
	p.draw = function(){
		p.background(255);
		//attractPt.display();
		//attractPt_1.display();
		var buttonHoverCount = 0;
		for(var i = 0;i < displayArray.length;i++){
			for(var j = 0;j < displayArray[i].length;j++){
				/*var force = attractPt.vortexAttract(displayArray[i][j],300);
				displayArray[i][j].applyForce(force);*/
				displayArray[i][j].display();
				
				var vect = p5.Vector.sub(displayArray[i][j].b.position,displayArray[i][j].attractPt.position);
				var angle = vect.heading();
				var len = vect.mag();
				
				if(!displayArray[i][j].attractPt.clocklwise && len < 100 && angle < Math.PI/4 && angle > 0){
					displayArray[i][j].attractPt = attractPt_1;
				}else{
					if(displayArray[i][j].attractPt.clockwise && len < 200 && angle < 3 * Math.PI/4 && angle > Math.PI/2){
						console.log(len);
						displayArray[i][j].attractPt = attractPt;
					}
				}
				
				
				if(i == 1 && displayArray[i][j].isSelected()){
					buttonHoverCount++;
				}
			}
		}
		if(buttonHoverCount > 0){
			$(p.canvas).css("cursor","pointer");
		}
	};	
	
};

var myp5 = new p5(sketch,'sketch');


$(document).ready(function(){
	getInfo("users","basic_contributor");
	$("#getUsers").click(function(){
		getInfo("users","basic_contributor");
	});
	$("#getPosts").click(function(){
		getInfo("posts");
	});
	$("#align").click(function (){
		var len = mainButton.length;
		//;
		for(var k=0; k<len; k++){
			var i = Math.floor(k / 2) + 2;
			var j = k % 2 + 2;
			//console.log(i);
			//console.log(j);
			var option = {
				"position" : new p5.Vector(i*70,j*70),
				"strength" : 1.5
			}
			var attractPt = new AttractPoint(option);
			mainButton[k].attractPt = attractPt;
			//mainButton[k].strength = 1.5;
			mainButton[k].vortex = false;
			//mainButton[k].topspeed = 1;
		}
	});
});


function change(){
	
}

