/**
 * 定义与Button绑定的事件处理程序
 */
var util = require("./util.js");
var getPostContent = require("./getPostContent.js");

var eventHandleFunc = {
    // clicked : function (event){
    //     event.target.p.noStroke();
    //     event.target.p.fill(0);
    //     event.target.p.textAlign("center");
    //     var text;
    //     text = event.target.info['title'];
    //     if(text){
    //         event.target.p.text(text,event.target.position.x,event.target.position.y);
    //     }	
    // },

    clicked_animation : function (event){
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
    },

    showUserInfo : function (event){
        var sketch = document.getElementById("sketch");
        var top = util.getElementTop(sketch);
        var left = util.getElementLeft(sketch);
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
        var top = util.getElementTop(sketch);
        var left = util.getElementLeft(sketch);
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
                var ul = document.createElement("ul");
                ul.innerHTML = '<b>作品：</b>';

                for(var i=0;i<ps.length;i++){
                    var li = document.createElement("li");
                    var a = document.createElement("a");
                    a.id = "getPostContentButton" + ps[i].id;
                    a.className = 'getPostContentButton';
                    a.innerHTML = ps[i].title;
                    a.data_id = ps[i].id;
                    li.appendChild(a);
                    a.onclick = function (){
                        getPostContent(this.data_id);
                    };
                    ul.appendChild(li);
                }

                posts.appendChild(ul);
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
    },

    getPostInfo : function (event){
        var doc = document;
        var postInfoFrame = doc.getElementById("postInfoFrame");    //postInfoFrame
        if(postInfoFrame){
            postInfoFrame.style.display = "block";
            postInfoFrame.innerHTML = "";    //清空
        }else{
            var postInfoFrame = doc.createElement("div");
            postInfoFrame.id = "postInfoFrame";
        }

        var thumbnail = doc.createElement("img");      //thumbnail
        thumbnail.src = event.target.info['thumbnail'];
        thumbnail.width = 80;
        thumbnail.height = 80;
        thumbnail.alt = event.target.info['title'];

        var title = doc.createElement("div");     //title
        title.id += "title";
        title.innerHTML = "<h2>" + event.target.info['title'] + "</h2>";

        var author = doc.createElement("div");     //author
        author.className += "postMeta";
        author.title = "author";
        author.innerHTML = "作者：" + event.target.info['author'];

        var productType = doc.createElement("div");
        productType.className += "postMeta";
        productType.title = "productType";
        productType.innerHTML = "作品类型：" + event.target.info['productType'] || "其他";

        var major = doc.createElement("div");
        major.className += "postMeta";
        major.title = "major";
        major.innerHTML = "专业：" + event.target.info['major'] + "-" + event.target.info['subMajor'];

        var creationDate = doc.createElement("div");
        creationDate.className += "postMeta";
        creationDate.title = "creationDate";
        creationDate.innerHTML = "创作年份：" + event.target.info['creationDate'] + "年";

        postInfoFrame.appendChild(thumbnail);
        postInfoFrame.appendChild(title);
        postInfoFrame.appendChild(author);
        postInfoFrame.appendChild(productType);
        postInfoFrame.appendChild(major);
        postInfoFrame.appendChild(creationDate);
        doc.body.appendChild(postInfoFrame);
    },

    hidePostInfoFrame : function (event){
        var doc = document;
        var postInfoFrame = doc.getElementById("postInfoFrame");
        if(postInfoFrame){
            postInfoFrame.style.display = "none";
        }
    }

};

module.exports = eventHandleFunc;