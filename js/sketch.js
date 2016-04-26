"use strict"; //严格模式
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



