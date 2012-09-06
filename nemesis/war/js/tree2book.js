function tree2book(bookName){
	
	var DEFAULT_FIRST_SCENE_NAME = "escena_01";
	
	var b = new book();
	var t = leftTree.treeView.dataSource.data();
	
	//create empty book
	b = new book(bookName);
	
	//create first scene
	var sceneName = $.trim( $('#scene-name-input').val() ).replace(/\s/g,"_") || DEFAULT_FIRST_SCENE_NAME;
	b.addScene(sceneName);
	
	_addTreeActors(t, b.scenes[sceneName])
	
	return b;
	
	function _addTreeActors(actors, parent){
		
		$.each(actors, function(i,e){
		
			//create an actor
			var actorName = e.text;
			var actor = parent.addActor(actorName);
			
			//set actor attributes
			actor.draggable = e.draggable;
			actor.image     = e.text;
			actor.touchable = e.touchable;
			actor.uid       = e.uid;
			actor.zindex    = e.zindex;
			
			//get fabric element attributes
			var fe = e.imageObj;
			actor.angle  = fe.getAngle();
			actor.height = fe.getHeight();
			actor.width  = fe.getWidth();
			actor.top    = fe.getTop();
			actor.left   = fe.getLeft();
			actor.scaleX = fe.getScaleX();
			actor.scaleY = fe.getScaleY();
			
			//get element childrens
			if (e.hasChildren){
				
				var childrens = e.children.data();
				_addTreeActors(childrens, actor)
			}
				
		});//end each
		
	}
	
}