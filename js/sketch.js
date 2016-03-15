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

sketch = function(p){
	pp = p;
	p.preload = function() {
		p.soundFormats('mp3', 'ogg');
		SOUNDFILE = p.loadSound('wp-content/themes/zbs/sound/water2.wav');
		MARK = p.loadImage("wp-content/themes/zbs/mask.png");
		ANCHOR = new p5.Vector(200,200);
	};
	p.setup = function(){
		p.createCanvas(960,600);
		p.canvas.id = "sketch_1";
	};
	
	p.draw = function(){
		p.background(255);
		var buttonHoverCount = 0;
		for(var i = 0;i < displayArray.length;i++){
			for(var j = 0;j < displayArray[i].length;j++){
				displayArray[i][j].display();
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
	getInfo("posts");
	$("#getUsers").click(function(){
		getInfo("users","basic_contributor");
	});
	$("#getPosts").click(function(){
		getInfo("posts");
	});
});




