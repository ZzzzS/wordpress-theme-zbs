var util = require("./util.js");
var Particle = require("./Particle.js");

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
	this.vortex = true;
}
util.inheritPrototype(ButtonParticle, Particle);

//粒子作用力
ButtonParticle.prototype.applyForce = function(force){
	this.acceleration.add(force);
}

//更新粒子状态
ButtonParticle.prototype.update = function(){	
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
		if(this.visualObject.position.x < this.visualObject.width/2 || this.visualObject.position.x > this.p.width - this.visualObject.width/2){
			this.velocity.x *= -1;
		}
		if(this.visualObject.position.y < this.visualObject.height/2 || this.visualObject.position.y > this.p.height - this.visualObject.height/2){
			this.velocity.y *= -1;
		}
	}
	
	this.velocity.limit(this.topspeed);
	
	this.visualObject.position.add(this.velocity);
}

//绘制粒子
ButtonParticle.prototype.display = function(){
	if(this.visualObject.pState != "click" && this.visualObject.pState != "hover" && this.visualObject.pState != "press"){
		this.update();
	}
	this.visualObject.display();
}

module.exports = ButtonParticle;