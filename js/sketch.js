"use strict"; //严格模式

var AttractPoint = require("./AttractPoint.js");
var globalVar = require("./GlobalVar.js");
var VisualObject = require("./VisualObject.js");
var Particle = require("./Particle.js");
var ButtonPlus = require("./ButtonPlus.js");

var sketch = function(p){
	globalVar.pp = p;
	p.preload = function() {
		p.soundFormats('wav', 'ogg');
		globalVar.SOUNDFILE = p.loadSound('wp-content/themes/zbs/sound/water2.wav');

		var optionL = {
			"p":p,
			"position" : new p5.Vector(200,300),
			"strength" : 0.1,
			"vortex" : true
		};
		var optionR = {
			"p":p,
			"position" : new p5.Vector(700,300),
			"strength" : 0.1,
			"clockwise" : true,
			"vortex" : true
		};
		globalVar.attractPtL = new AttractPoint(optionL);
		globalVar.attractPtR = new AttractPoint(optionR);
	};
	p.setup = function(){
		p.createCanvas(960,600);
		p.canvas.id = "sketch_1";
		globalVar.displayArray.backgroundBall = [];
		for(var i = 0; i < 50; i++){
			var size = Math.random()*20 + 15;
			var optionsVO = {
				position : new p5.Vector(Math.random() * 900 + 10,Math.random() * 500 + 10),
				width : size,
				height : size,
				p : globalVar.pp
			}
			var options = {
				visualObject : new VisualObject(optionsVO),
				p : globalVar.pp
			}
			globalVar.displayArray.backgroundBall.push(new Particle(options));
		}
		
	};
	
	p.draw = function(){
		p.background(255);
		//globalVar.attractPt.display();
		//globalVar.attractPt.display();
		var buttonHoverCount = 0;
		for(var objType in globalVar.displayArray){
			if (objType === "ButtonParticle"){     //重新排序控制绘图顺序
				resortButtonParticle(globalVar.displayArray);
			}
			for(var i = 0, length = globalVar.displayArray[objType].length;i < length;i++){
				globalVar.displayArray[objType][i].display();
				// if(i === 1 && globalVar.displayArray[objType][i].visualObject.isSelected()){
				// 	buttonHoverCount++;
				// }
			}
		}
		

		// var num = new p5.Noise();
		// console.log(num);
		// if(buttonHoverCount > 0){
		// 	$(p.canvas).css("cursor","pointer");
		// }
	};	
	
};

var myp5 = new p5(sketch,'sketch');

function resortButtonParticle(bp){
	/**
	 * 为displayArray.ButtonParticle
	 */
	var newList = [],
		selectObj = null;
	for(var i = 0, len = bp.ButtonParticle.length; i < len; i++){
		if(bp.ButtonParticle[i].visualObject.pState === "mouseOut"){
			newList.push(bp.ButtonParticle[i]);
		}else{
			selectObj = bp.ButtonParticle[i];
		}
	}
	if(selectObj !== null){
		newList.push(selectObj);
	}
	bp.ButtonParticle = newList;
	
}

$(document).ready(function(){
	document.body.style.overflow = 'hidden';
    var getInfo = require("./getInfo.js");
	//默认获取用户
	getInfo("posts","special_invitation");
	
	//获取用户
	$("#getUsers").click(function(){    //相当于刷新，所有很多状态要重置
		ButtonPlus.stateReset();    //状态重置
		globalVar.alignState = false;    //状态重置

		var doc = document;                             ////重置infoFrame
		var infoFrame = doc.getElementById("infoFrame");
		if(infoFrame){
			infoFrame.style.visibility = "hidden";
		}

		getInfo("users","special_invitation");
	});
	
	//获取文章
	$("#getPosts").click(function(){   //相当于刷新，所有很多状态要重置
		ButtonPlus.stateReset();    //状态重置
		globalVar.alignState = false;    //状态重置

		var doc = document;            //重置infoFrame
		var infoFrame = doc.getElementById("infoFrame");
		if(infoFrame){
			infoFrame.style.visibility = "hidden";
		}

		getInfo("posts");
	});
	
	//排列
	$("#align").click(function (){
		globalVar.alignState = ~globalVar.alignState;
		var len = globalVar.displayArray.ButtonParticle.length;
		if (globalVar.alignState){
			for(var k = 0; k < len; k++){
				var i = k % globalVar.countPerRow + 2;
				var j = Math.floor(k / globalVar.countPerRow) + 2;
				
				var options = {
					"position" : new p5.Vector(i*70,j*70),
					"strength" : 1.5,
					"vortex" : false
				}
				var attractPt = new AttractPoint(options);
				globalVar.displayArray.ButtonParticle[k].attractPt = attractPt;
				globalVar.displayArray.ButtonParticle[k].vortexAttract = false;
			}
		}else{
			for(var k = 0; k < len; k++){
				globalVar.displayArray.ButtonParticle[k].attractPt = globalVar.attractPtL;
				globalVar.displayArray.ButtonParticle[k].vortexAttract = true;
			}
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