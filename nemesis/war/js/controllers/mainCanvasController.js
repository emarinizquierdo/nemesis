var mainCanvas = new function(){

	this.canvas;
	
	function _init(n){
	
		mainCanvas.canvas = new fabric.Canvas( 'canvas' );		
		_observeCanvas();
	}
	
	function _observeCanvas(){
		
		mainCanvas.canvas.observe({ 
		  'object:moving': function(){
			  rightUpperSlidder.updateControls();
		  },
		  'object:scaling': function(){rightUpperSlidder.updateControls();},
		  'object:resizing': function(){rightUpperSlidder.updateControls();},
		  'object:selected' : function(){
			  rightUpperSlidder.enableAll();rightUpperSlidder.updateControls();
			  if(mainCanvas.canvas.getActiveGroup() == null){
				  leftTree.treeView.select(leftTree.treeView.findByUid(mainCanvas.canvas.getActiveObject().node[0].dataset.uid))
			  }
		   },
		  'selection:cleared' : function(){rightUpperSlidder.disableAll();}
		});		
	}
		
	function _addLocalImage(url,f_callback, p_settings){
		
		var oImg;
		fabric.Image.fromURL(url,function(img) {
			
			var settings = {
				  left: 300
				, top: 240
			}
			
			$.extend(settings, p_settings)
			
			oImg = img.set(settings).scale(1);
			mainCanvas.canvas.add(oImg).renderAll(); 
		
			if (f_callback && typeof f_callback === "function") f_callback(oImg);			  
		});
		
	}
	
	function _none(){
		var $ = function(id){return document.getElementById(id)};
		
		var angleControl = $('angle-control');
		angleControl.onchange = function() {
		  rect.setAngle(this.value).setCoords();
		  mainCanvas.canvas.renderAll();
		};
		
		var scaleControl = $('scale-control');
		scaleControl.onchange = function() {
		  rect.scale(this.value).setCoords();
		  mainCanvas.canvas.renderAll();
		};
		
		var topControl = $('top-control');
		topControl.onchange = function() {
		  rect.setTop(this.value).setCoords();
		  mainCanvas.canvas.renderAll();
		};
		
		var leftControl = $('left-control');
		leftControl.onchange = function() {
		  rect.setLeft(this.value).setCoords();
		  mainCanvas.canvas.renderAll();
		};
		
		
	}	
	
	function _loadScene(){
		
		mainCanvas.canvas.clear();
		leftTree.drawTree();
		mainCanvas.canvas.renderAll(); 
		
		
	}

	this.init = _init;
	this.addLocalImage = _addLocalImage;
	this.loadScene = _loadScene;
	
}