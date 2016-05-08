/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict"; //严格模式

	var AttractPoint = __webpack_require__(1);
	var globalVar = __webpack_require__(5);
	var VisualObject = __webpack_require__(6);
	var Particle = __webpack_require__(4);
	var ButtonPlus = __webpack_require__(7);
	var FilterButton = __webpack_require__(9);

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
					p : globalVar.pp,
					fillCol : globalVar.pp.color(200,200,200,50)
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
	    var getInfo = __webpack_require__(10);
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

		setSketch();   //设置sketch的位置。

		//var $f2010 = $("#2010");
		//$f2010.click(function (){
		//	alert("2010");
		//	for(var i = 0, len = globalVar.displayArray.ButtonParticle.length; i < len; i++){
		//		if (globalVar.displayArray.ButtonParticle[i].visualObject.info["creationDate"] !== "2010"){
		//			console.log(globalVar.displayArray.ButtonParticle[i].visualObject.info["creationDate"]);
		//			globalVar.displayArray.ButtonParticle[i].visualObject.filtered = true;
		//		}
		//	}
		//});
	});

	function setSketch(){      //设置sketch的位置。
		var clientHeight = document.documentElement.clientHeight;
		var sketch = $("#sketch");
		var height = sketch.css("height");
		sketch.css("margin-top", ((parseInt(clientHeight) - parseInt(height)) / 2 - 50) + "px");
	}

	//窗口尺寸改变
	$(window).resize(function() {
		setSketch(); //设置sketch的位置。
	});

	$("#filterBarBtn").click(function (){
		$("#filter").slideToggle("slow");
	});

	var options = {
		node : document.getElementById("2010"),
		keyword : "creationDate",
		value : "2010"
	};

	var options2 = {
		node : document.getElementById("2015"),
		keyword : "creationDate",
		value : "2015"
	};

	var options3 = {
		node : document.getElementById("grqg"),
		keyword : "cat",
		value : "个人情感"
	};
	var options4 = {
		node : document.getElementById("gnyh"),
		keyword : "cat",
		value : "功能优化"
	};
	var options5 = {
		node : document.getElementById("shht"),
		keyword : "cat",
		value : "社会话题"
	};
	var options6 = {
		node : document.getElementById("clyyycx"),
		keyword : "cat",
		value : "材料应用与创新"
	};

	globalVar.filterButton.push(new FilterButton(options));
	globalVar.filterButton.push(new FilterButton(options2));
	globalVar.filterButton.push(new FilterButton(options3));
	globalVar.filterButton.push(new FilterButton(options4));
	globalVar.filterButton.push(new FilterButton(options5));
	globalVar.filterButton.push(new FilterButton(options6));




/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * 吸引点
	 */
	var ButtonParticle = __webpack_require__(2);

	var AttractPoint = function (options){
		this.position = options.position.copy();
		//this.strength = options.strength;
		this.p = options.p;
		this.clockwise = options.clockwise || false;
		this.vortex = options.vortex || false;
	}

	AttractPoint.prototype.attract = function (options){
		var force = this.vortex ? this.vortexAttract(options) : this.linearAttract(options);
		return force;
	}

	AttractPoint.prototype.linearAttract = function (options){
		if(options.b instanceof ButtonParticle){
			var force = p5.Vector.sub(this.position,options.b.visualObject.position);
			var dist = force.mag();
			force.normalize();
			force.mult(dist * 0.618);
			return force;
		}
	}
	AttractPoint.prototype.vortexAttract = function (options){
		if(options.b instanceof ButtonParticle){
			var force = p5.Vector.sub(this.position,options.b.visualObject.position);
			
			var ff = force.copy();
			if(this.clockwise){
				ff.rotate(-Math.PI/2);
			}else{
				ff.rotate(Math.PI/2);
			}
			ff.setMag(options.threshold);
			force.add(ff);
			force.limit(1);
			return force;
		}
	}

	AttractPoint.prototype.display = function(){
		this.p.fill(200);
		this.p.ellipse(this.position.x,this.position.y,50,50);
	}

	module.exports = AttractPoint;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var util = __webpack_require__(3);
	var Particle = __webpack_require__(4);
	var globalVar = __webpack_require__(5);

	var ButtonParticle = function (options){
		Particle.call(this,{
			visualObject : options.visualObject,   //visualObject为实现了display方法的对象
			p : options.p,
			reflect : false,
			topspeed : options.topspeed,   //控制最高速度
			acceleration : options.acceleration,
			velocity : options.velocity
		})
		//this.strength = 0.1;
		this.vortexAttract = options.vortexAttract || true;   //vortexAttract确定button是被直线吸引还是漩涡吸引
		this.xoff = Math.random() * 10;    //用于生产noise随机数
	}
	util.inheritPrototype(ButtonParticle, Particle);

	//粒子作用力
	ButtonParticle.prototype.applyForce = function(force){
		this.acceleration.add(force);
	}

	//更新粒子状态
	ButtonParticle.prototype.update = function(){
		if (this.attractPt){
			var vect = p5.Vector.sub(this.visualObject.position,this.attractPt.position);
			var len = vect.mag();
			if (this.vortexAttract){                  //两种吸引方式，两种运动模式
				var options = {
					b : this,
					threshold : 400 
				}
				var force = this.attractPt.attract(options);   //引力与漩涡力
				this.applyForce(force);
				
				var randomVect = this.velocity.copy();   //影响运行路径的随机向量防止所以的button都在运行一模一样的路径
				randomVect.mult(0.1);    
				
				this.xoff += 0.01;    
				var effectAngle = (this.p.noise(this.xoff) - 0.5) * 2    //-1 to 1
				* (Math.PI / 2 * 0.1);  
				randomVect.rotate(effectAngle);
				this.velocity.add(randomVect);
				
				if (this.reflect){
					if(this.visualObject.position.x < this.visualObject.width/2 || this.visualObject.position.x > this.p.width - this.visualObject.width/2){
						this.velocity.x *= -1;
					}
					if(this.visualObject.position.y < this.visualObject.height/2 || this.visualObject.position.y > this.p.height - this.visualObject.height/2){
						this.velocity.y *= -1;
					}
				}
				//无限符号（∞）运动路径的实现
				var angle = vect.heading();
				
				if(!this.attractPt.clocklwise && len < 100 && angle < Math.PI/4 && angle > 0){
					this.attractPt = globalVar.attractPtR;
				}else{
					if(this.attractPt.clockwise && len < 200 && angle < 3 * Math.PI/4 && angle > Math.PI/2){
						this.attractPt = globalVar.attractPtL;
					}
				}
				this.velocity.add(this.acceleration);   //更新速度
				this.velocity.limit(this.topspeed);    //限制最高速度
				this.acceleration.mult(0);  //加速度清零
			}else{       //align模式的吸引方式（easing）
				vect.mult(-0.1);
				this.velocity = vect;
			}
		}
		this.visualObject.position.add(this.velocity);   //更新位置
	}

	//绘制粒子
	ButtonParticle.prototype.display = function(){
		if(this.visualObject.pState != "click" && this.visualObject.pState != "hover" && this.visualObject.pState != "press"){
			this.update();
		}
		this.visualObject.display();
	}

	module.exports = ButtonParticle;

/***/ },
/* 3 */
/***/ function(module, exports) {

	/**
	 * 工具包
	 */
	var util = {
		//用于继承
		inheritPrototype : function (subType,superType){
			var prototype = this.object(superType.prototype);
			prototype.constructor = subType;
			subType.prototype = prototype;
		},
		object : function (o){
			function F(){}
			F.prototype = o;
			return new F();
		},
		
		//用于获取元素的绝对位置
		getElementLeft : function (element){
			var actualLeft = element.offsetLeft;
			var current = element.offsetParent;
			while (current !== null){
				actualLeft += current.offsetLeft;
				current = current.offsetParent;
			}
			return actualLeft;
		},
		getElementTop : function (element){
			var actualTop = element.offsetTop;
			var current = element.offsetParent;
			while (current !== null){
				actualTop += current.offsetTop;
				current = current.offsetParent;
			}
			return actualTop;
		},
		
		getJsonObjLength : function (jsonObj) {
			var Length = 0;
			for (var item in jsonObj) {
			Length++;
			}
			return Length;
		}
		
	}

	module.exports = util;







/***/ },
/* 4 */
/***/ function(module, exports) {

	var Particle = function (options){
		this.visualObject = options.visualObject;   //visualObject为实现了position属性与display方法的对象
		this.p = options.p;
		this.reflect = false;
		this.topspeed = options.topspeed || Math.random() * 3 + 2;  //控制最高速度
	    this.acceleration = options.acceleration ?  options.acceleration.copy() : new p5.Vector(0,0);  //加速度
	    this.velocity = options.velocity ?  options.velocity.copy() : new p5.Vector(    //速度
	        Math.random()*((Math.random()>0.5)?-0.5:0.5),
	        Math.random()-((Math.random()>0.5)?0.5:1)
	    );
	}

	//粒子作用力
	Particle.prototype.applyForce = function(force){
		this.acceleration.add(force);
	}

	//更新粒子状态
	Particle.prototype.update = function(){
		//速度
		if(!this.velocity){
			var random1 = Math.random()*((Math.random()>0.5)?-0.5:0.5);
			var random2 = Math.random()-((Math.random()>0.5)?0.5:1);
			this.velocity = new p5.Vector(random1,random2);
		}
		
		this.velocity.add(this.acceleration);
		this.acceleration.mult(0);  //加速度清零
		
		if(this.reflect){
			if(this.visualObject.position.x < this.visualObject.width/2 || this.visualObject.position.x > this.p.width - this.visualObject.width/2){
				this.velocity.x *= -1;
			}
			if(this.visualObject.position.y < this.visualObject.height/2 || this.visualObject.position.y > this.p.height - this.visualObject.height/2){
				this.velocity.y *= -1;
			}
		}else{
	        if(this.visualObject.position.x < -this.visualObject.width/2){
	            this.visualObject.position.x = this.p.width + this.visualObject.width - Math.abs(this.visualObject.position.x);
	        } 
	        if(this.visualObject.position.x > this.p.width + this.visualObject.width/2){
				this.visualObject.position.x = this.visualObject.position.x - this.p.width - this.visualObject.width;
			}
	        if(this.visualObject.position.y < -this.visualObject.height/2){
	            this.visualObject.position.y = this.p.height + this.visualObject.height - Math.abs(this.visualObject.position.y);
	        }
	        if(this.visualObject.position.y > this.p.height + this.visualObject.height/2){
				this.visualObject.position.y = this.visualObject.position.y - this.p.height - this.visualObject.height;
			}
	    }
		
		this.velocity.limit(this.topspeed);

		this.visualObject.position.add(this.velocity);
	}

	//绘制粒子
	Particle.prototype.display = function(){
		this.update();
		this.visualObject.display();
	}

	module.exports = Particle;

/***/ },
/* 5 */
/***/ function(module, exports) {

	/**
	 * infinite程序内部全局变量
	 */

	var GlobalVar = {
	    displayArray : [],
	    filterButton : [],
	    SOUNDFILE : null,
	    pp : null,
	    alignState : false,
	    attractPtL : null,
	    attractPtR : null,
	    countPerRow : 8   //align模式时，每行的button数量
	}

	module.exports = GlobalVar;

/***/ },
/* 6 */
/***/ function(module, exports) {

	/**
	 * VisualObject
	 * by:Zzzz
	 * date:2016-05-03
	 */
	var VisualObject = function (options) {
		this.position = options.position.copy();  //位置
		this.width = options.width;  //宽度
		this.height = options.height;  //高度
		this.p = options.p;  //p5实例 
		this.fillCol = options.fillCol || this.p.color(200,200,200,100);
	}

	VisualObject.prototype.update = function(){
	}

	//根据不同的状态绘制Button
	VisualObject.prototype.display = function () {
		this.update();
		this.drawGeometry();
	}

	// 绘制几何图形
	VisualObject.prototype.drawGeometry = function () {
		this.strokeCol ? this.p.stroke(this.strokeCol) : this.p.noStroke();
		this.p.fill(this.fillCol);
		this.p.push();
		this.p.translate(this.position.x, this.position.y);
		this.p.ellipse(0, 0, this.width, this.height);
		this.p.pop();
	}


	module.exports = VisualObject;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/*
	基于p5.js,Button
	by:Zzzz
	date:2016-03-03
	*/
	var Button = __webpack_require__(8);
	var util = __webpack_require__(3);

	function ButtonPlus(options) {
		Button.call(this, options);
		this.breath = false;  //是否开启呼吸效果
		this.breathState = false;  //呼吸状态
		this.w = options.width;  //原始宽度数据备份
		this.h = options.height;  //原始高度数据备份
		this.clickTimeline = 0;   //On状态的时间轴
		this.geometryType = "circle";
		this.maxWidth = 100;
		this.filtered = false;   //用于过滤
	}
	util.inheritPrototype(ButtonPlus, Button);

	//统计ButtonPlus实例被选中个数，主要目的在于控制每次只能选择一个Button
	ButtonPlus.prototype.hoverObjCount = 0;

	//判断ButtonPlus是否被选中（加强版）
	ButtonPlus.prototype.isSelected = function () {
		if (this.filtered){     //假如被排除了，那么所有的状态都为未选中（亦即永远选不中）
			return false;
		}
		var width = this.width > 40 ? this.width : 40;
		var height = this.width > 40 ? this.width : 40;
		if (this.width === this.height && this.geometryType === "circle") {
			if (Math.pow((this.p.mouseX - this.position.x), 2) + Math.pow((this.p.mouseY - this.position.y), 2) <= Math.pow(width / 2, 2)) {
				return true;
			} else {
				return false;
			}
		} else {
			if (this.p.mouseX >= this.position.x - width / 2 && this.p.mouseX <= this.position.x + width / 2 && this.p.mouseY >= this.position.y - height / 2 && this.p.mouseY <= this.position.y + height / 2) {
				return true;
			} else {
				return false;
			}
		}
	};

	//判断ButtonPlus的状态（加强版）
	ButtonPlus.prototype.getState = function () {
		/**
		 * hover (pState) ： 鼠标悬浮（被选中）
		 * press (pState) ： 鼠标按下
		 * click (pState) ： 鼠标点击
		 * mouseOut (pState) ： 鼠标从button上移开/未被选中
		 * on (pSwitch) : Button处于开启状态
		 * off (pSwitch) ： Button处于关闭状态
		 */
		if (this.isSelected()) {
			if (this.pState == "click") {
				if (this.p.mouseIsPressed) {
					if (this.pState != "mouseOut") {
						return "press";
					} else {
						return;
					}
				} else {
					return "click";
				}
			} else {
				if (this.constructor.prototype.hoverObjCount <= 0 || this.pState != "mouseOut") {
					if (this.p.mouseIsPressed) {
						if (this.pState == "mouseOut") {
							return "mouseOut";
						} else {	
							//如果button的大小小于90,则不出现press状态
							if(this.width >= this.maxWidth - 10){
								return "press";
							}else{
								return "hover"
							}
						}
					} else {
						if (this.pState == "press") {
							if (this.pSwitch == "on") {
								this.pSwitch = "off";
								this.fire({ type: "turnOff" });
								return "hover";
							} else {

								this.pSwitch = "on";
								this.fire({ type: "turnOn" });
								return "click";

							}
						} else {
							if (this.pState != "hover") {
								//first
								this.constructor.prototype.hoverObjCount += 1;
							}
							return "hover";
						}
					}
				} else {
					return "mouseOut";
				}
			}
		} else {
			if (this.pState == "click") {
				return "click";
			} else {
				if (this.p.mouseIsPressed && this.pSwitch == "on") {
					this.pSwitch = "off";
					this.fire({ type: "turnOff" });
				}
				if (this.pState == "hover" || this.pState == "press") {
					this.constructor.prototype.hoverObjCount -= 1;
				}
				return "mouseOut";
			}
		}
	};

	//根据不同的状态绘制ButtonPlus（加强版）
	ButtonPlus.prototype.display = function () {
		//this.update();
		if (this.strokeCol) {
			this.p.stroke(this.strokeCol);
		} else {
			this.p.noStroke();
		}

		this.p.rectMode('center');
		this.state = this.getState();
		this.cursorState(this.state);  //鼠标状态
		switch (this.state) {
			case "hover":
				//音效
				if (this.pState == "mouseOut") {         //首次hover
					if (this.sound) this.sound.play();
				}
				this.fillCol = this.buttonCol;
				//this.p.fill(this.fillCol);
				this.drawObj();
				if (this.width > this.maxWidth) {
					this.breath = true;
				}

				var s = 1.1;
				if (this.breath) {
					//呼吸效果
					if (!this.breathState && this.width <= this.maxWidth) {
						this.width *= 1.002;
						this.height *= 1.002;
					} else {
						this.breathState = true;
					}
					if (this.breathState && this.width > this.maxWidth - 10) {
						this.width *= 0.995;
						this.height *= 0.995;
					} else {
						this.breathState = false;
					}
				} else {
					//放大
					if (this.width <= this.maxWidth) {
						this.width *= s;
						this.height *= s;
					} else {

					}
				}

				this.fire({ type: "hover" });
				this.pState = "hover";
				break;
			case "mouseOut":
				if (this.buttonCol) {
					this.fillCol = this.buttonCol;
				}
				this.drawObj();
				this.breath = false;

				//缩小
				var s = 0.95;
				if (this.width > this.w) {
					this.width *= s;
					this.height *= s;
				}

				this.fire({ type: "mouseOut" });
				this.pState = "mouseOut";
				break;
			case "press":
				this.fillCol = this.pressCol;
				this.drawObj();
				this.fire({ type: "press" });
				this.pState = "press";
				break;
			case "click":
				this.fillCol = this.clickCol;
				this.drawObj();

				//点击反馈
				if (this.pState === "press") {
					this.clickTimeline = 0;
				} else {
					this.clickTimeline++;
				}
				if (this.clickTimeline < 40) {
					this.p.stroke(200, 200, 200, 200 - this.clickTimeline * 5);
					this.p.strokeWeight(10 - this.clickTimeline / 4);
					this.p.noFill();
					this.p.ellipse(this.position.x, this.position.y, this.width + Math.sqrt(this.clickTimeline * 50, 2), this.height + Math.sqrt(this.clickTimeline * 50, 2));
				}


				this.fire({ type: "click" });
				this.pState = "click";
				break;
			default:
				if (this.buttonCol) {
					this.fillCol = this.buttonCol;
				} else {
					this.fillCol = this.p.color(0, 0, 100);
				}
				this.drawObj();
		}
	};

	//ButtonPlus状态重置
	ButtonPlus.stateReset = function () {
		this.prototype.hoverObjCount = 0;
	};

	ButtonPlus.prototype.drawObj = function (){
		if (this.filtered){
			this.drawFilteredObj();
		}else{
			this.drawGeometry();
		}
	}

	ButtonPlus.prototype.drawFilteredObj = function (){
		//this.strokeCol ? this.p.stroke(this.strokeCol) : this.p.noStroke();
		this.p.fill(this.p.color(150,150,150));
		this.p.push();
		this.p.translate(this.position.x, this.position.y);
		this.p.ellipse(0, 0, this.width, this.height);
		this.p.pop();
	}

	module.exports = ButtonPlus;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Button类，基于p5.js
	 * by:Zzzz
	 * date:2016-03-03
	 */

	var util = __webpack_require__(3);
	var VisualObject = __webpack_require__(6);

	var Button = function (options) {
		VisualObject.call(this,{
			position : options.position,  //位置
			width : options.width,   //宽度
			height : options.height,  //高度
			p : options.p,  //p5实例
			fillCol : options.fillCol
		});
		this.pState = "mouseOut";  //Button初始状态
		this.state;
		this.pSwitch = "off";   //Button初始状态
		this.hoverCol = options.hoverCol || this.p.color("#06799F");  //鼠标悬浮时Button的颜色
		this.pressCol = options.pressCol || this.p.color("#216278");  //鼠标按下时Button的颜色
		this.clickCol = options.clickCol || this.p.color("#024E68");  //Button处于on状态时的颜色
		this.positions = [];  //储存位置
		this.handlers = {};  //事件处理程序
	}
	util.inheritPrototype(Button, VisualObject);

	//判断Button是否被选中
	Button.prototype.isSelected = function () {
		if (this.p.mouseX >= this.position.x - width / 2 && this.p.mouseX <= this.position.x + width / 2 && this.p.mouseY >= this.position.y - height / 2 && this.p.mouseY <= this.position.y + height / 2) {
			return true;
		} else {
			return false;
		}
	}

	//判断Button的状态
	Button.prototype.getState = function () {
		/**
		 * hover (pState) ： 鼠标悬浮（被选中）
		 * press (pState) ： 鼠标按下
		 * click (pState) ： 鼠标点击
		 * mouseOut (pState) ： 鼠标从button上移开/未被选中
		 * on (pSwitch) : Button处于开启状态
		 * off (pSwitch) ： Button处于关闭状态
		 */
		if (this.isSelected()) {
			if (this.pState == "click") {
				if (this.p.mouseIsPressed) {
					return "press";
				} else {
					return "click";
				}
			} else {
				if (this.p.mouseIsPressed) {
					return "press";
				} else {
					if (this.pState == "press") {
						if (this.pSwitch == "on") {
							this.pSwitch = "off";
							return "hover";
						} else {
							this.pSwitch = "on";
							return "click";
						}
					} else {
						return "hover";
					}
				}
			}
		} else {
			if (this.pState == "click") {
				return "click";
			} else {
				return "mouseOut";
			}
		}
	}

	//鼠标指针图形
	Button.prototype.cursorState = function(state){
		if(this.constructor.prototype.hoverObjCount == 0){
			$(this.p.canvas).css("cursor","default");
		}else{
			if(state != "mouseOut"){
				if(this.isSelected()){
					$(this.p.canvas).css("cursor","pointer");
				}else{
					$(this.p.canvas).css("cursor","default");
				}
			}
		}
	}

	Button.prototype.update = function(){
	}

	//根据不同的状态绘制Button
	Button.prototype.display = function () {
		//this.update();
		if (this.strokeCol) {
			this.p.stroke(this.strokeCol);
		} else {
			this.p.noStroke();
		}
		this.p.rectMode('center');
		this.tate = this.getState();
		switch (this.tate) {
			case "hover":
				this.fillCol = this.hoverCol;
				this.drawGeometry();
				this.fire({ type: "hover" });
				this.pState = "hover";
				break;
			case "mouseOut":
				if (this.buttonCol) {
					this.fillCol = this.buttonCol;
				} else {
					this.fillCol = this.p.color(0, 0, 100);
				}
				this.drawGeometry();
				this.fire({ type: "mouseOut" });
				this.pState = "mouseOut";
				break;
			case "press":
				this.fillCol = this.pressCol;
				this.drawGeometry();
				this.fire({ type: "press" });
				this.pState = "press";
				break;
			case "click":
				this.fillCol = this.clickCol;
				this.drawGeometry();
				this.fire({ type: "click" });
				this.pState = "click";
				break;
			default:
				if (this.buttonCol) {
					this.fillCol = this.buttonCol;
				} else {
					this.fillCol = this.p.color(0, 0, 100);
				}
				this.drawGeometry();
		}
	}


	//事件相关
	Button.prototype.addHandler = function (type, handler) {
		if (typeof this.handlers[type] == "undefined") {
			this.handlers[type] = [];
		}
		this.handlers[type].push(handler);
	}
	Button.prototype.fire = function (event) {
		if (!event.target) {
			event.target = this;
		}
		if (this.handlers[event.type] instanceof Array) {
			var handlers = this.handlers[event.type];
			for (var i = 0, len = handlers.length; i < len; i++) {
				handlers[i](event);
			}
		}
	}
	Button.prototype.removeHandler = function (type, handler) {
		if (this.handlers[type] instanceof Array) {
			var handlers = this.handlers[type];
			for (var i = 0, len = handlers.length; i < len; i++) {
				if (handers[i] === handler) {
					break;
				}
			}
			handlers.splice(i, 1);
		}
	}


	module.exports = Button;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by zhang on 2016/5/8 0008.
	 */
	var globalVar = __webpack_require__(5);
	var ButtonPlus = __webpack_require__(7);

	var FilterButton = function (options){
	    this.keyword = options.keyword;
	    this.value = options.value;
	    this.switch = false;

	    if (options.node){
	        this.node = options.node;
	    }else{
	        this.id = options.id;
	        this.text = options.text || "FilterButton";
	        this.parentId = options.parentId;
	        this.createElement();
	    }
	    this.node.classList += "FilterButton";
	    this.attachEvent();
	};

	FilterButton.prototype.createElement = function (){
	    var doc = document;
	    this.node = doc.createElement("a");
	    this.node.id = this.id;
	    this.node.innerHTML = this.text;
	    this.parentId ? doc.getElementById(options.parentId).appendChild(this.node) : doc.body.appendChild(this.node);
	};

	FilterButton.prototype.doFilter = function (){
	    var BP = globalVar.displayArray.ButtonParticle;

	    for (var j = 0; j < globalVar.filterButton.length; j++){     //将全局环境中的其他FilterButton的switch全部设置为false,并修改按钮背景颜色
	        if (globalVar.filterButton[j] !== this){
	            globalVar.filterButton[j].switch = false;
	            globalVar.filterButton[j].node.parentNode.classList.remove("active");
	        }
	    }

	    for(var i = 0, len = BP.length; i < len; i++){
	        BP[i].visualObject.filtered = false;
	    }

	    if (this.switch){
	        for(i = 0, len = BP.length; i < len; i++){
	            if (BP[i].visualObject.info[this.keyword] !== this.value){
	                if(BP[i].visualObject.pState === "click"){
	                    BP[i].visualObject.pState = "mouseOut";       //fliter切换后，将之前“click”状态的button改为普通状态，即状态重置
	                    ButtonPlus.prototype.hoverObjCount = 0;        //选中个数也必须重置
	                    BP[i].visualObject.fire({ type: "turnOff" });     //ButtonPlus触发turnOff事件
	                }
	                BP[i].visualObject.filtered = true;
	            }
	        }
	    }
	};

	FilterButton.prototype.attachEvent = function (){
	    this.node.onclick = function (){
	        this.switch = ~this.switch;

	        if (this.switch){                   //切换FilterButton的显示效果
	            this.node.parentNode.classList.add("active");
	        }else{
	            this.node.parentNode.classList.remove("active");
	        }

	        this.doFilter();
	    }.bind(this);
	}

	module.exports = FilterButton;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	
	var eventHandleFunc = __webpack_require__(11);
	var util = __webpack_require__(3);
	var globalVar = __webpack_require__(5);
	var ButtonParticle = __webpack_require__(2);
	var ButtonPlus = __webpack_require__(7);

	var getInfo = function (type,arg){
		globalVar.displayArray.ButtonParticle = [];
		
		if(window.XMLHttpRequest){
			XMLHTTP=new XMLHttpRequest();
		}else{
			XMLHTTP=new ActiveXObject("Microsoft.XMLHTTP");
		}

		if(type === "posts"){
			XMLHTTP.onreadystatechange=function(){
				if(XMLHTTP.readyState==4 && XMLHTTP.status==200){
					var posts = JSON.parse(XMLHTTP.responseText);
					//alert(XMLHTTP.responseText);
					//console.log(XMLHTTP.responseText);
					
					for(var item in posts){
						var size = Math.random()*20 + 15;
						var options = {
							position : new p5.Vector(Math.random() * 900 + 10,Math.random() * 500 + 10),
							width : size,
							height : size,
							r : 25,
							p : globalVar.pp
						};
						var optionsBP = {
							visualObject : new ButtonPlus(options),
							p : globalVar.pp,
							vortexAttract : true
						};
						
						var newObj = new ButtonParticle(optionsBP);
						newObj.attractPt = globalVar.attractPtL;
						newObj.reflect = true;

						newObj.visualObject.addHandler("click",eventHandleFunc.clicked_animation);
						newObj.visualObject.addHandler("turnOn",eventHandleFunc.showPostInfo);
						newObj.visualObject.addHandler("turnOff",eventHandleFunc.hideInfoFrame);

						newObj.visualObject.sound = globalVar.SOUNDFILE;
						newObj.visualObject.info = posts[item];
						newObj.visualObject.buttonCol = newObj.visualObject.info["color"] || newObj.visualObject.p.color(Math.random() * 255, Math.random() * 255, Math.random() * 255);
						globalVar.displayArray.ButtonParticle.push(newObj);
					}
					
					
					//console.log(globalVar.displayArray.ButtonParticle);
				}
			}
			XMLHTTP.open("GET","wp-content/themes/zbs/getPostInfo.php");
			XMLHTTP.send();
		}else{
			if(type === "users"){
				XMLHTTP.onreadystatechange=function(){
					if(XMLHTTP.readyState==4 && XMLHTTP.status==200){
						var users = JSON.parse(XMLHTTP.responseText);
						//alert(XMLHTTP.responseText);
						//console.log(XMLHTTP.responseText);
						
						var i = 0;
						var count = util.getJsonObjLength(users);
						for(var item in users){
							var size = Math.random()*20 + 20;
							var options = {
								position : new p5.Vector(Math.random()*900+30, Math.random()*550+25),
								width : size,
								height : size,
								r : 25,
								p : globalVar.pp
							}
							var optionsBP = {
								visualObject : new ButtonPlus(options),
								p : globalVar.pp,
								vortexAttract : true
							}
							var newObj = new ButtonParticle(optionsBP);
							if(i < count/2){
								newObj.attractPt = globalVar.attractPtL;
							}else{
								newObj.attractPt = globalVar.attractPtR;
							}

							newObj.visualObject.buttonCol = globalVar.pp.color(Math.random()*100, Math.random()*50, Math.random()*200,255);
							newObj.reflect = true;
							newObj.visualObject.addHandler("click",eventHandleFunc.clicked_animation);
							newObj.visualObject.addHandler("turnOn",eventHandleFunc.hideSortUserInfo);
							newObj.visualObject.addHandler("turnOn",eventHandleFunc.showUserInfo);
							newObj.visualObject.addHandler("turnOff",eventHandleFunc.hideInfoFrame);
							newObj.visualObject.addHandler("hover",eventHandleFunc.showSortUserInfo);
							newObj.visualObject.addHandler("mouseOut",eventHandleFunc.hideSortUserInfo);
							newObj.visualObject.sound = globalVar.SOUNDFILE;
							newObj.visualObject.info = users[item];
							
							globalVar.displayArray.ButtonParticle.push(newObj);
							i++;
						}
						i = null;
						count = null;
						
						
						
						
				
						
					}
				}
				XMLHTTP.open("GET","wp-content/themes/zbs/getUserInfo.php" + "?userRole=" + arg);
				XMLHTTP.send();
			}
		}
		
	}


	module.exports = getInfo;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * 定义与Button绑定的事件处理程序
	 */
	var util = __webpack_require__(3);
	var getPostContent = __webpack_require__(12);

	var eventHandleFunc = {
	    // clicked : function (event){
	    //     event.target.p.noStroke();
	    //     event.target.p.fill(0);
	    //     event.target.p.textAlign("center");
	    //     var text;
	    //     text = event.target.info['title'];
	    //     if(text){
	    //         event.target.p.text(text,event.target.position.x,event.target.position.y);
	    //     }	
	    // },

	    clicked_animation : function (event){
	        event.target.p.noStroke();
	        event.target.p.fill(0);
	        event.target.p.textAlign("center");
	        event.target.p.stroke(255);
	        event.target.p.strokeWeight(5);
	        event.target.p.push();
	        event.target.p.translate(event.target.position.x,event.target.position.y);
	        if(event.target.clickTimeline < 40){
	            event.target.p.rotate(event.target.p.map(event.target.clickTimeline,0,40,0,Math.PI/4));
	        }else{
	            event.target.p.rotate(Math.PI/4);
	        }
	        event.target.p.line(-12,0,12,0);
	        event.target.p.line(0,-12,0,12);
	        event.target.p.pop();
	    },

	    showSortUserInfo : function (event){
	        if(event.target.pState !== "hover"){
	            var sketch = document.getElementById("sketch");
	            var top = util.getElementTop(sketch);
	            var left = util.getElementLeft(sketch);

	            var sortInfoFrame = document.getElementById("sortInfoFrame");
	            if(sortInfoFrame){
	                sortInfoFrame.style.visibility = "visible";
	                sortInfoFrame.innerHTML = "";
	            }else{
	                sortInfoFrame = document.createElement("div");
	                sortInfoFrame.id = "sortInfoFrame";
	            }
	            sortInfoFrame.style.top = top+event.target.position.y-50 + "px";
	            sortInfoFrame.style.left = left+event.target.position.x+50 + "px";

	            var img = document.createElement("img");
	            img.src = event.target.info['avatar'];
	            img.style.cssText = "width:100px;height:100px;border-radius:5px;-moz-border-radius:5px;";
	            sortInfoFrame.appendChild(img);

	            var name = document.createElement("div");
	            name.innerHTML = "<b>名字：</b>" + event.target.info['name'];
	            name.style.cssText = "margin-top:20px";
	            sortInfoFrame.appendChild(name);

	            document.body.appendChild(sortInfoFrame);
	        }

	    },

	    hideSortUserInfo : function (event){
	        if (event.target.hoverObjCount === 0 || event.target.state === "press") {
	            var doc = document;
	            var sortInfoFrame = doc.getElementById("sortInfoFrame");
	            if(sortInfoFrame){
	                sortInfoFrame.style.visibility = "hidden";
	            }
	        }
	    },

	    showUserInfo : function (event){
	        var doc = document;
	        var sketch = document.getElementById("sketch");

	        var infoFrame = document.getElementById("infoFrame");
	        if(infoFrame){
	            infoFrame.style.visibility = "visible";
	            infoFrame.innerHTML = "";    //清空
	        }else{
	            infoFrame = document.createElement("div");
	            infoFrame.id = "infoFrame";
	        }

	        var introduction = doc.createElement("div");
	        introduction.id = "introduction";

	            var avatar = doc.createElement("img");      //avatar
	            avatar.src = event.target.info['avatar'];
	            avatar.width = 80;
	            avatar.height = 80;
	            avatar.alt = event.target.info['name'];

	            var infoContainer = doc.createElement("div");
	            infoContainer.id = "infoContainer";

	                var name = doc.createElement("div");     //title
	                name.id += "name";
	                name.innerHTML = "<h2>" + event.target.info['name'] + "</h2>";

	                var ps = event.target.info['posts'];
	                var fragment = doc.createDocumentFragment();
	                for(var i=0;i<ps.length;i++){
	                    var posts = doc.createElement("div");     //author
	                    posts.className += "postMeta";
	                    posts.title = "posts";
	                    //posts.id = "getPostContentButton" + ps[i].id;
	                    posts.innerHTML = ps[i].title;
	                    posts.data_id = ps[i].id;
	                    posts.onclick = function (){
	                        getPostContent(this.data_id,true);
	                    };
	                    fragment.appendChild(posts);
	                }

	        infoContainer.appendChild(name);
	        infoContainer.appendChild(fragment);

	        introduction.appendChild(avatar);
	        introduction.appendChild(infoContainer);

	        infoFrame.appendChild(introduction);
	        doc.body.appendChild(infoFrame);
	    },

	    showPostInfo : function (event){
	        var doc = document;
	        var infoFrame = doc.getElementById("infoFrame");    //infoFrame
	        if(infoFrame){
	            infoFrame.style.visibility = "visible";
	            infoFrame.innerHTML = "";    //清空
	        }else{
	            infoFrame = doc.createElement("div");
	            infoFrame.id = "infoFrame";
	        }

	        var introduction = doc.createElement("div");
	        introduction.id = "introduction";

	            var thumbnail = doc.createElement("img");      //thumbnail
	            thumbnail.src = event.target.info['thumbnail'];
	            thumbnail.width = 80;
	            thumbnail.height = 80;
	            thumbnail.alt = event.target.info['title'];

	            var infoContainer = doc.createElement("div");
	            infoContainer.id = "infoContainer";

	                var title = doc.createElement("div");     //title
	                title.onclick = function (){
	                    getPostContent(event.target.info['id'], false);  //false : no title
	                };
	                title.id += "title";
	                title.innerHTML = "<h2>" + event.target.info['title'] + "</h2>";

	                var author = doc.createElement("div");     //author
	                author.className += "postMeta";
	                author.title = "author";
	                author.innerHTML = "作者：" + event.target.info['author'];

	                var productType = doc.createElement("div");
	                productType.className += "postMeta";
	                productType.title = "productType";
	                productType.innerHTML = "作品类型：" + (event.target.info['productType'] || "-----");

	                var major = doc.createElement("div");
	                major.className += "postMeta";
	                major.title = "major";
	                major.innerHTML = "专业：" + (event.target.info['major'] || "---") + "-" + (event.target.info['subMajor'] || "---");

	                var creationDate = doc.createElement("div");
	                creationDate.className += "postMeta";
	                creationDate.title = "creationDate";
	                creationDate.innerHTML = "创作年份：" + (event.target.info['creationDate'] || "-----") + "年";

	        infoContainer.appendChild(title);
	        infoContainer.appendChild(author);
	        infoContainer.appendChild(productType);
	        infoContainer.appendChild(major);
	        infoContainer.appendChild(creationDate);

	        introduction.appendChild(thumbnail);
	        introduction.appendChild(infoContainer);

	        infoFrame.appendChild(introduction);
	        doc.body.appendChild(infoFrame);
	    },

	    hideInfoFrame : function (event){
	        var doc = document;
	        var infoFrame = doc.getElementById("infoFrame");
	        if(infoFrame){
	            infoFrame.style.visibility = "hidden";
	        }
	    }

	};

	module.exports = eventHandleFunc;

/***/ },
/* 12 */
/***/ function(module, exports) {

	var getPostContent = function (id, title){
		if(window.XMLHttpRequest){
			XMLHTTP=new XMLHttpRequest();
		}else{
			XMLHTTP=new ActiveXObject("Microsoft.XMLHTTP");
		}

		XMLHTTP.onreadystatechange=function(){
			if(XMLHTTP.readyState==4 && XMLHTTP.status==200){
				var postContent = document.createElement("div");
				postContent.id = "postContent";
				postContent.innerHTML = XMLHTTP.responseText;
				var infoFrame = document.getElementById("infoFrame");
				var pc = document.getElementById("postContent");
				if(infoFrame){
					if(pc){
						pc.parentNode.removeChild(pc);
					}
					infoFrame.appendChild(postContent);
				}

				var $infoFrame = $("#infoFrame");
				var $sketch = $("#sketch");

				var height = document.documentElement.clientHeight - 60 ;
				$infoFrame.animate({height:height});
				
				//窗口尺寸改变
				$(window).resize(function() {
					if($infoFrame.css("height") != "100px"){ //若高度大于停靠在下方是的高度时
						$infoFrame.css("height",document.documentElement.clientHeight - 60);
					}
				});
				
				//将sketch隐藏并移出显示范围，否则即使被遮盖也会有交互效果
				$sketch.fadeOut();
				setTimeout(function (){$('#sketch').css('position','fixed')},200);
				$sketch.css("bottom","-900px");

				//折叠FilterBar,并隐藏filterBarBtn
				$("#filter").slideUp("fast",function (){
					$("#filterBarBtn").fadeOut();
				});
				
				
				//返回按钮（关闭）
				var cancel = document.getElementById("postContent_delete");
				if(!cancel){
					cancel = document.createElement("button");
					cancel.id = "postContent_delete";
					cancel.title = "关闭";
					cancel.className = "btn btn-danger btn-sm";
					//cancel.innerHTML = "<span class='glyphicon glyphicon-remove'></span>";
					cancel.onclick = function (){
						$infoFrame.animate({height:"100px"});
						$infoFrame.animate({ scrollTop: 0 }, 400);
						$("#postContent").fadeOut();
						this.remove();

						$sketch.css("position","static"); //将sketch移回
						$sketch.fadeIn();
						$("#filterBarBtn").fadeIn();
					};
					document.body.appendChild(cancel);
				}
				
				//滚到顶部
				var toTop = document.getElementById("toTop");
				if(!toTop){
					toTop = document.createElement("button");
					toTop.id = "toTop";
					toTop.title = "返回顶部";
					toTop.className = "btn btn-default btn-sm";
					toTop.onclick = function (){
						$infoFrame.animate({ scrollTop: 0 }, 400);
					};
					
					document.body.appendChild(toTop);
				}

				var $toTop = $("#toTop");
				
				/*检查滚动*/
				var sTop;
				sTop = document.getElementById("infoFrame").scrollTop;
				if(sTop == 0){
					$toTop.css("display","none");
				}else{
					$toTop.css("display","block");
				}

				$infoFrame.scroll(function(){
					sTop = document.getElementById("infoFrame").scrollTop;
					if(sTop == 0){
						$toTop.fadeOut();
					}else{
						$toTop.fadeIn();
					}
				});
				
				// $("#postContent").css("display","none");
				// $("#postContent").fadeIn();
				
			}
		};
		XMLHTTP.open("GET","wp-content/themes/zbs/getPostContent.php?id="+id+"&title="+title);
		XMLHTTP.send();
	};


	module.exports = getPostContent;

/***/ }
/******/ ]);