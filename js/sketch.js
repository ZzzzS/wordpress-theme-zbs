"use strict"; //严格模式
var myCanvas;
var b,c;
var displayArray = [];
var mainButton = [];
var button = [];
var soundFile;
var sketch = function(p){
	//p.frameRate(50);
	p.preload = function() {
		p.soundFormats('mp3', 'ogg');
		soundFile = p.loadSound('wp-content/themes/zbs/sound/water2.wav');
	};
	
	p.setup = function(){
		p.createCanvas(960,600);
		p.canvas.id = "sketch";
		
		for(var i=0;i<20;i++){
			for(var j=0;j<9;j++){
				var size = Math.random()*20 + 15;
				var newObj = new movingButton(new p5.Vector(30 * i + 30,30 * j + 30),size,size,25,p);
				//newObj.sound = soundFile;
				newObj.b.fillCol = p.color(Math.random()*100, Math.random()*50, Math.random()*200,50);
				newObj.reflect = true;
				newObj.b.addHandler("hover",amplify);
				newObj.b.addHandler("mouseOut",reduce);
				newObj.b.addHandler("trunOff",mouseOut);
				newObj.b.addHandler("click",clicked);
				newObj.b.addHandler("turnOn",turnOn);
				newObj.b.sound = soundFile;
				mainButton.push(newObj);
			}
		}
		

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
	event.target.p.noStroke();
	event.target.p.fill(0);
	event.target.p.textAlign("center");
	if(event.target.position.y < event.target.p.height/2){
		event.target.p.text("有种你点击试试啊！！",event.target.position.x,event.target.position.y + 100);
	}else{
		event.target.p.text("有种你点击试试啊！！",event.target.position.x,event.target.position.y - 100);
	}
}

function reduce(event){
	
}



function clicked(event){
	event.target.p.noStroke();
	event.target.p.fill(0);
	event.target.p.textAlign("center");
	if(event.target.position.y < event.target.p.height/2){
		event.target.p.text("你有种！！",event.target.position.x,event.target.position.y + 100);
	}else{
		event.target.p.text("你有种！！",event.target.position.x,event.target.position.y - 100);
	}
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
}