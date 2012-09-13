function saveBook(){
	
	var DEFAULT_BOOK_NAME = "MY_BOOK"
	
	var b = new book();
	
	//create empty book
	var bookName = $.trim( $('#book-name-input').val() ) || DEFAULT_BOOK_NAME;
	b = new book(bookName);
	
	//add scenes
	$.each(sceneList.scenes, function(i,e){
		
		var sceneName = e.item.attr('scenename');
		sceneName =  $.trim(sceneName)/*.replace(/\s/g,"_")*/;
		var scene = b.addScene(sceneName);
		_addTreeActors(e.tree.treeView.dataSource.data(), scene)
		
		if (i==0){
			b.openingScene = sceneName;
		}
	});
	
	function _addTreeActors(actors, scene){
		
		$.each(actors, function(i,e){
		
			//create an actor
			var actorName = e.text;
			var actor = scene.addActor(actorName);
			
			//set actor attributes
			actor.draggable = e.draggable;
			actor.image     = e.text;
			actor.touchable = e.touchable;
			actor.uid       = e.uid;
			
			//get fabric element attributes
			var fe = e.imageObj;
			actor.angle  = fe.getAngle();
			actor.height = fe.getHeight();
			actor.width  = fe.getWidth();
			actor.top    = fe.getTop();
			actor.left   = fe.getLeft();
			actor.scaleX = fe.getScaleX();
			actor.scaleY = fe.getScaleY();
			actor.zindex = fe.get('zindex');
			
			//get element childrens
			if (e.hasChildren){
				
				var childrens = e.children.data();
				_addTreeActors(childrens, actor)
			}
				
		});//end each
		
	}
	
	return b;
}