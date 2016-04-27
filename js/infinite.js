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
	var globalVar = __webpack_require__(6);


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
	    var getInfo = __webpack_require__(7);
		//默认获取用户
		getInfo("users","basic_contributor");
		
		//获取用户
		$("#getUsers").click(function(){
			getInfo("users","basic_contributor");
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

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var ButtonParticle = __webpack_require__(2);

	var AttractPoint = function (option){
		this.position = option.position.copy();
		this.strength = option.strength;
		this.p = option.p;
		if(option.clockwise){
			this.clockwise = option.clockwise;
		}else{
			this.clockwise = false;
		}
	}

	AttractPoint.prototype.attract = function(b){
		if(b instanceof ButtonParticle){
			var force = p5.Vector.sub(this.position,b.b.position);
			var dist = force.mag();
			force.normalize();
			force.mult(this.strength);
			return force;
		}
	}

	AttractPoint.prototype.vortexAttract = function (b,threshold){
		if(b instanceof ButtonParticle){
			var force = p5.Vector.sub(this.position,b.b.position);
			
			var ff = force.copy();
			if(this.clockwise){
				ff.rotate(-Math.PI/2);
			}else{
				ff.rotate(Math.PI/2);
			}
			ff.setMag(threshold);
			force.add(ff);
			force.limit(1);
			return force;
		}
	}

	AttractPoint.prototype.display = function(){
		this.p.ellipse(this.position.x,this.position.y,50,50);
	}

	module.exports = AttractPoint;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var ButtonPlus = __webpack_require__(3)

	var ButtonParticle = function (options){
		this.b = new ButtonPlus(options);
		this.p = options.p;
		this.strength = 0.1;
		this.reflect = false;
		this.topspeed = options.topspeed || Math.random() * 3 + 2;  //控制最高速度
		this.vortex = true;
		//this.attractPtL = null;
		
		//加速度
		if(!this.acceleration){
			this.acceleration = new p5.Vector(0,0);  
		}
	}

	//粒子作用力
	ButtonParticle.prototype.applyForce = function(force){
		this.acceleration.add(force);
	}

	//更新粒子状态
	ButtonParticle.prototype.update = function(){
		//速度
		if(!this.velocity){
			var random1 = Math.random()*((Math.random()>0.5)?-0.5:0.5);
			var random2 = Math.random()-((Math.random()>0.5)?0.5:1);
			this.velocity = new p5.Vector(random1,random2);
		}
		
		/*if(this.b.anchor){
			//console.log(this.b.anchor);
			var force = p5.Vector.sub(this.b.anchor,this.b.position);
			var dist = force.mag();
			force.normalize();
			force.mult(this.strength);
			this.acceleration.add(force);
		}*/
		if(this.attractPtL){
			if(this.vortex){
				var force = this.attractPtL.vortexAttract(this,300);
			}else{
				var force = this.attractPtL.attract(this);
			}
			
			this.applyForce(force);
		}
		
		this.velocity.add(this.acceleration);
		this.acceleration.mult(0);  //加速度清零
		
		if(this.reflect){
			if(this.b.position.x < this.b.width/2 || this.b.position.x > this.p.width - this.b.width/2){
				this.velocity.x *= -1;
			}
			if(this.b.position.y < this.b.height/2 || this.b.position.y > this.p.height - this.b.height/2){
				this.velocity.y *= -1;
			}
		}
		
		this.velocity.limit(this.topspeed);
		
		/*var dist = p5.Vector.sub(this.position,this.attractPtL).mag();
		if(this.fixed && dist <= 1){
			this.velocity.mult(0.5);
		}*/
		
		this.b.position.add(this.velocity);
	}

	//绘制粒子
	ButtonParticle.prototype.display = function(){
		if(this.b.pState != "click" && this.b.pState != "hover" && this.b.pState != "press"){
			this.update();
		}
		this.b.display();
	}

	module.exports = ButtonParticle;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/*
	基于p5.js,Button
	by:Zzzz
	date:2016-03-03
	*/
	var Button = __webpack_require__(4);
	var util = __webpack_require__(5);

	function ButtonPlus(options) {
		Button.call(this, options);
		this.breath = false;  //是否开启呼吸效果
		this.breathState = false;  //呼吸状态
		this.w = options.width;  //原始宽度数据备份
		this.h = options.height;  //原始高度数据备份
		this.clickTimeline = 0;   //On状态的时间轴
		this.geometryType = "circle";
	}
	util.inheritPrototype(ButtonPlus, Button);

	//统计ButtonPlus实例被选中个数，主要目的在于控制每次只能选择一个Button
	ButtonPlus.prototype.hoverObjCount = 0;

	//判断ButtonPlus是否被选中（加强版）
	ButtonPlus.prototype.isSelected = function () {
		if (this.width === this.height && this.geometryType === "circle") {
			if (Math.pow((this.p.mouseX - this.position.x), 2) + Math.pow((this.p.mouseY - this.position.y), 2) <= Math.pow(this.width / 2, 2)) {
				return true;
			} else {
				return false;
			}
		} else {
			if (this.p.mouseX >= this.position.x - this.width / 2 && this.p.mouseX <= this.position.x + this.width / 2 && this.p.mouseY >= this.position.y - this.height / 2 && this.p.mouseY <= this.position.y + this.height / 2) {
				return true;
			} else {
				return false;
			}
		}
	};

	//判断ButtonPlus的状态（加强版）
	ButtonPlus.prototype.state = function () {
		/*
		**hover (pState) ： 鼠标悬浮（被选中）
		**press (pState) ： 鼠标按下
		**click (pState) ： 鼠标点击
		**mouseOut (pState) ： 鼠标从button上移开/未被选中
		**on (pSwitch) : Button处于开启状态
		**off (pSwitch) ： Button处于关闭状态
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
							return "press";
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
		if (this.strokeCol) {
			this.p.stroke(this.strokeCol);
		} else {
			this.p.noStroke();
		}

		this.p.rectMode('center');
		var state = this.state();
		this.cursorState(state);  //鼠标状态
		switch (state) {
			case "hover":
				//音效
				if (this.pState == "mouseOut") {         //首次hover
					if (this.sound) this.sound.play();
				}
				this.hoverCol = this.p.color(this.fillCol.getRed(), this.fillCol.getGreen(), this.fillCol.getBlue(), 150);
				this.p.fill(this.hoverCol);
				this.drawGeometry();
				if (this.width > 100) {
					this.breath = true;
				}

				var s = 1.1;
				if (this.breath) {
					//呼吸效果
					if (!this.breathState && this.width <= 100) {
						this.width *= 1.002;
						this.height *= 1.002;
					} else {
						this.breathState = true;
					}
					if (this.breathState && this.width > 90) {
						this.width *= 0.995;
						this.height *= 0.995;
					} else {
						this.breathState = false;
					}
				} else {
					//放大
					if (this.width <= 100) {
						this.width *= s;
						this.height *= s;
					} else {

					}
				}

				this.fire({ type: "hover" });
				this.pState = "hover";
				break;
			case "mouseOut":
				if (this.fillCol) {
					this.p.fill(this.fillCol);
				}
				this.drawGeometry();
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
				this.p.fill(this.pressCol);
				this.drawGeometry();
				this.fire({ type: "press" });
				this.pState = "press";
				break;
			case "click":
				this.p.fill(this.clickCol);
				this.drawGeometry();

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
				if (this.fillCol) {
					this.p.fill(this.fillCol);
				} else {
					this.p.fill(this.p.color(0, 0, 100));
				}
				this.drawGeometry();
		}
	};

	//ButtonPlus状态重置
	ButtonPlus.stateReset = function () {
		this.prototype.hoverObjCount = 0;
	}; 

	module.exports = ButtonPlus;



/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/*
	Button类，基于p5.js
	by:Zzzz
	date:2016-03-03
	*/
	var util = __webpack_require__(5);

	var Button = function (options) {
		this.position = options.position.copy();  //位置
		this.width = options.width;  //宽度
		this.height = options.height;  //高度
		this.p = options.p;  //p5实例
		this.pState = "mouseOut";  //Button初始状态
		this.pSwitch = "off";   //Button初始状态
		this.hoverCol = options.hoverCol || this.p.color("#06799F");  //鼠标悬浮时Button的颜色
		this.pressCol = options.pressCol || this.p.color("#216278");  //鼠标按下时Button的颜色
		this.clickCol = options.clickCol || this.p.color("#024E68");  //Button处于on状态时的颜色
		this.handlers = {};  //事件处理程序
	}

	//判断Button是否被选中
	Button.prototype.isSelected = function () {
		
	}

	//判断Button的状态
	Button.prototype.state = function () {
		/*
		**hover (pState) ： 鼠标悬浮（被选中）
		**press (pState) ： 鼠标按下
		**click (pState) ： 鼠标点击
		**mouseOut (pState) ： 鼠标从button上移开/未被选中
		**on (pSwitch) : Button处于开启状态
		**off (pSwitch) ： Button处于关闭状态
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

	//根据不同的状态绘制Button
	Button.prototype.display = function () {
		if (this.strokeCol) {
			this.p.stroke(this.strokeCol);
		} else {
			this.p.noStroke();
		}
		this.p.rectMode('center');
		var state = this.state();
		switch (state) {
			case "hover":
				this.p.fill(this.hoverCol);
				this.drawGeometry();
				this.fire({ type: "hover" });
				this.pState = "hover";
				break;
			case "mouseOut":
				if (this.fillCol) {
					this.p.fill(this.fillCol);
				} else {
					this.p.fill(this.p.color(0, 0, 100));
				}
				this.drawGeometry();
				this.fire({ type: "mouseOut" });
				this.pState = "mouseOut";
				break;
			case "press":
				this.p.fill(this.pressCol);
				this.drawGeometry();
				this.fire({ type: "press" });
				this.pState = "press";
				break;
			case "click":
				this.p.fill(this.clickCol);
				this.drawGeometry();
				this.fire({ type: "click" });
				this.pState = "click";
				break;
			default:
				if (this.fillCol) {
					this.p.fill(this.fillCol);
				} else {
					this.p.fill(this.p.color(0, 0, 100));
				}
				this.drawGeometry();
		}
	}

	// 绘制几何图形
	Button.prototype.drawGeometry = function () {
		this.p.push();
		this.p.translate(this.position.x, this.position.y);
		this.p.ellipse(0, 0, this.width, this.height);
		this.p.pop();
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
/* 5 */
/***/ function(module, exports) {

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
/* 6 */
/***/ function(module, exports) {

	var GlobalVar = {
	    displayArray : null,
	    mainButton : null,
	    button : null,
	    SOUNDFILE : null,
	    pp : null,
	    attractPtL : null,
	    attractPtR : null
	}

	//module.exports = GlobalVar;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	
	var eventHandleFunc = __webpack_require__(8);
	var util = __webpack_require__(5);
	var globalVar = __webpack_require__(6);
	var ButtonParticle = __webpack_require__(2);
	var ButtonPlus = __webpack_require__(3);

	var getInfo = function (type,arg){
		
		globalVar.displayArray = [];
		globalVar.mainButton = [];
		globalVar.button = [];
		

		if(window.XMLHttpRequest){
			XMLHTTP=new XMLHttpRequest();
		}else{
			XMLHTTP=new ActiveXObject("Microsoft.XMLHTTP");
		}

		if(type === "posts"){
			XMLHTTP.onreadystatechange=function(){
				if(XMLHTTP.readyState==4 && XMLHTTP.status==200){
					ButtonPlus.stateReset();
					var posts = JSON.parse(XMLHTTP.responseText);
					//alert(XMLHTTP.responseText);
					for(var item in posts){
						var size = Math.random()*20 + 15;
						var options = {
							position : new p5.Vector(Math.random() * 900 + 10,Math.random() * 500 + 10),
							width : size,
							height : size,
							r : 25,
							p : globalVar.pp
						}
						var newObj = new ButtonParticle(options);
						newObj.attractPtL = globalVar.attractPtL;
						newObj.b.fillCol = globalVar.pp.color(Math.random()*200, Math.random()*200, Math.random()*200,50);
						newObj.reflect = true;
						newObj.b.addHandler("turnOff",eventHandleFunc.turnOff);
						newObj.b.addHandler("click",eventHandleFunc.clicked);
						newObj.b.addHandler("turnOn",eventHandleFunc.turnOn);
						newObj.b.sound = globalVar.SOUNDFILE;
						newObj.b.info = posts[item];
						globalVar.mainButton.push(newObj);
					}
					
					globalVar.displayArray.push(globalVar.mainButton);
					globalVar.displayArray.push(globalVar.button);
					
				}
			}
			XMLHTTP.open("GET","wp-content/themes/zbs/getPostInfo.php");
			XMLHTTP.send();
		}else{
			if(type === "users"){
				XMLHTTP.onreadystatechange=function(){
					ButtonPlus.stateReset();
					if(XMLHTTP.readyState==4 && XMLHTTP.status==200){
						var users = JSON.parse(XMLHTTP.responseText);
						//alert(XMLHTTP.responseText);
						console.log(XMLHTTP.responseText);
						
						var i = 0;
						var count = util.getJsonObjLength(users);
						for(var item in users){
							var size = Math.random()*20 + 15;
							var options = {
								position : new p5.Vector(Math.random()*900+30, Math.random()*550+25),
								width : size,
								height : size,
								r : 25,
								p : globalVar.pp
							}
							var newObj = new ButtonParticle(options);
							if(i < count/2){
								newObj.attractPtL = globalVar.attractPtL;
							}else{
								newObj.attractPtL = globalVar.attractPtR;
							}

							newObj.b.fillCol = globalVar.pp.color(Math.random()*100, Math.random()*50, Math.random()*200,50);
							newObj.reflect = true;
							newObj.b.addHandler("turnOff",eventHandleFunc.turnOff);
							newObj.b.addHandler("click",eventHandleFunc.clicked_users);
							newObj.b.addHandler("turnOn",eventHandleFunc.delUserInfo);
							newObj.b.addHandler("turnOn",eventHandleFunc.showUserInfo_fixed);
							newObj.b.addHandler("turnOff",eventHandleFunc.delUserInfo_fixed);
							newObj.b.addHandler("hover",eventHandleFunc.showUserInfo);
							newObj.b.addHandler("mouseOut",eventHandleFunc.delUserInfo);
							newObj.b.sound = globalVar.SOUNDFILE;
							newObj.b.info = users[item];
							//newObj.b.mask = MARK;
							globalVar.mainButton.push(newObj);
							i++;
						}
						i = null;
						count = null;
						
						
						globalVar.displayArray.push(globalVar.mainButton);
						globalVar.displayArray.push(globalVar.button);
						
				
						
					}
				}
				XMLHTTP.open("GET","wp-content/themes/zbs/getUserInfo.php" + "?userRole=" + arg);
				XMLHTTP.send();
			}
		}
		
	}


	module.exports = getInfo;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var util = __webpack_require__(5);
	var domCtrl = __webpack_require__(9);

	var eventHandleFunc = {
	    clicked : function (event){
	        event.target.p.noStroke();
	        event.target.p.fill(0);
	        event.target.p.textAlign("center");
	        var text;
	        text = event.target.info['title'];
	        if(text){
	            event.target.p.text(text,event.target.position.x,event.target.position.y);
	        }	
	    },

	    turnOn : function (event){
	        /*var vect = new p5.Vector(event.target.width / 2 + 30,0);
	        var count = 5;
	        vect.rotate(-0.68 * (count - 1) / 2);
	        for(var i = 0; i < count; i++){
	            if(i > 0) vect.rotate(0.68);
	            var b = new Button(new p5.Vector(event.target.position.x + vect.x,event.target.position.y + vect.y),30,30,10,event.target.p);
	            b.fillCol = event.target.p.color(Math.random()*100, Math.random()*50, Math.random()*200,200);
	            b.switchEffect = false;
	            displayArray[1].push(b);
	        }*/
	        
	        /*var post = event.target.info['posts'];
	        if(post){ 
	            $("#userInfo").html(post);
	        }*/
	    },

	    clicked_users : function (event){
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
	        /*var text;
	        text = event.target.info['name'];
	        if(text){
	            event.target.p.text(text,event.target.position.x,event.target.position.y);
	        }*/
	    },


	    turnOff : function (event){/*
	        displayArray[1] = [];
	        $("#userInfo").html('');*/
	    },

	    showUserInfo : function (event){
	        var sketch = document.getElementById("sketch");
	        var top = util.getElementTop(sketch);
	        var left = util.getElementLeft(sketch);
	        //console.log(left);
	        var infoFrame = document.getElementById("infoFrame"+event.target.info['id']);
	        if(!infoFrame){
	            var infoFrame = document.createElement("div");
	            infoFrame.id = "infoFrame"+event.target.info['id'];
	            infoFrame.style.cssText = "background:#fff;position:absolute;top:"+(top+event.target.position.y-50)+"px;left:"+(left+event.target.position.x+50)+"px;width:130px;height:180px;padding:15px;border:solid gray 1px;border-radius:5px;";
	            
	            var img = document.createElement("img");
	            img.src = event.target.info['avatar'];
	            img.style.cssText = "width:100px;height:100px;border-radius:5px;-moz-border-radius:5px;"
	            infoFrame.appendChild(img);
	            
	            var name = document.createElement("div");
	            name.innerHTML = "<b>名字：</b>" + event.target.info['name'];
	            name.style.cssText = "margin-top:20px";
	            infoFrame.appendChild(name);
	            
	            /*var posts = document.createElement("div");
	            posts.innerHTML = event.target.info['posts'];
	            infoFrame.appendChild(posts);*/
	            
	            document.body.appendChild(infoFrame);
	        }
	    },

	    delUserInfo : function (event){
	        var infoFrame = document.getElementById("infoFrame"+event.target.info['id']);
	        if(infoFrame){
	            document.body.removeChild(infoFrame);
	        }
	    },

	    showUserInfo_fixed : function (event){
	        var sketch = document.getElementById("sketch");
	        var top = util.getElementTop(sketch);
	        var left = util.getElementLeft(sketch);
	        var infoFrame_fixed = document.getElementById("infoFrame_fixed");
	        if(!infoFrame_fixed){
	            var infoFrame_fixed = document.createElement("div");
	            infoFrame_fixed.id = "infoFrame_fixed";
	            
	            var infoFrame_xx = document.createElement("div");
	            infoFrame_xx.id = "infoFrame_xx";
	            infoFrame_xx.style.cssText = "height:"+(document.documentElement.clientHeight-80)+"px";
	            infoFrame_fixed.appendChild(infoFrame_xx);
	            
	            var imgBlock = document.createElement("div");
	            imgBlock.id = "imgBlock";
	            infoFrame_xx.appendChild(imgBlock);
	            
	                var img = document.createElement("img");
	                img.src = event.target.info['avatar'];
	                imgBlock.appendChild(img);
	            
	            var infoBlock = document.createElement("div");
	            infoBlock.id = "infoBlock";
	            infoFrame_xx.appendChild(infoBlock);
	            
	                var name = document.createElement("div");
	                name.innerHTML = "<b>名字：</b>" + event.target.info['name'];
	                infoBlock.appendChild(name);
	                
	                var posts = document.createElement("div");
	                var ps = event.target.info['posts'];
	                var ul = document.createElement("ul");
	                ul.innerHTML = '<b>作品：</b>';

	                for(var i=0;i<ps.length;i++){
	                    var li = document.createElement("li");
	                    var a = document.createElement("a");
	                    a.id = "getPostContentButton" + ps[i].id;
	                    a.className = 'getPostContentButton';
	                    a.innerHTML = ps[i].title;
	                    a.data_id = ps[i].id;
	                    li.appendChild(a);
	                    a.onclick = function (){
	                        domCtrl.getPostContent(this.data_id);
	                    };
	                    ul.appendChild(li);
	                }

	                posts.appendChild(ul);
	                infoBlock.appendChild(posts);
	            
	            var info = document.getElementById("info");
	            info.appendChild(infoFrame_fixed);
	            $("#infoFrame_fixed").fadeIn();
	        }
	    },

	    delUserInfo_fixed : function (event){
	        var info = document.getElementById("info");
	        var infoFrame_fixed = document.getElementById("infoFrame_fixed");
	        if(infoFrame_fixed){
	            $("#infoFrame_fixed").fadeOut();
	            setTimeout("info.removeChild(infoFrame_fixed)",200);
	            //info.removeChild(infoFrame_fixed);
	        }
	    }

	}

	module.exports = eventHandleFunc;

/***/ },
/* 9 */
/***/ function(module, exports) {

	var DomCtrl = {
		getPostContent : function (id){
			if(window.XMLHttpRequest){
				XMLHTTP=new XMLHttpRequest();
			}else{
				XMLHTTP=new ActiveXObject("Microsoft.XMLHTTP");
			}

			XMLHTTP.onreadystatechange=function(){
				if(XMLHTTP.readyState==4 && XMLHTTP.status==200){
					//alert(XMLHTTP.responseText);
					var postContent = document.getElementById("postContent");
					if(!postContent){
						var postContent = document.createElement("div");
						postContent.id = "postContent";
					}
					postContent.innerHTML = XMLHTTP.responseText;
					//$("#infoFrame_fixed").append(XMLHTTP.responseText);
					
					var infoFrame_xx = document.getElementById("infoFrame_xx");
					infoFrame_xx.appendChild(postContent);
					
					var height = document.documentElement.clientHeight - 60 ;
					$("#infoFrame_fixed").animate({height:height});
					
					//将sketch隐藏并移出显示范围，否则即使被遮盖也会有交互效果
					$("#sketch").fadeOut();
					setTimeout("$('#sketch').css('position','fixed')",200);
					$("#sketch").css("bottom","-900px");
					
					
					//返回按钮（关闭）
					var cancel = document.getElementById("postContent_delete");
					if(!cancel){
						var cancel = document.createElement("button");
						cancel.id = "postContent_delete";
						cancel.className = "btn btn-danger btn-sm";
						//cancel.innerHTML = "<span class='glyphicon glyphicon-remove'></span>";
						cancel.onclick = function (){
							$("#infoFrame_fixed").animate({height:"120px"});
							//$("#infoFrame_xx").scrollTop(0);
							$("#infoFrame_xx").animate({ scrollTop: 0 }, 400);
							$("#postContent").fadeOut();
							setTimeout("infoFrame_xx.removeChild(postContent);",300);
							this.remove();
							

							$("#sketch").css("position","static"); //将sketch移回
							$("#sketch").fadeIn();
						}
						infoFrame_fixed.appendChild(cancel);
					}
					
					//滚到顶部
					var toTop = document.getElementById("toTop");
					if(!toTop){
						var toTop = document.createElement("button");
						toTop.id = "toTop";
						toTop.className = "btn btn-default btn-sm";
						toTop.onclick = function (){
							//$("#infoFrame_xx").scrollTop(0);
							$("#infoFrame_xx").animate({ scrollTop: 0 }, 400);
						}
						
						infoFrame_fixed.appendChild(toTop);
					}
					
					$("#postContent").css("display","none");
					$("#postContent").fadeIn();
					
					
					/*检查滚动*/
					var sTop;
					sTop = document.getElementById("infoFrame_xx").scrollTop; 

					$("#infoFrame_xx").scroll(function(){    
						sTop = document.getElementById("infoFrame_xx").scrollTop; 
					});
					
					if(sTop == 0)
						{
							$("#toTop").css("display","none");
						}else{
							$("#toTop").css("display","block");
						}
					$("#infoFrame_xx").scroll(function(){     
						if(sTop == 0)
						{
							$("#toTop").fadeOut();
						}else{
							$("#toTop").fadeIn();
						}
					});
				}
			}
			XMLHTTP.open("GET","wp-content/themes/zbs/getPostContent.php?id="+id);
			XMLHTTP.send();
		}
	}



	module.exports = DomCtrl;

/***/ }
/******/ ]);