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

    showSortUserInfo : function (event){
        if(event.target.pState !== "hover"){
            var sketch = document.getElementById("sketch");
            var top = util.getElementTop(sketch);
            var left = util.getElementLeft(sketch);

            var sortInfoFrame = document.getElementById("sortInfoFrame");
            if(sortInfoFrame){
                sortInfoFrame.style.visibility = "visible";
                sortInfoFrame.innerHTML = "";
            }else{
                sortInfoFrame = document.createElement("div");
                sortInfoFrame.id = "sortInfoFrame";
            }
            sortInfoFrame.style.top = top+event.target.position.y-50 + "px";
            sortInfoFrame.style.left = left+event.target.position.x+50 + "px";

            var img = document.createElement("img");
            img.src = event.target.info['avatar'];
            img.style.cssText = "width:100px;height:100px;border-radius:5px;-moz-border-radius:5px;";
            sortInfoFrame.appendChild(img);

            var name = document.createElement("div");
            name.innerHTML = "<b>名字：</b>" + event.target.info['name'];
            name.style.cssText = "margin-top:20px";
            sortInfoFrame.appendChild(name);

            document.body.appendChild(sortInfoFrame);
        }

    },

    hideSortUserInfo : function (event){
        if (event.target.hoverObjCount === 0 || event.target.state === "press") {
            var doc = document;
            var sortInfoFrame = doc.getElementById("sortInfoFrame");
            if(sortInfoFrame){
                sortInfoFrame.style.visibility = "hidden";
            }
        }
    },

    showUserInfo : function (event){
        var doc = document;
        var sketch = document.getElementById("sketch");

        var infoFrame = document.getElementById("infoFrame");
        if(infoFrame){
            infoFrame.style.visibility = "visible";
            infoFrame.innerHTML = "";    //清空
        }else{
            infoFrame = document.createElement("div");
            infoFrame.id = "infoFrame";
        }

        var introduction = doc.createElement("div");
        introduction.id = "introduction";

            var avatar = doc.createElement("img");      //avatar
            avatar.src = event.target.info['avatar'];
            avatar.width = 80;
            avatar.height = 80;
            avatar.alt = event.target.info['name'];

            var infoContainer = doc.createElement("div");
            infoContainer.id = "infoContainer";

                var name = doc.createElement("div");     //title
                name.id += "name";
                name.innerHTML = "<h2>" + event.target.info['name'] + "</h2>";

                var ps = event.target.info['posts'];
                var fragment = doc.createDocumentFragment();
                for(var i=0;i<ps.length;i++){
                    var posts = doc.createElement("div");     //author
                    posts.className += "postMeta";
                    posts.title = "posts";
                    //posts.id = "getPostContentButton" + ps[i].id;
                    posts.innerHTML = ps[i].title;
                    posts.data_id = ps[i].id;
                    posts.onclick = function (){
                        getPostContent(this.data_id,true);
                    };
                    fragment.appendChild(posts);
                }

        infoContainer.appendChild(name);
        infoContainer.appendChild(fragment);

        introduction.appendChild(avatar);
        introduction.appendChild(infoContainer);

        infoFrame.appendChild(introduction);
        doc.body.appendChild(infoFrame);
    },

    showPostInfo : function (event){
        var doc = document;
        var infoFrame = doc.getElementById("infoFrame");    //infoFrame
        if(infoFrame){
            infoFrame.style.visibility = "visible";
            infoFrame.innerHTML = "";    //清空
        }else{
            infoFrame = doc.createElement("div");
            infoFrame.id = "infoFrame";
        }

        var introduction = doc.createElement("div");
        introduction.id = "introduction";

            var thumbnail = doc.createElement("img");      //thumbnail
            thumbnail.src = event.target.info['thumbnail'];
            thumbnail.width = 80;
            thumbnail.height = 80;
            thumbnail.alt = event.target.info['title'];

            var infoContainer = doc.createElement("div");
            infoContainer.id = "infoContainer";

                var title = doc.createElement("div");     //title
                title.onclick = function (){
                    getPostContent(event.target.info['id'], false);  //false : no title
                };
                title.id += "title";
                title.innerHTML = "<h2>" + event.target.info['title'] + "</h2>";

                var author = doc.createElement("div");     //author
                author.className += "postMeta";
                author.title = "author";
                author.innerHTML = "作者：" + event.target.info['author'];

                var productType = doc.createElement("div");
                productType.className += "postMeta";
                productType.title = "productType";
                productType.innerHTML = "作品类型：" + (event.target.info['productType'] || "-----");

                var major = doc.createElement("div");
                major.className += "postMeta";
                major.title = "major";
                major.innerHTML = "专业：" + (event.target.info['major'] || "---") + "-" + (event.target.info['subMajor'] || "---");

                var creationDate = doc.createElement("div");
                creationDate.className += "postMeta";
                creationDate.title = "creationDate";
                creationDate.innerHTML = "创作年份：" + (event.target.info['creationDate'] || "-----") + "年";

        infoContainer.appendChild(title);
        infoContainer.appendChild(author);
        infoContainer.appendChild(productType);
        infoContainer.appendChild(major);
        infoContainer.appendChild(creationDate);

        introduction.appendChild(thumbnail);
        introduction.appendChild(infoContainer);

        infoFrame.appendChild(introduction);
        doc.body.appendChild(infoFrame);
    },

    hideInfoFrame : function (event){
        var doc = document;
        var infoFrame = doc.getElementById("infoFrame");
        if(infoFrame){
            infoFrame.style.visibility = "hidden";
        }
    }

};

module.exports = eventHandleFunc;