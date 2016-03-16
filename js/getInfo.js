function getInfo(type,arg){
	
	displayArray = [];
	mainButton = [];
	button = [];
	

	if(window.XMLHttpRequest){
		XMLHTTP=new XMLHttpRequest();
	}else{
		XMLHTTP=new ActiveXObject("Microsoft.XMLHTTP");
	}

	if(type === "posts"){
		XMLHTTP.onreadystatechange=function(){
			if(XMLHTTP.readyState==4 && XMLHTTP.status==200){
				var posts = JSON.parse(XMLHTTP.responseText);
				//alert(XMLHTTP.responseText);
				for(var item in posts){
					var size = Math.random()*20 + 15;
					var newObj = new movingButton(new p5.Vector(Math.random() * 900 + 10,Math.random() * 500 + 10),size,size,25,pp);
					newObj.b.anchor = ANCHOR;
					newObj.b.fillCol = pp.color(Math.random()*200, Math.random()*200, Math.random()*200,50);
					newObj.reflect = true;
					newObj.b.addHandler("turnOff",turnOff);
					newObj.b.addHandler("click",clicked);
					newObj.b.addHandler("turnOn",turnOn);
					newObj.b.sound = SOUNDFILE;
					newObj.b.info = posts[item];
					//console.log(newObj);
					mainButton.push(newObj);
				}
				
				displayArray.push(mainButton);
				displayArray.push(button);
				
			}
		}
		XMLHTTP.open("GET","wp-content/themes/zbs/getPostInfo.php");
		XMLHTTP.send();
	}else{
		if(type === "users"){
			XMLHTTP.onreadystatechange=function(){
				if(XMLHTTP.readyState==4 && XMLHTTP.status==200){
					var users = JSON.parse(XMLHTTP.responseText);
					//alert(XMLHTTP.responseText);
					
					for(var item in users){
						var size = Math.random()*20 + 15;
						var newObj = new movingButton(new p5.Vector(Math.random()*900,Math.random()*600),size,size,25,pp);
						newObj.b.anchor = ANCHOR;
						newObj.b.fillCol = pp.color(Math.random()*100, Math.random()*50, Math.random()*200,50);
						newObj.reflect = true;
						newObj.b.addHandler("turnOff",turnOff);
						newObj.b.addHandler("click",clicked_users);
						newObj.b.addHandler("turnOn",turnOn);
						newObj.b.sound = SOUNDFILE;
						newObj.b.info = users[item];
						var imgUrl = newObj.b.info['avatar'];
						if(imgUrl){
							var img = pp.loadImage(imgUrl);
							newObj.b.img = img;
						}
						newObj.b.mask = MARK;
						mainButton.push(newObj);
					}
					
					
					displayArray.push(mainButton);
					displayArray.push(button);
					
			
					
				}
			}
			XMLHTTP.open("GET","wp-content/themes/zbs/getUserInfo.php" + "?userRole=" + arg);
			XMLHTTP.send();
		}
	}
	
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


function clicked_users(event){
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