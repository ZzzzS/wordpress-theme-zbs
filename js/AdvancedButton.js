/*
基于p5.js,Button
by:Zzzz
date:2016-03-03
*/
function MainButton(position,w,h,r,p){
	Button.call(this,position,w,h,r,p);
	if(arguments.length > 0){
		this.breath = false;
		this.breathState = false;
		this.loadRate = 0;
		this.w = w;
		this.h = h;
	}
}
inheritPrototype(MainButton,Button);

//MainButton.prototype.clickObjCount = 0;
MainButton.prototype.hoverObjCount = 0;

MainButton.prototype.isSelected = function(){
	if(Math.pow((this.p.mouseX - this.position.x),2) + Math.pow((this.p.mouseY - this.position.y),2) <= Math.pow(this.width/2,2)){
		return true;
	}else{
		return false;
	}
}

/*MainButton.prototype.state = function(){
	if(this.pState == "click" || (this.pState == "press" && this.pSwitch == "on")){
		if(this.isSelected()){
			if(this.p.mouseIsPressed){
				return "press";
			}else{
				if(this.pState == "press"){
					
				}
				this.pSwitch = "off";
				this.constructor.prototype.clickObjCount -= 1;
				return "hover";
			}
		}
		return "click";
	}else{
		if(this.constructor.prototype.clickObjCount == 1 && this.pState != "click"){
			return;
		}
		if(this.isSelected()){
			if(this.constructor.prototype.hoverObjCount >= 1 && this.pState == "mouseOut"){
				return;
			}
			if(this.p.mouseIsPressed){
				return "press";
			}else{
				if(this.pState == "press" && this.loadRate >= 2 * Math.PI - 0.15){
					this.pSwitch = "on";
					this.constructor.prototype.clickObjCount += 1;
					return "click";
				}
			}
			if(this.pState == "mouseOut"){
				this.constructor.prototype.hoverObjCount += 1;
			}
			return "hover";
		}else{
			if(this.pState == "hover"){
				this.constructor.prototype.hoverObjCount -= 1;
			}
			return "mouseOut";
		}
	}
}*/



MainButton.prototype.state = function(){
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
					if(this.pState != "mouseOut"){
						return "press";
					}else{
						return "mouseOut";
					}
				}else{
					if(this.pState == "press"){
						if(this.pSwitch == "on"){
							this.pSwitch = "off";
							return "hover";
						}else{
							if(this.loadRate >= 2 * Math.PI - 0.15){
								this.pSwitch = "on";
								return "click";
							}else{
								return "hover";
							}
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
			if(this.pState == "hover" || this.pState == "press"){
				this.constructor.prototype.hoverObjCount -= 1;
			}
			return "mouseOut";
		}
	}
}





MainButton.prototype.display = function(){
	if(this.strokeCol){
		this.p.stroke(this.strokeCol);
	}else{
		this.p.noStroke();
	}
	
	this.p.rectMode('center');
	var state = this.state();
	if(state != "press"){
		this.loadRate = 0
	}
	
	switch(state){
		case "hover":
			//音效
			if(this.pState == "mouseOut"){
				if(this.sound) this.sound.play();
			}

			if(this.pState == "press"){
				this.fire({type:"trunOff"});
			}
			this.p.fill(this.p.color(0,100,0));
			this.drawGeometry();
			if(this.width > 100){
				this.breath = true;
			}
			$(this.p.canvas).css("cursor","pointer");
			
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
			if(this.constructor.prototype.hoverObjCount == 0) $(this.p.canvas).css("cursor","default");
			
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
			if(this.loadRate >= 2 * Math.PI - 0.15){
				this.p.fill(this.p.color(50,50,50));
			}else{
				this.p.fill(this.p.color(50,0,0));
			}
			this.drawGeometry();
			
			if(this.pSwitch == "off"){
				if(this.loadRate < 2 * Math.PI){
					this.loadRate += 0.15;
				}
				if(this.loadRate > 2 * Math.PI) this.loadRate = 2 * Math.PI - 0.01;
				this.p.strokeWeight(3);
				this.p.strokeCap("square");
				this.p.stroke(this.p.color(50,100,100));
				this.p.push();
				this.p.translate(this.position.x,this.position.y);
				this.p.noFill();
				this.p.arc(0,0,this.width + 3,this.height + 3,0,this.loadRate);
				this.p.pop();
				this.p.strokeWeight(1);
			}else{
				this.p.fill(this.p.color(50,0,0));
			}
			
			this.fire({type:"press"});
			this.pState = "press";
			break;
		case "click":
			if(this.pState != "click"){
				this.fire({type:"turnOn"});
			}
			this.p.fill(this.p.color(100,100,100));
			this.drawGeometry();
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


function movingButton(position,w,h,r,p){
	this.b = new MainButton(position,w,h,r,p);
	this.p = p;
	this.reflect = false;
}

movingButton.prototype.update = function(){
	if(!this.velocity){
		var random1 = Math.random()*((Math.random()>0.5)?-1:1);
		var random2 = Math.random()-((Math.random()>0.5)?1:2);
		this.velocity = new p5.Vector(random1,random2);
	}
	if(!this.acceleration){
		this.acceleration = new p5.Vector(0.02,0.05);
	}
	//this.velocity.add(this.acceleration);
	
	if(this.reflect){
		if(this.b.position.x < this.b.width/2 || this.b.position.x > this.p.width - this.b.width/2){
			this.velocity.x *= -1;
		}
		if(this.b.position.y < this.b.height/2 || this.b.position.y > this.p.height - this.b.height/2){
			this.velocity.y *= -1;
		}
	}
	this.b.position.add(this.velocity);
}

movingButton.prototype.display = function(){
	if(this.b.pState != "click" && this.b.pState != "hover" && this.b.pState != "press"){
		this.update();
	}
	this.b.display();
}