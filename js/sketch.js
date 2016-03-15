"use strict"; //严格模式
var displayArray = [];
var mainButton = [];
var button = [];

var xx=document.createElement("div");
xx.setAttribute("id","xx");
document.body.appendChild(xx);
var canvas=document.createElement("div");
canvas.setAttribute("id","zz");
document.body.appendChild(canvas);


$(document).ready(function(){
		var sketch = getPosts();
	});
	$("#getUsers").click(function(){
		displayArray = [];
		mainButton = [];
		button = [];
		$("#sketch").empty();
		var sketch = getUsers("basic_contributor");
	});
	$("#getPosts").click(function(){
		displayArray = [];
		mainButton = [];
		button = [];
		$("#sketch").empty();
		var sketch = getPosts();
});




