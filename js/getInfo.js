
var eventHandleFunc = require("./EventHandleFunc.js");
var util = require("./util.js");

var getInfo = function (type,arg){
	
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
					var options = {
						position : new p5.Vector(Math.random() * 900 + 10,Math.random() * 500 + 10),
						width : size,
						height : size,
						r : 25,
						p : pp
					}
					var newObj = new movingButton(options);
					newObj.attractPtL = attractPtL;
					newObj.b.fillCol = pp.color(Math.random()*200, Math.random()*200, Math.random()*200,50);
					newObj.reflect = true;
					newObj.b.addHandler("turnOff",eventHandleFunc.turnOff);
					newObj.b.addHandler("click",eventHandleFunc.clicked);
					newObj.b.addHandler("turnOn",eventHandleFunc.turnOn);
					newObj.b.sound = SOUNDFILE;
					newObj.b.info = posts[item];
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
					console.log(XMLHTTP.responseText);
					
					var i = 0;
					var count = util.getJsonObjLength(users);
					for(var item in users){
						var size = Math.random()*20 + 15;
						var options = {
							position : new p5.Vector(Math.random()*900+30, Math.random()*550+25),
							width : size,
							height : size,
							r : 25,
							p : pp
						}
						var newObj = new movingButton(options);
						if(i < count/2){
							newObj.attractPtL = attractPtL;
						}else{
							newObj.attractPtL = attractPtR;
						}

						newObj.b.fillCol = pp.color(Math.random()*100, Math.random()*50, Math.random()*200,50);
						newObj.reflect = true;
						newObj.b.addHandler("turnOff",eventHandleFunc.turnOff);
						newObj.b.addHandler("click",eventHandleFunc.clicked_users);
						newObj.b.addHandler("turnOn",eventHandleFunc.delUserInfo);
						newObj.b.addHandler("turnOn",eventHandleFunc.showUserInfo_fixed);
						newObj.b.addHandler("turnOff",eventHandleFunc.delUserInfo_fixed);
						newObj.b.addHandler("hover",eventHandleFunc.showUserInfo);
						newObj.b.addHandler("mouseOut",eventHandleFunc.delUserInfo);
						newObj.b.sound = SOUNDFILE;
						newObj.b.info = users[item];
						newObj.b.mask = MARK;
						mainButton.push(newObj);
						i++;
					}
					i = null;
					count = null;
					
					
					displayArray.push(mainButton);
					displayArray.push(button);
					
			
					
				}
			}
			XMLHTTP.open("GET","wp-content/themes/zbs/getUserInfo.php" + "?userRole=" + arg);
			XMLHTTP.send();
		}
	}
	
}


module.exports = getInfo;