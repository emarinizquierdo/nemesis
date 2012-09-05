var sceneList = new function(){
	
	var _sceneView;
	var _selected;
	
	var _SCENE_ITEM_TEMPLATE = "<img class='imgSnapshot' src='img/claqueta.jpg'>";
	
	function _init(){
		
		//init list
//		sceneList.sceneView = $("#sceneList").kendoListView({
//
//			  template: "<div class=scene-list-item><img class=imgSnapshot src=img/claqueta.jpg></div>"
//	        , selectable: true
//	        , change: _onChange
//	      
//		}).data("kendoListView");
		
		_sceneView = $('#sceneList');
	
		_add();
		_selected = _sceneView.children().first();
		_selected.addClass('selected');
		
		_sceneView.find('li.scene-list-item').live('click', function(){
			
			_selected.toggleClass('selected');
			_selected = $(this);
			_selected.toggleClass('selected');
		})
		
		$("#snapshotButton").click(function(){
			
			var auxImgData = mainCanvas.canvas.toDataURL("png");
			_selected.find('img.imgSnapshot').attr("src", auxImgData);
		});
		
		 $('#newSceneButton').click(function(){
		
			 _add();
		 })
		
	}
	
	function _add(){
		
		 var newitem = $('<li>');
		 newitem.addClass('scene-list-item');
		 newitem.html(_SCENE_ITEM_TEMPLATE);
		 _sceneView.append(newitem);
	}
	
	function _onChange(e){
		
		this.select().addClass('selected')
	}
	
	
	
	
	this.init = _init;
	this.add  = _add;
	
}


