var util = require("./util.js");
var Particle = require("./Particle.js");
var globalVar = require("./GlobalVar.js");

var ButtonParticle = function (options){
	Particle.call(this,{
		visualObject : options.visualObject,   //visualObject为实现了display方法的对象
		p : options.p,
		reflect : false,
		topspeed : options.topspeed,   //控制最高速度
		acceleration : options.acceleration,
		velocity : options.velocity
	})
	this.strength = 0.1;
	this.vortexAttract = options.vortexAttract || true;   //vortexAttract确定button是被直线吸引还是漩涡吸引
}
util.inheritPrototype(ButtonParticle, Particle);

//粒子作用力
ButtonParticle.prototype.applyForce = function(force){
	this.acceleration.add(force);
}

//更新粒子状态
ButtonParticle.prototype.update = function(){	
	if(this.attractPt){
		var options = {
			b : this,
			threshold : 300
		}
		var force = this.attractPt.attract(options);   //引力与漩涡力
		this.applyForce(force);
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
	}
	
	this.velocity.limit(this.topspeed);    //更新速度
	
	this.visualObject.position.add(this.velocity);   //更新位置
	
	//无限符号（∞）运动路径的实现
	if (this.vortexAttract){
		var vect = p5.Vector.sub(this.visualObject.position,this.attractPt.position);
		var angle = vect.heading();
		var len = vect.mag();
	
		if(!this.attractPt.clocklwise && len < 100 && angle < Math.PI/4 && angle > 0){
			this.attractPt = globalVar.attractPtR;
		}else{
			if(this.attractPt.clockwise && len < 200 && angle < 3 * Math.PI/4 && angle > Math.PI/2){
				this.attractPt = globalVar.attractPtL;
			}
		}
	}
}

//绘制粒子
ButtonParticle.prototype.display = function(){
	if(this.visualObject.pState != "click" && this.visualObject.pState != "hover" && this.visualObject.pState != "press"){
		this.update();
	}
	this.visualObject.display();
}

module.exports = ButtonParticle;