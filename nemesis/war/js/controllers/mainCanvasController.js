
var mainCanvas = new function(){

	this.canvas;
	
	function _init(){
		
	
		this.canvas = new fabric.Canvas('mainCanvas');		
		
		_observeCanvas();
		
	}
	
	function _observeCanvas(){
		
		mainCanvas.canvas.observe({ 
			  'object:moving': updateControls,
			  'object:scaling': updateControls,
			  'object:resizing': updateControls
			});
		
		function updateControls() {
			/*
			  scaleControl.value = rect.getScaleX();
			  angleControl.value = rect.getAngle();
			  leftControl.value = rect.getLeft();
			  topControl.value = rect.getTop();*/
			}		
		
	}
	
	function _addLocalImage(url){
		
		var oImg
		var auxImg = fabric.Image.fromURL(url,function(img) {
			  oImg = img.set({ left: 300, top: 240, }).scale(1);
			  mainCanvas.canvas.add(oImg).renderAll();
			});
		
		return oImg;
		
	}
	
	function _none(){
		var $ = function(id){return document.getElementById(id)};
		
		var angleControl = $('angle-control');
		angleControl.onchange = function() {
		  rect.setAngle(this.value).setCoords();
		  canvas.renderAll();
		};
		
		var scaleControl = $('scale-control');
		scaleControl.onchange = function() {
		  rect.scale(this.value).setCoords();
		  canvas.renderAll();
		};
		
		var topControl = $('top-control');
		topControl.onchange = function() {
		  rect.setTop(this.value).setCoords();
		  canvas.renderAll();
		};
		
		var leftControl = $('left-control');
		leftControl.onchange = function() {
		  rect.setLeft(this.value).setCoords();
		  canvas.renderAll();
		};
		
		
	}
	
	this.init = _init;
	this.addLocalImage = _addLocalImage;
}