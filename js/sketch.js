"use strict"; //严格模式

var AttractPoint = require("./AttractPoint.js");
var globalVar = require("./GlobalVar.js");


var sketch = function(p){
	globalVar.pp = p;
	p.preload = function() {
		p.soundFormats('wav', 'ogg');
		globalVar.SOUNDFILE = p.loadSound('wp-content/themes/zbs/sound/water2.wav');

		var optionL = {
			"p":p,
			"position" : new p5.Vector(250,300),
			"strength" : 0.1
		};
		
		var optionR = {
			"p":p,
			"position" : new p5.Vector(650,300),
			"strength" : 0.1,
			"clockwise" : true
		};
		globalVar.attractPtL = new AttractPoint(optionL);
		globalVar.attractPtR = new AttractPoint(optionR);
	};
	p.setup = function(){
		p.createCanvas(960,600);
		p.canvas.id = "sketch_1";
	};
	
	p.draw = function(){
		p.background(255);
		//attractPtL.display();
		//attractPtR.display();
		var buttonHoverCount = 0;
		for(var i = 0;i < globalVar.displayArray.length;i++){
			for(var j = 0;j < globalVar.displayArray[i].length;j++){
				/*var force = attractPtL.vortexAttract(globalVar.displayArray[i][j],300);
				globalVar.displayArray[i][j].applyForce(force);*/
				globalVar.displayArray[i][j].display();
				
				var vect = p5.Vector.sub(globalVar.displayArray[i][j].b.position,globalVar.displayArray[i][j].attractPtL.position);
				var angle = vect.heading();
				var len = vect.mag();
				
				if(!globalVar.displayArray[i][j].attractPtL.clocklwise && len < 100 && angle < Math.PI/4 && angle > 0){
					globalVar.displayArray[i][j].attractPtL = globalVar.attractPtR;
				}else{
					if(globalVar.displayArray[i][j].attractPtL.clockwise && len < 200 && angle < 3 * Math.PI/4 && angle > Math.PI/2){
						console.log(len);
						globalVar.displayArray[i][j].attractPtL = globalVar.attractPtL;
					}
				}
				
				
				if(i == 1 && globalVar.displayArray[i][j].isSelected()){
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
    var getInfo = require("./getInfo.js");
	//默认获取用户
	getInfo("users","特邀用户");
	
	//获取用户
	$("#getUsers").click(function(){
		getInfo("users","special_invitation");
	});
	
	//获取文章
	$("#getPosts").click(function(){
		getInfo("posts");
	});
	
	//排列
	$("#align").click(function (){
		var len = globalVar.mainButton.length;
		for(var k=0; k<len; k++){
			var i = Math.floor(k / 2) + 2;
			var j = k % 2 + 2;
			var options = {
				"position" : new p5.Vector(i*70,j*70),
				"strength" : 1.5
			}
			var attractPtL = new AttractPoint(options);
			globalVar.mainButton[k].attractPtL = globalVar.attractPtL;
			//globalVar.mainButton[k].strength = 1.5;
			globalVar.mainButton[k].vortex = false;
			//globalVar.mainButton[k].topspeed = 1;
		}
	});
	
});

//获取文章信息


//窗口尺寸改变
$(window).resize(function() {
	if($("#infoFrame_fixed").css("height") != "120px"){ //若高度大于停靠在下方是的高度时
		$("#infoFrame_fixed").css("height",document.documentElement.clientHeight - 60);
	}
	
	$("#infoFrame_xx").css("height",document.documentElement.clientHeight-80);
	//alert($("#infoFrame_fixed").css("height"));
});