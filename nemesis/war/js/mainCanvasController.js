
var mainCanvas = new function(){

	function _init(){
		
	
		var canvas = new fabric.Canvas('mainCanvas');
		
		var $ = function(id){return document.getElementById(id)};
		
		var rect = new fabric.Rect({ 
		  width: 100, 
		  height: 100, 
		  top: 150, 
		  left: 150, 
		  fill: 'rgba(255,0,0,0.5)' 
		});
		
		canvas.add(rect);
		
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
		
		function updateControls() {
		  scaleControl.value = rect.getScaleX();
		  angleControl.value = rect.getAngle();
		  leftControl.value = rect.getLeft();
		  topControl.value = rect.getTop();
		}
		canvas.observe({ 
		  'object:moving': updateControls,
		  'object:scaling': updateControls,
		  'object:resizing': updateControls
		});
		
	}
	
	this.init = _init;
}