//用于继承
function inheritPrototype(subType,superType){
	var prototype = object(superType.prototype);
	prototype.constructor = subType;
	subType.prototype = prototype;
}
function object(o){
	function F(){}
	F.prototype = o;
	return new F();
}

//用于获取元素的绝对位置
function getElementLeft(element){
	var actualLeft = element.offsetLeft;
	var current = element.offsetParent;
	while (current !== null){
		actualLeft += current.offsetLeft;
		current = current.offsetParent;
	}
	return actualLeft;
}
function getElementTop(element){
	var actualTop = element.offsetTop;
	var current = element.offsetParent;
	while (current !== null){
		actualTop += current.offsetTop;
		current = current.offsetParent;
	}
	return actualTop;
}

function getJsonObjLength(jsonObj) {
    var Length = 0;
    for (var item in jsonObj) {
      Length++;
    }
    return Length;
}