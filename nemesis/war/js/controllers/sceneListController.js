var sceneList = new function(){
	
	var   _sceneView
		, _selected
	    , _scenes = []
		, _sceneNumber = 1
	;
	
	var _SCENE_ITEM_TEMPLATE = "<img class='imgSnapshot' src='img/claqueta.jpg'>";
	
	function _init(){
		
		_sceneView = $('#sceneList');
	
		_createScene();
		_selected = _scenes[0];
		leftTree = _selected.tree;
		mainCanvas = _selected.canvas;
		_selected.item.addClass('selected');
		
		$("#snapshotButton").click(function(){
			
			var auxImgData = mainCanvas.canvas.toDataURL("png");
			_selected.item.find('img.imgSnapshot').attr("src", auxImgData);
		});
		
		 $('#newSceneButton').click(function(){
		
			 _createScene();
		 })
		
	}
	
	function _createScene(){
		
		_scenes.push( new _scene() );
	}
	
	function _scene(){

		var _this = this;
		var _tree = null;
		var _item = null;
		var _canvas = null;
		
		function _initScene(){
			
			var n = _sceneNumber++;
			_tree = new leftTreeConstructor();
			_tree.init(n);
			_canvas = new mainCanvasConstructor();
			_canvas.init(n);
			_createItem(n);
		}
		
		function _createItem(n){
			
			 var newitem = $('<li>');
			 newitem.attr('id', 'scene-list-item-' + n)
			 newitem.addClass('scene-list-item');
			 newitem.html(_SCENE_ITEM_TEMPLATE);
			 _sceneView.append(newitem);
			 
			 if (n != 1){
				 $("#new-tree-" + n).hide();
				 //$("#new-canvas-" + n).parent().hide();	 
			 }
			 
			 
			 newitem.click(function(){
				 
				 
				_selected.item.toggleClass('selected');
				_selected = _this;
				leftTree = _selected.tree;
				mainCanvas = _selected.canvas;
				_selected.item.toggleClass('selected');
				
				$("#treeview-left").children().hide();
				$("#new-tree-" + n).show();
				
				//$("#canvasWrapper").children().hide();
				$("#new-canvas-" + n).parent().show();
			})
			 
			 _item = newitem;
		}
		
		_initScene();
		
		this.tree = _tree;
		this.item = _item;
		this.canvas = _canvas;
		
		return this;	
	}
	
	this.scenes = _scenes;
	this.selected = function(){return _selected};
	

	this.init = _init;
	
}


