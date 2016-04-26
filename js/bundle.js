/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict"; //严格模式
	var getInfo = __webpack_require__(1);
	var AttractPoint = __webpack_require__(4);

	var displayArray = [];
	var mainButton = [];
	var button = [];

	var SOUNDFILE;
	var sketch;
	var XMLHTTP;
	var ANCHOR;
	var MARK;
	var pp;
	var attractPtL;
	var attractPtR;

	sketch = function(p){
		pp = p;
		p.preload = function() {
			p.soundFormats('wav', 'ogg');
			SOUNDFILE = p.loadSound('wp-content/themes/zbs/sound/water2.wav');
			ANCHOR = new p5.Vector(200,200);
			var option = {
				"p":p,
				"position" : new p5.Vector(300,300),
				"strength" : 0.1
			};
			
			var option_1 = {
				"p":p,
				"position" : new p5.Vector(600,300),
				"strength" : 0.1,
				"clockwise" : true
			};
			attractPtL = new AttractPoint(option);
			attractPtR = new AttractPoint(option_1);
		};
		p.setup = function(){
			p.createCanvas(960,600);
			p.canvas.id = "sketch_1";
		};
		
		p.draw = function(){
			p.background(255);
			//attractPtL.display();
			//attractPtR.display();
			var buttonHoverCount = 0;
			for(var i = 0;i < displayArray.length;i++){
				for(var j = 0;j < displayArray[i].length;j++){
					/*var force = attractPtL.vortexAttract(displayArray[i][j],300);
					displayArray[i][j].applyForce(force);*/
					displayArray[i][j].display();
					
					var vect = p5.Vector.sub(displayArray[i][j].b.position,displayArray[i][j].attractPtL.position);
					var angle = vect.heading();
					var len = vect.mag();
					
					if(!displayArray[i][j].attractPtL.clocklwise && len < 100 && angle < Math.PI/4 && angle > 0){
						displayArray[i][j].attractPtL = attractPtR;
					}else{
						if(displayArray[i][j].attractPtL.clockwise && len < 200 && angle < 3 * Math.PI/4 && angle > Math.PI/2){
							console.log(len);
							displayArray[i][j].attractPtL = attractPtL;
						}
					}
					
					
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


	$(document).ready(function(){
		getInfo("users","basic_contributor");
		$("#getUsers").click(function(){
			getInfo("users","basic_contributor");
		});
		$("#getPosts").click(function(){
			getInfo("posts");
		});
		$("#align").click(function (){
			var len = mainButton.length;
			//;
			for(var k=0; k<len; k++){
				var i = Math.floor(k / 2) + 2;
				var j = k % 2 + 2;
				//console.log(i);
				//console.log(j);
				var option = {
					"position" : new p5.Vector(i*70,j*70),
					"strength" : 1.5
				}
				var attractPtL = new AttractPoint(option);
				mainButton[k].attractPtL = attractPtL;
				//mainButton[k].strength = 1.5;
				mainButton[k].vortex = false;
				//mainButton[k].topspeed = 1;
			}
		});
		
	});

	function getPostContent(id){
		//alert("xxxxxxx");
		if(window.XMLHttpRequest){
			XMLHTTP=new XMLHttpRequest();
		}else{
			XMLHTTP=new ActiveXObject("Microsoft.XMLHTTP");
		}

		XMLHTTP.onreadystatechange=function(){
			if(XMLHTTP.readyState==4 && XMLHTTP.status==200){
				//alert(XMLHTTP.responseText);
				var postContent = document.getElementById("postContent");
				if(!postContent){
					var postContent = document.createElement("div");
					postContent.id = "postContent";
				}
				postContent.innerHTML = XMLHTTP.responseText;
				//$("#infoFrame_fixed").append(XMLHTTP.responseText);
				
				var infoFrame_xx = document.getElementById("infoFrame_xx");
				infoFrame_xx.appendChild(postContent);
				
				var height = document.documentElement.clientHeight - 60 ;
				$("#infoFrame_fixed").animate({height:height});
				
				$("#sketch").fadeOut();
				setTimeout("$('#sketch').css('position','fixed')",200);  //将sketch移出显示范围，否则即使被遮盖也会有交互效果
				$("#sketch").css("bottom","-900px");
				
				var cancel = document.getElementById("postContent_delet");
				if(!cancel){
					var cancel = document.createElement("button");
					cancel.id = "postContent_delet";
					cancel.className = "btn btn-danger btn-sm";
					//cancel.innerHTML = "<span class='glyphicon glyphicon-remove'></span>";
					cancel.onclick = function (){
						$("#infoFrame_fixed").animate({height:"120px"});
						//$("#infoFrame_xx").scrollTop(0);
						$("#infoFrame_xx").animate({ scrollTop: 0 }, 400);
						$("#postContent").fadeOut();
						setTimeout("infoFrame_xx.removeChild(postContent);",300);
						this.remove();
						

						$("#sketch").css("position","static"); //将sketch移回
						$("#sketch").fadeIn();
					}
					infoFrame_fixed.appendChild(cancel);
				}
				var toTop = document.getElementById("toTop");
				if(!toTop){
					var toTop = document.createElement("button");
					toTop.id = "toTop";
					toTop.className = "btn btn-default btn-sm";
					toTop.onclick = function (){
						//$("#infoFrame_xx").scrollTop(0);
						$("#infoFrame_xx").animate({ scrollTop: 0 }, 400);
					}
					
					infoFrame_fixed.appendChild(toTop);
				}
				
				$("#postContent").css("display","none");
				$("#postContent").fadeIn();
				
				/*检查滚动*/
				var sTop;
				sTop = document.getElementById("infoFrame_xx").scrollTop; 

				$("#infoFrame_xx").scroll(function(){    
					sTop = document.getElementById("infoFrame_xx").scrollTop; 
				});
				
				if(sTop == 0)
					{
						$("#toTop").css("display","none");
					}else{
						$("#toTop").css("display","block");
					}
				$("#infoFrame_xx").scroll(function(){     
					if(sTop == 0)
					{
						$("#toTop").fadeOut();
					}else{
						$("#toTop").fadeIn();
					}
				});
				/**/
			}
		}
		XMLHTTP.open("GET","wp-content/themes/zbs/getPostContent.php?id="+id);
		XMLHTTP.send();
	}

	$(window).resize(function() {
		if($("#infoFrame_fixed").css("height") != "120px"){ //若高度大于停靠在下方是的高度时
			$("#infoFrame_fixed").css("height",document.documentElement.clientHeight - 60);
		}
		
		$("#infoFrame_xx").css("height",document.documentElement.clientHeight-80);
		//alert($("#infoFrame_fixed").css("height"));
	});





/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	
	var eventHandleFunc = __webpack_require__(2);
	var util = __webpack_require__(3);

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

/***/ },
/* 2 */
/***/ function(module, exports) {

	var eventHandleFunc = {
	    clicked : function (event){
	        event.target.p.noStroke();
	        event.target.p.fill(0);
	        event.target.p.textAlign("center");
	        var text;
	        text = event.target.info['title'];
	        if(text){
	            event.target.p.text(text,event.target.position.x,event.target.position.y);
	        }	
	    },

	    turnOn : function (event){
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
	    },

	    clicked_users : function (event){
	        event.target.p.noStroke();
	        event.target.p.fill(0);
	        event.target.p.textAlign("center");
	        event.target.p.stroke(255);
	        event.target.p.strokeWeight(5);
	        event.target.p.push();
	        event.target.p.translate(event.target.position.x,event.target.position.y);
	        if(event.target.clickTimeline < 40){
	            event.target.p.rotate(event.target.p.map(event.target.clickTimeline,0,40,0,Math.PI/4));
	        }else{
	            event.target.p.rotate(Math.PI/4);
	        }
	        event.target.p.line(-12,0,12,0);
	        event.target.p.line(0,-12,0,12);
	        event.target.p.pop();
	        /*var text;
	        text = event.target.info['name'];
	        if(text){
	            event.target.p.text(text,event.target.position.x,event.target.position.y);
	        }*/
	    },


	    turnOff : function (event){
	        displayArray[1] = [];
	        $("#userInfo").html('');
	    },

	    showUserInfo : function (event){
	        var sketch = document.getElementById("sketch");
	        var top = getElementTop(sketch);
	        var left = getElementLeft(sketch);
	        //console.log(left);
	        var infoFrame = document.getElementById("infoFrame"+event.target.info['id']);
	        if(!infoFrame){
	            var infoFrame = document.createElement("div");
	            infoFrame.id = "infoFrame"+event.target.info['id'];
	            infoFrame.style.cssText = "background:#fff;position:absolute;top:"+(top+event.target.position.y-50)+"px;left:"+(left+event.target.position.x+50)+"px;width:130px;height:180px;padding:15px;border:solid gray 1px;border-radius:5px;";
	            
	            var img = document.createElement("img");
	            img.src = event.target.info['avatar'];
	            img.style.cssText = "width:100px;height:100px;border-radius:5px;-moz-border-radius:5px;"
	            infoFrame.appendChild(img);
	            
	            var name = document.createElement("div");
	            name.innerHTML = "<b>名字：</b>" + event.target.info['name'];
	            name.style.cssText = "margin-top:20px";
	            infoFrame.appendChild(name);
	            
	            /*var posts = document.createElement("div");
	            posts.innerHTML = event.target.info['posts'];
	            infoFrame.appendChild(posts);*/
	            
	            document.body.appendChild(infoFrame);
	        }
	    },

	    delUserInfo : function (event){
	        var infoFrame = document.getElementById("infoFrame"+event.target.info['id']);
	        if(infoFrame){
	            document.body.removeChild(infoFrame);
	        }
	    },

	    showUserInfo_fixed : function (event){
	        var sketch = document.getElementById("sketch");
	        var top = getElementTop(sketch);
	        var left = getElementLeft(sketch);
	        var infoFrame_fixed = document.getElementById("infoFrame_fixed");
	        if(!infoFrame_fixed){
	            var infoFrame_fixed = document.createElement("div");
	            infoFrame_fixed.id = "infoFrame_fixed";
	            
	            var infoFrame_xx = document.createElement("div");
	            infoFrame_xx.id = "infoFrame_xx";
	            infoFrame_xx.style.cssText = "height:"+(document.documentElement.clientHeight-80)+"px";
	            infoFrame_fixed.appendChild(infoFrame_xx);
	            
	            var imgBlock = document.createElement("div");
	            imgBlock.id = "imgBlock";
	            infoFrame_xx.appendChild(imgBlock);
	            
	                var img = document.createElement("img");
	                img.src = event.target.info['avatar'];
	                imgBlock.appendChild(img);
	            
	            var infoBlock = document.createElement("div");
	            infoBlock.id = "infoBlock";
	            infoFrame_xx.appendChild(infoBlock);
	            
	                var name = document.createElement("div");
	                name.innerHTML = "<b>名字：</b>" + event.target.info['name'];
	                infoBlock.appendChild(name);
	                
	                var posts = document.createElement("div");
	                var ps = event.target.info['posts'];
	                var html = '<b>作品：</b>';
	                html += "<ul>";
	                for(var i=0;i<ps.length;i++){
	                    html += "<li><a role='button' class='getPostContentButton' onclick=getPostContent(" + ps[i].id + ")>"
	                    html += ps[i].title;
	                    html += "</a></li>"
	                }
	                html += "</ul>";
	                posts.innerHTML = html;
	                infoBlock.appendChild(posts);
	            
	            var info = document.getElementById("info");
	            info.appendChild(infoFrame_fixed);
	            $("#infoFrame_fixed").fadeIn();
	        }
	    },

	    delUserInfo_fixed : function (event){
	        var info = document.getElementById("info");
	        var infoFrame_fixed = document.getElementById("infoFrame_fixed");
	        if(infoFrame_fixed){
	            $("#infoFrame_fixed").fadeOut();
	            setTimeout("info.removeChild(infoFrame_fixed)",200);
	            //info.removeChild(infoFrame_fixed);
	        }
	    }

	}

	module.exports = eventHandleFunc;

/***/ },
/* 3 */
/***/ function(module, exports) {

	var util = {
		//用于继承
		inheritPrototype : function (subType,superType){
			var prototype = object(superType.prototype);
			prototype.constructor = subType;
			subType.prototype = prototype;
		},
		object : function (o){
			function F(){}
			F.prototype = o;
			return new F();
		},
		//用于获取元素的绝对位置
		getElementLeft : function (element){
			var actualLeft = element.offsetLeft;
			var current = element.offsetParent;
			while (current !== null){
				actualLeft += current.offsetLeft;
				current = current.offsetParent;
			}
			return actualLeft;
		},
		getElementTop : function (element){
			var actualTop = element.offsetTop;
			var current = element.offsetParent;
			while (current !== null){
				actualTop += current.offsetTop;
				current = current.offsetParent;
			}
			return actualTop;
		},
		getJsonObjLength : function (jsonObj) {
			var Length = 0;
			for (var item in jsonObj) {
			Length++;
			}
			return Length;
		}
	}

	module.exports = util;








/***/ },
/* 4 */
/***/ function(module, exports) {

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

/***/ }
/******/ ]);