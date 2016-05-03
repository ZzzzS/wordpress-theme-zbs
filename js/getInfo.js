
var eventHandleFunc = require("./EventHandleFunc.js");
var util = require("./util.js");
var globalVar = require("./GlobalVar.js");
var ButtonParticle = require("./ButtonParticle.js");
var ButtonPlus = require("./ButtonPlus.js");

var getInfo = function (type,arg){
	
	globalVar.displayArray = [];
	globalVar.mainButton = [];
	globalVar.button = [];
	
	if(window.XMLHttpRequest){
		XMLHTTP=new XMLHttpRequest();
	}else{
		XMLHTTP=new ActiveXObject("Microsoft.XMLHTTP");
	}

	if(type === "posts"){
		XMLHTTP.onreadystatechange=function(){
			if(XMLHTTP.readyState==4 && XMLHTTP.status==200){
				ButtonPlus.stateReset();
				var posts = JSON.parse(XMLHTTP.responseText);
				//alert(XMLHTTP.responseText);
				console.log(XMLHTTP.responseText);
				globalVar.displayArray.ButtonParticle = [];
				for(var item in posts){
					var size = Math.random()*20 + 15;
					var options = {
						position : new p5.Vector(Math.random() * 900 + 10,Math.random() * 500 + 10),
						width : size,
						height : size,
						r : 25,
						p : globalVar.pp
					}
					var newObj = new ButtonParticle(options);
					newObj.attractPtL = globalVar.attractPtL;
					newObj.reflect = true;

					newObj.b.addHandler("click",eventHandleFunc.clicked_animation);
					
					newObj.b.sound = globalVar.SOUNDFILE;
					newObj.b.info = posts[item];
					newObj.b.buttonCol = newObj.b.info["color"];
					globalVar.displayArray.ButtonParticle.push(newObj);
				}
				
				
				console.log(globalVar.displayArray.ButtonParticle);
			}
		}
		XMLHTTP.open("GET","wp-content/themes/zbs/getPostInfo.php");
		XMLHTTP.send();
	}else{
		if(type === "users"){
			XMLHTTP.onreadystatechange=function(){
				ButtonPlus.stateReset();
				if(XMLHTTP.readyState==4 && XMLHTTP.status==200){
					var users = JSON.parse(XMLHTTP.responseText);
					//alert(XMLHTTP.responseText);
					//console.log(XMLHTTP.responseText);
					
					var i = 0;
					var count = util.getJsonObjLength(users);
					for(var item in users){
						globalVar.displayArray.ButtonParticle = [];
						var size = Math.random()*20 + 20;
						var options = {
							position : new p5.Vector(Math.random()*900+30, Math.random()*550+25),
							width : size,
							height : size,
							r : 25,
							p : globalVar.pp
						}
						var newObj = new ButtonParticle(options);
						if(i < count/2){
							newObj.attractPtL = globalVar.attractPtL;
						}else{
							newObj.attractPtL = globalVar.attractPtR;
						}

						newObj.b.buttonCol = globalVar.pp.color(Math.random()*100, Math.random()*50, Math.random()*200,255);
						newObj.reflect = true;
						newObj.b.addHandler("turnOff",eventHandleFunc.turnOff);
						newObj.b.addHandler("click",eventHandleFunc.clicked_animation);
						newObj.b.addHandler("turnOn",eventHandleFunc.delUserInfo);
						newObj.b.addHandler("turnOn",eventHandleFunc.showUserInfo_fixed);
						newObj.b.addHandler("turnOff",eventHandleFunc.delUserInfo_fixed);
						newObj.b.addHandler("hover",eventHandleFunc.showUserInfo);
						newObj.b.addHandler("mouseOut",eventHandleFunc.delUserInfo);
						newObj.b.sound = globalVar.SOUNDFILE;
						newObj.b.info = users[item];
						
						globalVar.displayArray.ButtonParticle.push(newObj);
						i++;
					}
					i = null;
					count = null;
					
					
					
					
			
					
				}
			}
			XMLHTTP.open("GET","wp-content/themes/zbs/getUserInfo.php" + "?userRole=" + arg);
			XMLHTTP.send();
		}
	}
	
}


module.exports = getInfo;