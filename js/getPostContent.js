var getPostContent = function (id, title){
	if(window.XMLHttpRequest){
		XMLHTTP=new XMLHttpRequest();
	}else{
		XMLHTTP=new ActiveXObject("Microsoft.XMLHTTP");
	}

	XMLHTTP.onreadystatechange=function(){
		if(XMLHTTP.readyState==4 && XMLHTTP.status==200){
			var postContent = document.createElement("div");
			postContent.id = "postContent";
			postContent.innerHTML = XMLHTTP.responseText;
			infoFrame = document.getElementById("infoFrame");
			var pc = document.getElementById("postContent");
			if(infoFrame){
				if(pc){
					pc.parentNode.removeChild(pc);
				}
				infoFrame.appendChild(postContent);
			}
			
			var height = document.documentElement.clientHeight - 60 ;
			$("#infoFrame").animate({height:height});
			
			//窗口尺寸改变
			$(window).resize(function() {
				if($("#infoFrame").css("height") != "100px"){ //若高度大于停靠在下方是的高度时
					$("#infoFrame").css("height",document.documentElement.clientHeight - 60);
				}
			});
			
			//将sketch隐藏并移出显示范围，否则即使被遮盖也会有交互效果
			$("#sketch").fadeOut();
			setTimeout(function (){$('#sketch').css('position','fixed')},200);
			$("#sketch").css("bottom","-900px");
			
			
			//返回按钮（关闭）
			var cancel = document.getElementById("postContent_delete");
			if(!cancel){
				var cancel = document.createElement("button");
				cancel.id = "postContent_delete";
				cancel.className = "btn btn-danger btn-sm";
				//cancel.innerHTML = "<span class='glyphicon glyphicon-remove'></span>";
				cancel.onclick = function (){
					$("#infoFrame").animate({height:"100px"});
					$("#infoFrame").animate({ scrollTop: 0 }, 400);
					$("#postContent").fadeOut();
					//setTimeout(function (){infoFrame.removeChild(postContent);},300);
					this.remove();

					$("#sketch").css("position","static"); //将sketch移回
					$("#sketch").fadeIn();
				}
				document.body.appendChild(cancel);
			}
			
			//滚到顶部
			var toTop = document.getElementById("toTop");
			if(!toTop){
				var toTop = document.createElement("button");
				toTop.id = "toTop";
				toTop.className = "btn btn-default btn-sm";
				toTop.onclick = function (){
					$("#infoFrame").animate({ scrollTop: 0 }, 400);
				}
				
				document.body.appendChild(toTop);
			}
			
			/*检查滚动*/
			var sTop;
			sTop = document.getElementById("infoFrame").scrollTop;

			$("#infoFrame").scroll(function(){
				sTop = document.getElementById("infoFrame").scrollTop; 
			});

			if(sTop == 0){
				$("#toTop").css("display","none");
			}else{
				$("#toTop").css("display","block");
			}
			$("#infoFrame").scroll(function(){
				if(sTop == 0){
					$("#toTop").fadeOut();
				}else{
					$("#toTop").fadeIn();
				}
			});
			
			// $("#postContent").css("display","none");
			// $("#postContent").fadeIn();
			
		}
	}
	XMLHTTP.open("GET","wp-content/themes/zbs/getPostContent.php?id="+id+"&title="+title);
	XMLHTTP.send();
}




module.exports = getPostContent;