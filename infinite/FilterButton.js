/**
 * Created by zhang on 2016/5/8 0008.
 */
var globalVar = require("./GlobalVar.js");
var ButtonPlus = require("./ButtonPlus.js");

var FilterButton = function (options){
    this.type = options.type;
    if (this.type !== "cancel"){
        this.value = options.value;
        this.switch = false;
    }
    this.keyword = options.keyword;


    if (options.node){
        this.node = options.node;
    }else{
        this.id = options.id;
        this.text = options.text;
        this.class = options.class;
        this.parentId = options.parentId;
        this.createElement();
    }

    //this.class = options.class;
    //if (this.class){
    //    this.node.classList += this.class;
    //}
    //this.node.classList += "FilterButton";
    this.node.title = options.title;
    this.attachEvent();
};

FilterButton.prototype.select = {};

FilterButton.prototype.createElement = function (){
    var doc = document;
    this.node = doc.createElement("button");
    this.node.id = this.id;
    this.node.className = this.class;
    this.node.innerHTML = this.text;
    //this.node.href = "#";
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

    for(var i = 0, len = BP.length; i < len; i++){
        BP[i].visualObject.filtered = false;
    }

    var status = [];
    for (i = 0, len = BP.length; i < len; i++) {
        var m = 0;
        for (var keyword in this.constructor.prototype.select) {
            if (this.constructor.prototype.select[keyword].length === 0){      //如果有一列的多选按钮点击个数减少到0，则filter失效
                if (m === 0){
                    status[i] = false;
                }else{
                    status[i] |= false;
                }
                //BP[i].visualObject.filtered = false;
                delete this.constructor.prototype.select[keyword];
            }else{
                if (this.constructor.prototype.select[keyword].indexOf(BP[i].visualObject.info[keyword]) === -1) {     // ===-1说明不存在
                    if (BP[i].visualObject.pState === "click") {
                        BP[i].visualObject.pState = "mouseOut";       //fliter切换后，将之前“click”状态的button改为普通状态，即状态重置
                        ButtonPlus.prototype.hoverObjCount = 0;        //选中个数也必须重置
                        BP[i].visualObject.fire({type: "turnOff"});     //ButtonPlus触发turnOff事件
                    }

                    if (m === 0){
                        status[i] = true;
                    }else{
                        status[i] |= true;
                    }
                }else{
                    if (m === 0){
                        status[i] = false;
                    }else{
                        status[i] |= false;

                    }
                }
            }
            m ++;
        }
    }

    for(i = 0; i < len; i++){
        BP[i].visualObject.filtered = status[i];
    }
};

FilterButton.prototype.attachEvent = function (){
    if (this.type !== "cancel"){
        this.node.onclick = function (){
            this.switch = this.switch ? false : true;

            if (this.switch){                 //切换FilterButton的显示效果
                this.node.classList.add("active");

                if(!this.constructor.prototype.select[this.keyword]){
                    this.constructor.prototype.select[this.keyword] = [];
                }
                this.constructor.prototype.select[this.keyword].push(this.value);

                for(var i in globalVar.filterButton){                                        //当该类型有按钮被按下时,激活该类型的删除按钮
                    if (globalVar.filterButton[i].type === "cancel" && globalVar.filterButton[i].keyword === this.keyword){
                        globalVar.filterButton[i].node.classList.add("cancelActive");
                    }
                    if (globalVar.filterButton[i].type === "cancel" && globalVar.filterButton[i].keyword === undefined){
                        globalVar.filterButton[i].node.classList.add("cancelActive");
                    }
                }
            }else{
                this.node.classList.remove("active");
                var keyword = this.constructor.prototype.select[this.keyword];
                if (keyword !== undefined){
                    var id = keyword.indexOf(this.value);
                    keyword.splice(id, 1);
                }
                if (keyword.length === 0){
                    for(var i in globalVar.filterButton){                                        //当该类型的所有按钮没被按下时,取消激活该类型的删除按钮
                        if (globalVar.filterButton[i].type === "cancel" && globalVar.filterButton[i].keyword === this.keyword){
                            globalVar.filterButton[i].node.classList.remove("cancelActive");
                        }
                    }
                }

                this.disactiveCancelAll();    //当所有按钮没被按下时,取消激活cancelAll
            }

            this.doFilter();
        }.bind(this);
    }else{                                              //如果是删除按钮
        this.node.onclick = function (){
            if (this.keyword){
                this.constructor.prototype.select[this.keyword] = [];

                for (var i in globalVar.filterButton){        //清除某个类型的按钮
                    if (globalVar.filterButton[i].switch && globalVar.filterButton[i].keyword === this.keyword){
                        globalVar.filterButton[i].switch = globalVar.filterButton[i].switch ? false : true;
                        globalVar.filterButton[i].node.classList.remove("active");
                    }
                }

                this.disactiveCancelAll();    //当所有按钮没被按下时,取消激活cancelAll

            }else{                              //全部清除
                for (var keyword in this.constructor.prototype.select) {
                    this.constructor.prototype.select[keyword] = [];
                }
                for (i in globalVar.filterButton){
                    if (globalVar.filterButton[i].switch){
                        globalVar.filterButton[i].switch = globalVar.filterButton[i].switch ? false : true;
                        globalVar.filterButton[i].node.classList.remove("active");
                    }
                    if (globalVar.filterButton[i].type === "cancel"){
                        globalVar.filterButton[i].node.classList.remove("cancelActive");
                    }
                }
            }
            this.node.classList.remove("cancelActive");
            this.doFilter();
        }.bind(this);
    }
};

FilterButton.prototype.disactiveCancelAll = function (){   //当所有按钮没被按下时,取消激活cancelAll
    for (var i in this.constructor.prototype.select){
        if (this.constructor.prototype.select[i].length !== 0){
            return;
        }
    }
    for(var i in globalVar.filterButton){
        if (globalVar.filterButton[i].type === "cancel" && globalVar.filterButton[i].keyword === undefined){
            globalVar.filterButton[i].node.classList.remove("cancelActive");
        }
    }
};

module.exports = FilterButton;