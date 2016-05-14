"use strict"; //严格模式

var AttractPoint = require("./AttractPoint.js");
var globalVar = require("./GlobalVar.js");
var VisualObject = require("./VisualObject.js");
var Particle = require("./Particle.js");
var ButtonPlus = require("./ButtonPlus.js");
var FilterButton = require("./FilterButton.js");

var sketch = function (p){
	globalVar.pp = p;
	p.preload = function () {
		try{
			p.soundFormats('wav', 'ogg');
			globalVar.SOUNDFILE = p.loadSound('wp-content/themes/zbs/sound/water2.wav');
		}catch(e){
			console.log(e.message);      //貌似ie不支持soundformats方法
		}

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
	p.setup = function (){
		p.createCanvas(960,600);
		p.canvas.id = "sketch_1";
		globalVar.displayArray.backgroundBall = [];
		for(var i = 0; i < 50; i++){
			var size = Math.random()*20 + 15;
			var optionsVO = {
				position : new p5.Vector(Math.random() * 900 + 10,Math.random() * 500 + 10),
				width : size,
				height : size,
				p : globalVar.pp,
				fillCol : globalVar.pp.color(200,200,200,50)
			};
			var options = {
				visualObject : new VisualObject(optionsVO),
				p : globalVar.pp
			};
			globalVar.displayArray.backgroundBall.push(new Particle(options));
		}
	};

	p.draw = function (){
		p.background(255);
		// globalVar.attractPtL.display();
		// globalVar.attractPtR.display();
		for(var objType in globalVar.displayArray){
			if (objType === "ButtonParticle"){     //重新排序控制绘图顺序
				resortButtonParticle(globalVar.displayArray);
				ButtonPlus.pushMatrix(globalVar.pp);
				globalVar.translate.x += (globalVar.transTarget.x - globalVar.translate.x) * 0.2;
				globalVar.translate.y += (globalVar.transTarget.y - globalVar.translate.y) * 0.2;
				ButtonPlus.translate(globalVar.translate.x, globalVar.translate.y, globalVar.pp);

				var totalHeight =  globalVar.displayArray[objType].length / globalVar.countPerRow * globalVar.cellSize;
				globalVar.transTarget.totalPage = totalHeight / p.height;
				 if (globalVar.translate.currentPage < globalVar.transTarget.totalPage - 1 && globalVar.alignState){
				 	$("#nextPage").fadeIn();
				 }else{
				 	$("#nextPage").fadeOut();
				 }
				 if (globalVar.translate.currentPage > 0 && globalVar.alignState){
				 	$("#perPage").fadeIn();
				 }else{
				 	$("#perPage").fadeOut();
				 }

			}

			for(var i = 0, length = globalVar.displayArray[objType].length;i < length;i++){
				globalVar.displayArray[objType][i].display();
			}

			if (objType === "ButtonParticle") {
				ButtonPlus.popMatrix(globalVar.pp);
			}
		}
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
		ButtonPlus.prototype.hoverObjCount += 1; //由于按钮是在FliterBar上，getInfo的时候被重置了，所以+1
	});
	
	//排列
	$("#align").click(function (){
		if (globalVar.alignState){
			globalVar.transTarget.x = 0;
			globalVar.transTarget.y = 0;
			globalVar.translate.currentPage = 0;
		}
		globalVar.alignState = ~globalVar.alignState;
		var len = globalVar.displayArray.ButtonParticle.length;
		if (globalVar.alignState){
			for(var k = 0; k < len; k++){
				var i = k % globalVar.countPerRow + 2;
				var j = Math.floor(k / globalVar.countPerRow) + 2;
				
				var options = {
					"position" : new p5.Vector(i * globalVar.cellSize,j * globalVar.cellSize),
					"strength" : 1.5,
					"vortex" : false
				};
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

	setSketch();   //设置sketch的位置。
});

function setSketch(){      //设置sketch的位置。
	var clientHeight = document.documentElement.clientHeight;
	var sketch = $("#sketch");
	var height = sketch.css("height");
	sketch.css("margin-top", ((parseInt(clientHeight) - parseInt(height) + 50) / 2) + "px");
}

$("body").click(function (e){
	if ($(e.target).is("#filterBar , #filterBarBtn , #filterBar button")){
		return;
	}else{
		//折叠FilterBar,并隐藏filterBarBtn
		$("#filter").slideUp("fast");
	}
});

//窗口尺寸改变
$(window).resize(function() {
	setSketch(); //设置sketch的位置。
	$("#infoFrame").css("width", $(window).width());
});

$("#filterBarBtn").mouseover(function (){
	$("#filter").slideDown("slow");
});


// firefox
document.body.addEventListener("DOMMouseScroll", function(event) {
	if (globalVar.alignState){
		var direction= event.detail && (event.detail > 0 ? "mousedown" : "mouseup");
		var direction = event.wheelDelta && (event.wheelDelta > 0 ? "mouseup" : "mousedown");
		if (direction === "mouseup"){
			if (globalVar.translate.currentPage > 0){
				globalVar.transTarget.y += 400;
				globalVar.translate.currentPage -= 1;
			}
		}else{
			if (globalVar.translate.currentPage < globalVar.transTarget.totalPage - 1){
				globalVar.transTarget.y -= 400;
				globalVar.translate.currentPage += 1;
			}
		}
	}    
});

// chrome and ie
document.body.onmousewheel = function (event) {
	if (globalVar.alignState){
		event = event || window.event;

		var direction = event.wheelDelta && (event.wheelDelta > 0 ? "mouseup" : "mousedown");
		if (direction === "mouseup"){
			if (globalVar.translate.currentPage > 0){
				globalVar.transTarget.y += 400;
				globalVar.translate.currentPage -= 1;
			}
		}else{
			if (globalVar.translate.currentPage < globalVar.transTarget.totalPage - 1){
				globalVar.transTarget.y -= 400;
				globalVar.translate.currentPage += 1;
			}
		}
	}
};

$("#nextPage").click(function (){
	if (globalVar.translate.currentPage < globalVar.transTarget.totalPage - 1){
		globalVar.transTarget.y -= 400;
		globalVar.translate.currentPage += 1;
	}
});

$("#perPage").click(function (){
	if (globalVar.translate.currentPage > 0){
		globalVar.transTarget.y += 400;
		globalVar.translate.currentPage -= 1;
	}
});

$("#filterT, #filterBarBtn").mouseover(function (){       //让鼠标选择不中FilterBar下面的button
	if (ButtonPlus.prototype.hoverObjCount < 1){
		ButtonPlus.prototype.hoverObjCount += 1;
	}
});

$("#filterT, #filterBarBtn").mouseout(function (){
	if (ButtonPlus.prototype.hoverObjCount > 0){
		ButtonPlus.prototype.hoverObjCount -= 1;
	}
});

var options_2010 = {
	id : "2010",
	text : "2010年",
	parentId : "year",
	keyword : "creationDate",
	value : "2010"
};

var options_2011 = {
	id : "2011",
	text : "2011年",
	parentId : "year",
	keyword : "creationDate",
	value : "2011"
};

var options_2012 = {
	id : "2012",
	text : "2012年",
	parentId : "year",
	keyword : "creationDate",
	value : "2012"
};

var options_2013 = {
	id : "2013",
	text : "2013年",
	parentId : "year",
	keyword : "creationDate",
	value : "2013"
};

var options_2014 = {
	id : "2014",
	text : "2014年",
	parentId : "year",
	keyword : "creationDate",
	value : "2014"
};

var options_2015 = {
	id : "2015",
	text : "2015年",
	parentId : "year",
	keyword : "creationDate",
	value : "2015"
};

var options_2016 = {
	id : "2016",
	text : "2016年",
	parentId : "year",
	keyword : "creationDate",
	value : "2016"
};

var options3 = {
	id : "qgbd",
	text : "情感表达",
	parentId : "type",
	keyword : "cat",
	value : "情感表达"
};
var options4 = {
	id : "gnyh",
	text : "功能优化",
	parentId : "type",
	keyword : "cat",
	value : "功能优化"
};
var options5 = {
	id : "shht",
	text : "社会话题",
	parentId : "type",
	keyword : "cat",
	value : "社会话题"
};
var options6 = {
	id : "clyy",
	text : "材料应用",
	parentId : "type",
	keyword : "cat",
	value : "材料应用"
};
var options7 = {
	id : "kjzp",
	text : "跨界作品",
	parentId : "type",
	keyword : "cat",
	value : "跨界作品"
};

var options8 = {
	id : "syxf",
	text : "实验先锋",
	parentId : "type",
	keyword : "cat",
	value : "实验先锋"
};

var options9 = {
	id : "rqyj",
	text : "人群研究",
	parentId : "type",
	keyword : "cat",
	value : "人群研究"
};

var options10 = {
	id : "syyy",
	text : "商业运用",
	parentId : "type",
	keyword : "cat",
	value : "商业运用"
};

var options11 = {
	id : "whcc",
	text : "文化传承",
	parentId : "type",
	keyword : "cat",
	value : "文化传承"
};

var options12 = {
	id : "qt",
	text : "其他",
	parentId : "type",
	keyword : "cat",
	value : "其他"
};

var options_sjcd = {
	id : "sjcd",
	text : "视觉传达",
	parentId : "major",
	keyword : "major",
	value : "视觉传达"
};

var options_gysj = {
	id : "gysj",
	text : "工业设计",
	parentId : "major",
	keyword : "major",
	value : "工业设计"
};

var options_fssj = {
	id : "fssj",
	text : "服饰设计",
	parentId : "major",
	keyword : "major",
	value : "服饰设计"
};

var options_jzyhy = {
	id : "jzyhy",
	text : "建筑与环艺/展示",
	parentId : "major",
	keyword : "major",
	value : "建筑与环艺(展示)"
};

var options_smdh = {
	id : "smdh",
	text : "数媒与动画",
	parentId : "major",
	keyword : "major",
	value : "数字多媒体与动画影像"
};

var options_ys = {
	id : "ys",
	text : "艺术",
	parentId : "major",
	keyword : "major",
	value : "艺术"
};

globalVar.filterButton.push(new FilterButton(options_2010));
globalVar.filterButton.push(new FilterButton(options_2011));
globalVar.filterButton.push(new FilterButton(options_2012));
globalVar.filterButton.push(new FilterButton(options_2013));
globalVar.filterButton.push(new FilterButton(options_2014));
globalVar.filterButton.push(new FilterButton(options_2015));
globalVar.filterButton.push(new FilterButton(options_2016));

globalVar.filterButton.push(new FilterButton(options3));
globalVar.filterButton.push(new FilterButton(options4));
globalVar.filterButton.push(new FilterButton(options5));
globalVar.filterButton.push(new FilterButton(options6));
globalVar.filterButton.push(new FilterButton(options7));
globalVar.filterButton.push(new FilterButton(options8));
globalVar.filterButton.push(new FilterButton(options9));
globalVar.filterButton.push(new FilterButton(options10));
globalVar.filterButton.push(new FilterButton(options11));
globalVar.filterButton.push(new FilterButton(options12));

globalVar.filterButton.push(new FilterButton(options_sjcd));
globalVar.filterButton.push(new FilterButton(options_gysj));
globalVar.filterButton.push(new FilterButton(options_fssj));
globalVar.filterButton.push(new FilterButton(options_jzyhy));
globalVar.filterButton.push(new FilterButton(options_smdh));
globalVar.filterButton.push(new FilterButton(options_ys));


var options_cancelAll = {
	id : "bcancelAll",
	type : "cancel",
	class : "cancel",
	parentId : "cancelAll",
	title: "全部取消",
	text : ""
};

globalVar.filterButton.push(new FilterButton(options_cancelAll));