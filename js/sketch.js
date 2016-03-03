var myCanvas;
var b,c;
var displayArray = [];
var mainButton = [];
var button = [];
var sketch = function(p){
	//p.frameRate(50);

	p.setup = function(){
		p.createCanvas(960,600);
		p.canvas.id = "sketch";
		b = new movingButton(new p5.Vector(50,50),50,50,25,p);
		c = new MainButton(new p5.Vector(100,80),100,100,10,p);
		//b.b.strokeCol = p.color(200,0,0);
		b.b.fillCol = p.color(50,50,100);
		b.reflect = true;
		c.strokeCol = p.color(200,0,0);
		c.fillCol = p.color(0,0,100);
		b.b.addHandler("xx",handleMessage);
		b.b.addHandler("hover",amplify);
		b.b.addHandler("mouseOut",reduce);
		b.b.addHandler("trunOff",mouseOut);
		b.b.addHandler("press",pressed);
		b.b.addHandler("click",clicked);
		b.b.addHandler("turnOn",turnOn);
		//b.b.addHandler("press",arc);
		mainButton.push(b);
		mainButton.push(c);
		displayArray.push(mainButton);
		displayArray.push(button);
	};
	
	p.draw = function(){
		p.background("#eee");
		for(var i = 0;i < displayArray.length;i++){
			for(var j = 0;j < displayArray[i].length;j++){
				displayArray[i][j].display();
			}
		}
		//$("#xx").html(displayArray.toString());
	};	
	
};

var canvas=document.createElement("div");
canvas.setAttribute("id","zz");
document.body.appendChild(canvas);
var myp5 = new p5(sketch,'zz');






function handleMessage(event){
	//$("#xx").html(event.state);
}

function amplify(event){
	event.target.s = 1.1;
	if(event.target.breath){
		if(!event.target.breathState && event.target.width <= 100){
			event.target.width *= 1.002;
			event.target.height *= 1.002;
		}else{
			event.target.breathState = true;
		}
		if(event.target.breathState && event.target.width > 90){
			event.target.width *= 0.995;
			event.target.height *= 0.995;
		}else{
			event.target.breathState = false;
		}
	}else{
		if(event.target.width <= 100){
			event.target.width *= event.target.s;
			event.target.height *= event.target.s;
		}else{
			
		}
	}
	$("#xx").html("有种你点击试试啊！！");
	event.target.p.noStroke();
	event.target.p.fill(0);
	event.target.p.textAlign("center");
	if(event.target.position.y < event.target.p.height/2){
		event.target.p.text("有种你点击试试啊！！",event.target.position.x,event.target.position.y + 50);
	}else{
		event.target.p.text("有种你点击试试啊！！",event.target.position.x,event.target.position.y - 50);
	}
}

function reduce(event){
	event.target.s = 0.95;
	if(event.target.width > 50){
		event.target.width *= event.target.s;
		event.target.height *= event.target.s;
	}
	$("#xx").html("");
}

function breath(event){
	$("#xx").append(event.state);
}

function pressed(event){
	$("#xx").html("有种你别撒手啊！！");
}

function clicked(event){
	$("#xx").html("你有种！！");
}
function turnOn(event){
	var vect = new p5.Vector(event.target.width / 2 + 30,0);
	for(var i = 0; i < 6; i++){
		vect.rotate(0.68);
		var b = new Button(new p5.Vector(event.target.position.x + vect.x,event.target.position.y + vect.y),30,30,10,event.target.p);
		b.fillCol = event.target.p.color(Math.random()*100, Math.random()*50, Math.random()*200,200);
		b.switchEffect = false;
		displayArray[1].push(b);
	}
}

function mouseOut(event){
	displayArray[1] = [];
	//$("#xx").html(event.target.pState);
}