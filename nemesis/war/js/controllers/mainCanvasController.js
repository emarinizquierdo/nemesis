var mainCanvasConstructor = function(){

	var _this = this;
	this.canvas;
	
	function _init(n){
	
		var newCanvas = $('<canvas id="new-canvas-' + n + '" width="500" height="400" class="canvas"></canvas>');
		$('#canvasWrapper').append(newCanvas);
		_this.canvas = new fabric.Canvas( 'new-canvas-' + n );		
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
			  rightUpperSlidder.enableAll();
			  rightUpperSlidder.updateControls();
			  if(_this.canvas.getActiveGroup() == null){
				  leftTree.treeView.select(leftTree.treeView.findByUid(_this.canvas.getActiveObject().node[0].dataset.uid));
				  actionController.updateActionList();
			  }
		   },
		  'selection:cleared' : function(){
			  rightUpperSlidder.disableAll(); 
			  leftTree.unselectAllNodes();
			  actionController.updateActionList();
		  }
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
			_this.canvas.add(oImg).renderAll(); 
		
			if (f_callback && typeof f_callback === "function") f_callback(oImg);			  
		});
		
	}
	
	function _none(){
		var $ = function(id){return document.getElementById(id)};
		
		var angleControl = $('angle-control');
		angleControl.onchange = function() {
		  rect.setAngle(this.value).setCoords();
		  _this.canvas.renderAll();
		};
		
		var scaleControl = $('scale-control');
		scaleControl.onchange = function() {
		  rect.scale(this.value).setCoords();
		  _this.canvas.renderAll();
		};
		
		var topControl = $('top-control');
		topControl.onchange = function() {
		  rect.setTop(this.value).setCoords();
		  _this.canvas.renderAll();
		};
		
		var leftControl = $('left-control');
		leftControl.onchange = function() {
		  rect.setLeft(this.value).setCoords();
		  _this.canvas.renderAll();
		};
		
		
	}	
	
	/*
	function _loadScene(){
		
		_this.canvas.deactivateAll();
		_this.canvas.clear();
		leftTree.drawTree();
		_this.canvas.renderAll(); 
	}
	*/

	this.init = _init;
	this.addLocalImage = _addLocalImage;
	//this.loadScene = _loadScene;
	
	return this;
}