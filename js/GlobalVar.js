/**
 * infinite程序内部全局变量
 */

var GlobalVar = {
    displayArray : [],
    filterButton : [],
    SOUNDFILE : null,
    pp : null,
    alignState : false,
    attractPtL : null,
    attractPtR : null,
    countPerRow : 10,   //align模式时，每行的button数量
    select : 0,
    translate : [{
        x : 0,
        y : 0
    }]
};

module.exports = GlobalVar;