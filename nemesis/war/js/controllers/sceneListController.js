var sceneList = new function(){
	
	var   _sceneContainer
		, _selected
	    , _scenes = []
		, _sceneNumber = 1
		, _nextSceneBtn
		, _prevSceneBtn
		, _sceneButtonsContainer
	;
	
	var _SCENE_ITEM_TEMPLATE = "<img class='imgSnapshot' src='img/claqueta.jpg'>";
	
	function _init(){
		
		_sceneContainer = $('#sceneList');
		_nextSceneBtn = $('#nextButtonScene');
		_prevSceneBtn = $('#previousButtonScene');
		_sceneButtonsContainer = $('#sceneButtonsContainer');
	
		_addScene();
		_scenes[0].item.click();
		
		$("#snapshotButton").click(function(){
			
			var auxImgData = mainCanvas.canvas.toDataURL("png");
			_selected.item.find('img.imgSnapshot').attr("src", auxImgData);
		});
		
		 $('#newSceneButton').click(function(){
		
			 _addScene();
		 })
		
		 
		 $('#removeSceneButton').click(function(){
			
			 _removeSelectedScene();
		 })
		 
		//next previous scene buttons
		_prevSceneBtn.change(function(){
			sceneList.selected().prevBtn = ($(this).attr('checked') == 'checked') ? true : false;
		})
		_nextSceneBtn.change(function(){
			sceneList.selected().nextBtn = ($(this).attr('checked') == 'checked') ? true : false;
		})
		
	}
	
	function _addScene(){
		
		//_scenes.push( new _scene() );
		var newScene = new _scene(_sceneNumber)
		_scenes.push( newScene );
		_sceneNumber++;
		
		return newScene;
	}
	
	function _scene(n){
		
		var _this = this;
		var _id;
		var _tree = null;
		var _canvas = null;
		var _item = null;
		var _prevBtn = true;
		var _nextBtn = true;
		
		function _initScene(n){
			
			_id = 'scene_' + n;
			_tree = new leftTreeConstructor();
			_tree.init(n);
			_canvas = new mainCanvasConstructor();
			_canvas.init(n);
			_createItem(n);
			_nextSceneBtn.attr('checked', _nextBtn);
			_prevSceneBtn.attr('checked', _prevBtn);
		}
		
		function _createItem(n){
			
			var newitem = $('<li>')
				.attr('id', 'scene_' + n)
				.attr('sceneName', 'escena '+n)
				.addClass('scene-list-item')
				.html(_SCENE_ITEM_TEMPLATE);
			
			_sceneContainer.append(newitem);
			 
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
				
				$('#scene-name-input').val($(this).attr('sceneName'));
				_nextSceneBtn.attr('checked', _selected.nextBtn);
				_prevSceneBtn.attr('checked', _selected.prevBtn);
				_sceneButtonsContainer.show();
			})
			 
			_item = newitem;
		}
		
		_initScene(n);
		
		this.id = _id;
		this.tree = _tree;
		this.item = _item;
		this.canvas = _canvas;
		this.prevBtn = _prevBtn;
		this.nextBtn = _nextBtn;
		
		return this;
	}
	
	function _removeSelectedScene(){
		
		if (_selected){
			_removeScene(_selected);	
		}
	}
	
	function _removeScene(s){
		
		s.tree.treeView.element.remove();
		$(s.canvas.canvas.wrapperEl).remove();
		s.item.remove();
		if (s == _selected){
			$("#scene-name-input").val('');
			_selected = null;
		}
		_scenes.splice( $.inArray(s, _scenes), 1);
		
		_sceneButtonsContainer.hide();
	}
	
	function _removeAllScenes(){
		
		while (_scenes.length){
			_removeScene( _scenes[0] );
		}
		_sceneNumber = 1;
	}

	
	this.scenes = _scenes;
	this.selected = function(){ return _selected};
	this.addScene = _addScene;
	this.removeScene = _removeScene;
	this.removeAllScenes = _removeAllScenes;
	

	this.init = _init;
	
}


