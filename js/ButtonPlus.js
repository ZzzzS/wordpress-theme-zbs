/*
基于p5.js,Button
by:Zzzz
date:2016-03-03
*/
var Button = require("./Button.js");
var util = require("./util.js");

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

