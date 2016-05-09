/**
 * Created by zhang on 2016/5/8 0008.
 */
var globalVar = require("./GlobalVar.js");
var ButtonPlus = require("./ButtonPlus.js");

var FilterButton = function (options){
    this.keyword = options.keyword;
    this.value = options.value;
    this.switch = false;

    if (options.node){
        this.node = options.node;
    }else{
        this.id = options.id;
        this.text = options.text || "FilterButton";
        this.parentId = options.parentId;
        this.createElement();
    }
    this.node.classList += "FilterButton";
    this.attachEvent();
};

FilterButton.prototype.createElement = function (){
    var doc = document;
    this.node = doc.createElement("a");
    this.node.id = this.id;
    this.node.innerHTML = this.text;
    this.node.href = "#";
    if (this.parentId){
        var parentNode = doc.getElementById(this.parentId);
        if (parentNode){
            parentNode.appendChild(this.node);
        }else{
            doc.body.appendChild(this.node);
        }
    }else{
        doc.body.appendChild(this.node);
    }

};

FilterButton.prototype.doFilter = function (){
    var BP = globalVar.displayArray.ButtonParticle;

    for (var j = 0; j < globalVar.filterButton.length; j++){     //将全局环境中的其他FilterButton的switch全部设置为false,并修改按钮背景颜色
        if (globalVar.filterButton[j] !== this){
            globalVar.filterButton[j].switch = false;
            globalVar.filterButton[j].node.classList.remove("active");
        }
    }

    for(var i = 0, len = BP.length; i < len; i++){
        BP[i].visualObject.filtered = false;
    }

    if (this.switch){
        for(i = 0, len = BP.length; i < len; i++){
            if (BP[i].visualObject.info[this.keyword] !== this.value){
                if(BP[i].visualObject.pState === "click"){
                    BP[i].visualObject.pState = "mouseOut";       //fliter切换后，将之前“click”状态的button改为普通状态，即状态重置
                    ButtonPlus.prototype.hoverObjCount = 0;        //选中个数也必须重置
                    BP[i].visualObject.fire({ type: "turnOff" });     //ButtonPlus触发turnOff事件
                }
                BP[i].visualObject.filtered = true;
            }
        }
    }
};

FilterButton.prototype.attachEvent = function (){
    this.node.onclick = function (){
        this.switch = ~this.switch;

        if (this.switch){                   //切换FilterButton的显示效果
            this.node.classList.add("active");
        }else{
            this.node.classList.remove("active");
        }

        this.doFilter();
    }.bind(this);
};

module.exports = FilterButton;