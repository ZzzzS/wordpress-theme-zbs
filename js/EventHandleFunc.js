/**
 * 定义与Button绑定的事件处理程序
 */
var util = require("./util.js");
var getPostContent = require("./getPostContent.js");

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
        /*var vect = new p5.Vector(event.target.width / 2 + 30,0);
        var count = 5;
        vect.rotate(-0.68 * (count - 1) / 2);
        for(var i = 0; i < count; i++){
            if(i > 0) vect.rotate(0.68);
            var visualObject = new Button(new p5.Vector(event.target.position.x + vect.x,event.target.position.y + vect.y),30,30,10,event.target.p);
            visualObject.fillCol = event.target.p.color(Math.random()*100, Math.random()*50, Math.random()*200,200);
            visualObject.switchEffect = false;
            displayArray[1].push(visualObject);
        }*/
        
        /*var post = event.target.info['posts'];
        if(post){ 
            $("#userInfo").html(post);
        }*/
    },

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
        /*var text;
        text = event.target.info['name'];
        if(text){
            event.target.p.text(text,event.target.position.x,event.target.position.y);
        }*/
    },


    turnOff : function (event){/*
        displayArray[1] = [];
        $("#userInfo").html('');*/
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
    }

}

module.exports = eventHandleFunc;