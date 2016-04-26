AttractPoint = function (option){
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
	if(b instanceof movingButton){
		var force = p5.Vector.sub(this.position,b.b.position);
		var dist = force.mag();
		force.normalize();
		force.mult(this.strength);
		return force;
	}
}

AttractPoint.prototype.vortexAttract = function (b,threshold){
	if(b instanceof movingButton){
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