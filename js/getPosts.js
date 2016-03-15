function getPosts(){
	
	//displayArray = [];
	//mainButton = [];
	//button = [];
	var soundFile;
	var sketch;
	var xmlhttp;

	if(window.XMLHttpRequest){
		xmlhttp=new XMLHttpRequest();
	}else{
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}

	xmlhttp.onreadystatechange=function(){
		if(xmlhttp.readyState==4 && xmlhttp.status==200){
			var posts = JSON.parse(xmlhttp.responseText);
			//alert(xmlhttp.responseText);
			
			
			//p5.js
			sketch = function(p){
				p.preload = function() {
					p.soundFormats('mp3', 'ogg');
					soundFile = p.loadSound('wp-content/themes/zbs/sound/water2.wav');
				};
				p.setup = function(){
					p.createCanvas(960,600);
					p.canvas.id = "sketch_1";
					var anchor = new p5.Vector(200,200);
					for(var item in posts){
						var size = Math.random()*20 + 15;
						var newObj = new movingButton(new p5.Vector(Math.random() * 900 + 10,Math.random() * 500 + 10),size,size,25,p);
						newObj.b.anchor = anchor;
						newObj.b.fillCol = p.color(Math.random()*200, Math.random()*200, Math.random()*200,50);
						newObj.reflect = true;
						newObj.b.addHandler("turnOff",turnOff);
						newObj.b.addHandler("click",clicked);
						newObj.b.addHandler("turnOn",turnOn);
						newObj.b.sound = soundFile;
						newObj.b.info = posts[item];
						mainButton.push(newObj);
					}
					

					displayArray.push(mainButton);
					displayArray.push(button);
				};
				
				p.draw = function(){
					p.background(255);
					var buttonHoverCount = 0;
					for(var i = 0;i < displayArray.length;i++){
						for(var j = 0;j < displayArray[i].length;j++){
							displayArray[i][j].display();
							if(i == 1 && displayArray[i][j].isSelected()){
								buttonHoverCount++;
							}
						}
					}
					if(buttonHoverCount > 0){
						$(p.canvas).css("cursor","pointer");
					}
				};	
				
			};
			
			var myp5 = new p5(sketch,'sketch');

			
			console.log(myp5);
		}
	}
	xmlhttp.open("GET","wp-content/themes/zbs/getPostInfo.php");
	xmlhttp.send();
}


function clicked(event){
	event.target.p.noStroke();
	event.target.p.fill(0);
	event.target.p.textAlign("center");
	var text;
	text = event.target.info['title'];
	if(text){
		event.target.p.text(text,event.target.position.x,event.target.position.y);
	}
	
	
}
function turnOn(event){
	var vect = new p5.Vector(event.target.width / 2 + 30,0);
	var count = 5;
	vect.rotate(-0.68 * (count - 1) / 2);
	for(var i = 0; i < count; i++){
		if(i > 0) vect.rotate(0.68);
		var b = new Button(new p5.Vector(event.target.position.x + vect.x,event.target.position.y + vect.y),30,30,10,event.target.p);
		b.fillCol = event.target.p.color(Math.random()*100, Math.random()*50, Math.random()*200,200);
		b.switchEffect = false;
		displayArray[1].push(b);
	}
	
	/*var post = event.target.info['posts'];
	if(post){ 
		$("#userInfo").html(post);
	}*/
}

function turnOff(event){
	displayArray[1] = [];
	$("#userInfo").html('');
}