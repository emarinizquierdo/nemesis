var sceneList = new function(){
	
	var   _sceneView
		, _selected
	    , _scenes = [];
	
	var _SCENE_ITEM_TEMPLATE = "<img class='imgSnapshot' src='img/claqueta.jpg'>";
	
	function _init(){
		
		_sceneView = $('#sceneList');
	
		_createScene();
		_selected = _scenes[0];
		leftTree = _selected.tree;
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
		
		function _initScene(){
			
			_tree = new leftTreeConstructor();
			_createItem();
		}
		
		function _createItem(){
			
			 var newitem = $('<li>');
			 newitem.addClass('scene-list-item');
			 newitem.html(_SCENE_ITEM_TEMPLATE);
			 _sceneView.append(newitem);
			 
			 newitem.click(function(){
				 
				_selected.item.toggleClass('selected');
				_selected = _this
				_selected.item.toggleClass('selected');
			})
			 
			 _item = newitem;
		}
		
		_initScene();
		
		this.tree = _tree;
		this.item = _item;
		
		return this;	
	}
	
	this.scenes = _scenes;
	this.selected = _selected;
	

	this.init = _init;
	
}


