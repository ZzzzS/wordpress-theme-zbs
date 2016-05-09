/**
 * Created by zhang on 2016/5/8 0008.
 */
var globalVar = require("./GlobalVar.js");
var ButtonPlus = require("./ButtonPlus.js");

var FilterButton = function (options){
    this.keyword = options.keyword;
    this.value = options.value;
    this.switch = false;
    this.selectId = globalVar.filterButton.length;

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

FilterButton.prototype.select = {};

FilterButton.prototype.createElement = function (){
    var doc = document;
    this.node = doc.createElement("button");
    this.node.id = this.id;
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


    //alert(this.value);
    //console.log(this.constructor.prototype.select);
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
                    //BP[i].visualObject.filtered = true;
                }else{
                    //BP[i].visualObject.filtered = false;
                    if (m === 0){
                        status[i] = false;
                    }else{
                        status[i] |= false;

                    }
                }
            }
            m ++;
        }
        console.log(i);
        console.log(status);
    }

    for(i = 0; i < len; i++){
        BP[i].visualObject.filtered = status[i];
    }






    //for (var j = 0; j < globalVar.filterButton.length; j++){     //将全局环境中的其他FilterButton的switch全部设置为false,并修改按钮背景颜色
    //    if (globalVar.filterButton[j] !== this){
    //        globalVar.filterButton[j].switch = false;
    //        globalVar.filterButton[j].node.classList.remove("active");
    //    }
    //}

    //for(var i = 0, len = BP.length; i < len; i++){
    //    BP[i].visualObject.filtered = false;
    //}

    //if (this.switch){
    //    for(i = 0, len = BP.length; i < len; i++){
    //        if (BP[i].visualObject.info[this.keyword] !== this.value){
    //            if(BP[i].visualObject.pState === "click"){
    //                BP[i].visualObject.pState = "mouseOut";       //fliter切换后，将之前“click”状态的button改为普通状态，即状态重置
    //                ButtonPlus.prototype.hoverObjCount = 0;        //选中个数也必须重置
    //                BP[i].visualObject.fire({ type: "turnOff" });     //ButtonPlus触发turnOff事件
    //            }
    //            BP[i].visualObject.filtered = true;
    //        }
    //    }
    //}
};

FilterButton.prototype.attachEvent = function (){
    this.node.onclick = function (){
        this.switch = ~this.switch;

        if (this.switch){                   //切换FilterButton的显示效果
            this.node.classList.add("active");

            if(!this.constructor.prototype.select[this.keyword]){
                this.constructor.prototype.select[this.keyword] = [];
            }
            this.constructor.prototype.select[this.keyword].push(this.value);
            //console.log(this.constructor.prototype.select);

            //this.changeSelect();       //更改globalVar.select的状态
        }else{
            this.node.classList.remove("active");
            var id = this.constructor.prototype.select[this.keyword].indexOf(this.value);
            this.constructor.prototype.select[this.keyword].splice(id, 1);
            //this.changeSelect();      //更改globalVar.select的状态
        }

        this.doFilter();
    }.bind(this);
};

FilterButton.prototype.changeSelect = function (){
    if (this.switch){
        globalVar.select |= 1 << this.selectId;
    }else{
        globalVar.selsct &= ~(1 << this.selectId);
    }
};

module.exports = FilterButton;