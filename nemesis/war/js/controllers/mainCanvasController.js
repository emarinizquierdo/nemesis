
var mainCanvasConstructor = function(){

	var _this = this;
	this.canvas;
	
	
	
	function _init(n){
		
		var newcanvas = $('<canvas width="500" height="400"></canvas>');
		newcanvas.attr('id', "new-canvas-" + n);
		newcanvas.addClass("new-canvas");
		$("#canvasWrapper").append(newcanvas)
	
		_this.canvas = new fabric.Canvas( newcanvas.attr('id') );		
		
		_observeCanvas();
		
	}
	
	function _observeCanvas(){
		
		
		
		_this.canvas.observe({ 
			  'object:moving': function(){
				  rightUpperSlidder.updateControls();
			  },
			  'object:scaling': function(){rightUpperSlidder.updateControls();},
			  'object:resizing': function(){rightUpperSlidder.updateControls();},
			  'object:selected' : function(){
				  rightUpperSlidder.enableAll();rightUpperSlidder.updateControls();
				  if(_this.canvas.getActiveGroup() == null){
					  leftTree.treeView.select(leftTree.treeView.findByUid(_this.canvas.getActiveObject().node[0].dataset.uid))
				  }
			   },
			  'selection:cleared' : function(){rightUpperSlidder.disableAll();}
			});		
	}
		
	function _addLocalImage(url,f_callback){
		
		var oImg;
		fabric.Image.fromURL(url,function(img) {
			  oImg = img.set({ left: 300, top: 240}).scale(1);
			  _this.canvas.add(oImg).renderAll(); 
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