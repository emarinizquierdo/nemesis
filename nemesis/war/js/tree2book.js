function tree2book(bookName){
	
	var DEFAULT_FIRST_SCENE_NAME = "main_scene";
	
	var b = new book();
	var t = leftTree.treeView.dataSource.data();
	
	if (t.length == 0){
		console.log('tree2book error: no hay ningún elemento en la escena');
		return false
	}
	else {
		//create empty book
		b = new book(bookName);
		
		//create first scene
		b.addScene(DEFAULT_FIRST_SCENE_NAME);
		
		_addTreeActors(t, b.scenes[DEFAULT_FIRST_SCENE_NAME])
		
		return b;
	}
	
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