var getPostContent = function (id){
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
			
			//将sketch隐藏并移出显示范围，否则即使被遮盖也会有交互效果
			$("#sketch").fadeOut();
			setTimeout("$('#sketch').css('position','fixed')",200);
			$("#sketch").css("bottom","-900px");
			
			
			//返回按钮（关闭）
			var cancel = document.getElementById("postContent_delete");
			if(!cancel){
				var cancel = document.createElement("button");
				cancel.id = "postContent_delete";
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
			
			//滚到顶部
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
		}
	}
	XMLHTTP.open("GET","wp-content/themes/zbs/getPostContent.php?id="+id);
	XMLHTTP.send();
}




module.exports = getPostContent;