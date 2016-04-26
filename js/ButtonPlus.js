/*
基于p5.js,Button
by:Zzzz
date:2016-03-03
*/
var Button = require("./Button.js");
var util = require("./util.js");

function ButtonPlus(options){
	Button.call(this,options);
	this.breath = false;
	this.breathState = false;
	this.w = options.width;  //原始宽度数据备份
	this.h = options.height;  //原始高度数据备份
	this.clickTimeline = 0;
}
util.inheritPrototype(ButtonPlus,Button);

ButtonPlus.prototype.hoverObjCount = 0;

ButtonPlus.prototype.isSelected = function(){
	if(Math.pow((this.p.mouseX - this.position.x),2) + Math.pow((this.p.mouseY - this.position.y),2) <= Math.pow(this.width/2,2)){
		return true;
	}else{
		return false;
	}
}

ButtonPlus.prototype.state = function(){
	if(this.isSelected()){
		if(this.pState == "click"){
			if(this.p.mouseIsPressed){
				if(this.pState != "mouseOut"){
					return "press";
				}else{
					return;
				}
			}else{
				return "click";
			}
		}else{
			if(this.constructor.prototype.hoverObjCount <= 0 || this.pState != "mouseOut"){
				if(this.p.mouseIsPressed){
					if(this.pState == "mouseOut"){
						return "mouseOut";
					}else{
						return "press";
					}
				}else{
					if(this.pState == "press"){
						if(this.pSwitch == "on"){
							this.pSwitch = "off";
							this.fire({type:"turnOff"});
							return "hover";
						}else{
							
							this.pSwitch = "on";
							this.fire({type:"turnOn"});
							return "click";
							
						}
					}else{
						if(this.pState != "hover"){
							//first
							this.constructor.prototype.hoverObjCount += 1;
						}
						return "hover";
					}
				}
			}else{
				return "mouseOut";
			}
		}
	}else{
		if(this.pState == "click"){
			return "click";
		}else{
			if(this.p.mouseIsPressed && this.pSwitch == "on"){
				this.pSwitch = "off";
				this.fire({type:"turnOff"});
			}
			if(this.pState == "hover" || this.pState == "press"){
				this.constructor.prototype.hoverObjCount -= 1;
			}
			return "mouseOut";
		}
	}
}

ButtonPlus.prototype.display = function(){
	if(this.strokeCol){
		this.p.stroke(this.strokeCol);
	}else{
		this.p.noStroke();
	}
	
	this.p.rectMode('center');
	var state = this.state();
	this.cursorState(state);  //鼠标状态
	switch(state){
		case "hover":
			//音效
			if(this.pState == "mouseOut"){         //首次hover
				if(this.sound) this.sound.play();
			}
			this.hoverCol = this.p.color(this.fillCol.getRed(),this.fillCol.getGreen(),this.fillCol.getBlue(),150);
			this.p.fill(this.hoverCol);
			this.drawGeometry();
			if(this.width > 100){
				this.breath = true;
			}
			
			var s = 1.1;
			if(this.breath){
				//呼吸效果
				if(!this.breathState && this.width <= 100){
					this.width *= 1.002;
					this.height *= 1.002;
				}else{
					this.breathState = true;
				}
				if(this.breathState && this.width > 90){
					this.width *= 0.995;
					this.height *= 0.995;
				}else{
					this.breathState = false;
				}
			}else{
				//放大
				if(this.width <= 100){
					this.width *= s;
					this.height *= s;
				}else{
					
				}
			}
			
			this.fire({type:"hover"});
			this.pState = "hover";
			break;
		case "mouseOut":
			if(this.fillCol){
				this.p.fill(this.fillCol);
			}
			this.drawGeometry();
			this.breath = false;
			
			//缩小
			var s = 0.95;
			if(this.width > this.w){
				this.width *= s;
				this.height *= s;
			}
			
			this.fire({type:"mouseOut"});
			this.pState = "mouseOut";
			break;
		case "press":	
			this.p.fill(this.pressCol);
			this.drawGeometry();
			this.fire({type:"press"});
			this.pState = "press";
			break;
		case "click":
			this.p.fill(this.clickCol);
			this.drawGeometry();
			
			//点击反馈
			if(this.pState === "press"){
				this.clickTimeline = 0;
			}else{
				this.clickTimeline++;
			}
			if(this.clickTimeline < 40){
				this.p.stroke(200,200,200,200-this.clickTimeline*5);
				this.p.strokeWeight(10-this.clickTimeline/4);
				this.p.noFill();
				this.p.ellipse(this.position.x,this.position.y,this.width+Math.sqrt(this.clickTimeline*50,2),this.height+Math.sqrt(this.clickTimeline*50,2));
			}
			
			
			this.fire({type:"click"});
			this.pState = "click";
			break;
		default:
			if(this.fillCol){
				this.p.fill(this.fillCol);
			}else{
				this.p.fill(this.p.color(0,0,100));
			}
			this.drawGeometry();
	}
}

ButtonPlus.prototype.cursorState = function(state){
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

module.exports = ButtonPlus;

