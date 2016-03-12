function getUsers(userRole){
	var xmlhttp;
	if(window.XMLHttpRequest){
		xmlhttp=new XMLHttpRequest();
	}else{
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange=function(){
		if(xmlhttp.readyState==4 && xmlhttp.status==200){
			var users = JSON.parse(xmlhttp.responseText);
			//alert(xmlhttp.responseText);
			
			
			//p5.js
			var sketch = function(p){
				//p.frameRate(50);
				p.preload = function() {
					p.soundFormats('mp3', 'ogg');
					soundFile = p.loadSound('wp-content/themes/zbs/sound/water2.wav');
				};
				p.setup = function(){
					p.createCanvas(960,600);
					p.canvas.id = "sketch_1";
					var mask = p.loadImage("wp-content/themes/zbs/mask.png");
					var i = 5;
					for(var item in users){
						var size = Math.random()*20 + 15;
						var newObj = new movingButton(new p5.Vector(30 * i + 30,30 * i + 30),size,size,25,p);
						newObj.b.fillCol = p.color(Math.random()*100, Math.random()*50, Math.random()*200,50);
						newObj.reflect = true;
						newObj.b.addHandler("turnOff",turnOff);
						newObj.b.addHandler("click",clicked);
						newObj.b.addHandler("turnOn",turnOn);
						newObj.b.sound = soundFile;
						newObj.b.info = users[item];
						var imgUrl = newObj.b.info['avatar'];
						if(imgUrl){
							var img = p.loadImage(imgUrl);
							newObj.b.img = img;
						}
						newObj.b.mask = mask;
						mainButton.push(newObj);
						i += 2;
					}
					
					/*for(var i=0;i<20;i++){
						for(var j=0;j<9;j++){
							var size = Math.random()*20 + 15;
							var newObj = new movingButton(new p5.Vector(30 * i + 30,30 * j + 30),size,size,25,p);
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
					}*/
					//b = new Button(new p5.Vector(700,450),80,80,50,p);
					//button.push(b);
					displayArray.push(mainButton);
					displayArray.push(button);
				};
				
				p.draw = function(){
					p.background(255);
					buttonHoverCount = 0;
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
			
			
			
			
		}
	}
	xmlhttp.open("GET","wp-content/themes/zbs/getUserInfo.php" + "?userRole=" + userRole);
	xmlhttp.send();
}


function clicked(event){
	event.target.p.noStroke();
	event.target.p.fill(0);
	event.target.p.textAlign("center");
	var text;
	text = event.target.info['name'];
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
	
	var post = event.target.info['posts'];
	if(post){ 
		$("#userInfo").html(post);
	}
}

function turnOff(event){
	displayArray[1] = [];
	$("#userInfo").html('');
}