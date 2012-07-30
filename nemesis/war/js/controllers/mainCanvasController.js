
var mainCanvas = new function(){

	this.canvas;
	
	
	
	function _init(){
		
	
		mainCanvas.canvas = new fabric.Canvas('mainCanvas');		
		
		_observeCanvas();
		
	}
	
	function _observeCanvas(){
		
		mainCanvas.canvas.observe({ 
			  'object:moving': function(){rightUpperSlidder.updateControls();},
			  'object:scaling': function(){rightUpperSlidder.updateControls();},
			  'object:resizing': function(){rightUpperSlidder.updateControls();},
			  'object:selected' : function(){rightUpperSlidder.enableAll();rightUpperSlidder.updateControls(); leftTree.treeView.select(leftTree.treeView.findByUid(mainCanvas.canvas.getActiveObject().node[0].dataset.uid))},
			  'selection:cleared' : function(){rightUpperSlidder.disableAll();}
			});		
	}
		
	function _addLocalImage(url,f_callback){
		
		var oImg;
		fabric.Image.fromURL(url,function(img) {
			  oImg = img.set({ left: 300, top: 240}).scale(1);
			  mainCanvas.canvas.add(oImg).renderAll(); 
			  f_callback(oImg);			  
		});
		
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