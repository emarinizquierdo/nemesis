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
		_scenes[0].item.click();
		
		$("#snapshotButton").click(function(){
			
			var auxImgData = mainCanvas.canvas.toDataURL("png");
			_selected.item.find('img.imgSnapshot').attr("src", auxImgData);
		});
		
		 $('#newSceneButton').click(function(){
		
			 _createScene();
		 })
		
		 
		 $('#removeSceneButton').click(function(){
			
			 _removeSelectedScene();
		 })
	}
	
	function _createScene(){
		
		//_scenes.push( new _scene() );
		_scenes.push( new _scene(_sceneNumber) );
		_sceneNumber++;
	}
	
	function _scene(n){
		
		var _this = this;
		var _id;
		var _tree = null;
		var _canvas = null;
		var _item = null;
		
		function _initScene(n){
			
			_id = 'scene_' + n;
			_tree = new leftTreeConstructor();
			_tree.init(n);
			_canvas = new mainCanvasConstructor();
			_canvas.init(n);
			_createItem(n);
		}
		
		function _createItem(n){
			
			var newitem = $('<li>')
				.attr('id', 'scene_' + n)
				.attr('sceneName', 'escena '+n)
				.addClass('scene-list-item')
				.html(_SCENE_ITEM_TEMPLATE);
			
			_sceneView.append(newitem);
			 
			if (n != 1){
				$("#new-tree-" + n).hide(); 
				$("#new-canvas-" + n).parent().hide();
			}
			 
			newitem.click(function(){
				
				if (_selected) {
					//_scenes[_selected].tree.saveCurrentCanvas();
					_selected.item.toggleClass('selected');
				}
				_selected = _this;
				leftTree = _selected.tree;
				mainCanvas = _selected.canvas;
				//mainCanvas.loadScene();
				_selected.item.toggleClass('selected');
				
				$("#treeview-left").children().hide();
				$("#new-tree-" + n).show();
				$('#canvasWrapper').children().hide();
				$("#new-canvas-" + n).parent().show();
				
				mainCanvas.canvas.calcOffset();
				
				$('#scene-name-input').val($(this).attr('sceneName'))
			})
			 
			_item = newitem;
		}
		
		_initScene(n);
		
		this.id = _id;
		this.tree = _tree;
		this.item = _item;
		this.canvas = _canvas;
		
		return this;
	}
	
	function _removeSelectedScene(){
		
		if (_selected){
			
			//eliminar elementos asociados a la escena
			_selected.tree.treeView.element.remove();
			$(_selected.canvas.canvas.wrapperEl).remove();
			_selected.item.remove();
			$("#scene-name-input").val('')
			
			//eliminar escena
			_scenes.splice( $.inArray(_selected, _scenes), 1);
			_selected = null;
		}
		
	}
	
	this.scenes = _scenes;
	this.selected = function(){ return _selected};
	

	this.init = _init;
	
}


