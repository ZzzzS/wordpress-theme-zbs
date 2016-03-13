"use strict"; //严格模式
var myCanvas;
var b,c;
var displayArray = [];
var mainButton = [];
var button = [];
var soundFile;
var buttonHoverCount;
var sketch;

var xx=document.createElement("div");
xx.setAttribute("id","xx");
document.body.appendChild(xx);
var canvas=document.createElement("div");
canvas.setAttribute("id","zz");
document.body.appendChild(canvas);


$(document).ready(function(){
	getUsers("basic_contributor");
});




