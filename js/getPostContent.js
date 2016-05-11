var getPostContent = function (id, title){
	if(window.XMLHttpRequest){
		XMLHTTP=new XMLHttpRequest();
	}else{
		XMLHTTP=new ActiveXObject("Microsoft.XMLHTTP");
	}

	XMLHTTP.onreadystatechange=function(){
		if(XMLHTTP.readyState==4 && XMLHTTP.status==200){
			var navigation_bar = document.getElementById("navigation_bar");
			var infoFrame = document.getElementById("infoFrame");
			var postContent = document.getElementById("postContent");
			if(infoFrame){
				if(postContent){
					postContent.innerHTML = XMLHTTP.responseText;
				}
			}
			//postContent.style.display = "block";//
			$("#postContent").fadeIn();

			var $infoFrame = $("#infoFrame");
			var $sketch = $("#sketch");

			var height = document.documentElement.clientHeight - 50 ;
			$infoFrame.animate({height:height});
			
			//窗口尺寸改变
			$(window).resize(function() {
				if($infoFrame.css("height") != "100px"){ //若高度大于停靠在下方是的高度时
					$infoFrame.css("height",document.documentElement.clientHeight - 50);
				}
			});
			
			//将sketch隐藏并移出显示范围，否则即使被遮盖也会有交互效果
			$sketch.fadeOut();
			setTimeout(function (){$('#sketch').css('position','fixed')},200);
			$sketch.css("bottom","-900px");

			//折叠FilterBar,并隐藏filterBarBtn
			$("#filter").slideUp("fast",function (){
				$("#filterBarBtn").fadeOut();
			});


			var rightCtrlBar = document.getElementById("rightCtrlBar");

			//滚到顶部
			var toTop = document.getElementById("toTop");
			if(!toTop){
				toTop = document.createElement("button");
				toTop.id = "toTop";
				toTop.title = "返回顶部";
				toTop.onclick = function (){
					$infoFrame.animate({ scrollTop: 0 }, 400);
				};

				rightCtrlBar.appendChild(toTop);
			}

			var $toTop = $("#toTop");

			/*检查滚动*/
			var sTop;
			sTop = document.getElementById("infoFrame").scrollTop;
			if(sTop === 0){
				$toTop.css("display","none");
			}else{
				$toTop.css("display","block");
			}

			$infoFrame.scroll(function(){
				sTop = document.getElementById("infoFrame").scrollTop;
				if(sTop === 0){
					$toTop.fadeOut();
				}else{
					$toTop.fadeIn();
				}
			});

			//返回按钮（关闭）
			var cancel = document.getElementById("postContent_delete");
			if(!cancel){
				cancel = document.createElement("button");
				cancel.id = "postContent_delete";
				cancel.title = "关闭";
				//cancel.innerHTML = "<span class='glyphicon glyphicon-remove'></span>";
				cancel.onclick = function (){
					$infoFrame.animate({height:"100px"});
					$infoFrame.animate({ scrollTop: 0 }, 400);
					$("#postContent").fadeOut();
					//var postContent = document.getElementById("postContent");
					//postContent.style.display = "none";
					var title = document.getElementById("title");
					if (title){
						title.classList.add("title_link");     //添加标题鼠标悬浮样式
					}
					$(this).fadeOut();

					$sketch.css("position","static"); //将sketch移回
					$sketch.fadeIn();
					$("#filterBarBtn").fadeIn();
				};
				rightCtrlBar.appendChild(cancel);
			}
			$("#postContent_delete").fadeIn();
			

			
			// $("#postContent").css("display","none");
			// $("#postContent").fadeIn();
			
		}
	};
	XMLHTTP.open("GET","wp-content/themes/zbs/getPostContent.php?id="+id+"&title="+title);
	XMLHTTP.send();
};


module.exports = getPostContent;