var sceneList = new function(){
	
	var   _sceneView
		, _selected
	    , _scenes = {}
		, _sceneNumber = 1
	;
	
	var _SCENE_ITEM_TEMPLATE = "<img class='imgSnapshot' src='img/claqueta.jpg'>";
	
	function _init(){
		
		_sceneView = $('#sceneList');
	
		_createScene();
		_scenes['scene_1'].item.click();
		
		$("#snapshotButton").click(function(){
			
			var auxImgData = mainCanvas.canvas.toDataURL("png");
			_scenes[_selected].item.find('img.imgSnapshot').attr("src", auxImgData);
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
		_scenes['scene_'+_sceneNumber] = new _scene(_sceneNumber);
		_sceneNumber++;
	}
	
	function _scene(n){
		
		var _this = this;
		var _id;
		var _tree = null;
		var _item = null;
		
		function _initScene(n){
			
			_id = 'scene_' + n;
			_tree = new leftTreeConstructor();
			_tree.init(n);
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
			}
			 
			newitem.click(function(){
				 
				if (_selected) {
					_scenes[_selected].item.toggleClass('selected');
				}
				_selected = $(this).attr('id');
				leftTree = _scenes[_selected].tree;
				mainCanvas.loadScene();
				_scenes[_selected].item.toggleClass('selected');
				
				$("#treeview-left").children().hide();
				$("#new-tree-" + n).show();
				
				$('#scene-name-input').val($(this).attr('sceneName'))
			})
			 
			_item = newitem;
		}
		
		_initScene(n);
		
		this.tree = _tree;
		this.item = _item;
		
		return this;
	}
	
	function _removeSelectedScene(){
		
		if (_selected != ""){
			
			//vaciar canvas
			mainCanvas.canvas.clear();
			
			//eliminar domElement icono de escena
			_scenes[_selected].tree.treeView.element.remove();
			_scenes[_selected].item.remove();
			
			//borrar escena
			delete _scenes[_selected]	
			_selected = "";
		}
		
	}
	
	this.scenes = _scenes;
	this.selected = function(){return _selected};
	

	this.init = _init;
	
}


