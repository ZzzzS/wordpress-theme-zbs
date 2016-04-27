var ButtonPlus = require("./ButtonPlus.js")

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