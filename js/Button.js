/*
Button类，基于p5.js
by:Zzzz
date:2016-03-03
*/
var util = require("./util.js");

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