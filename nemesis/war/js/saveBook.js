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
		
		scene.showNextBtn = e.nextBtn;
		scene.showPrevBtn = e.prevBtn;
			
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
			var fe = e.imageObj;
			if (fe.getText){
				actor.text = fe.getText();	
				actor.color = fe.getFill();
				actor.fontName = fe.get('fontFamily');
				actor.fontSize = fe.get('fontSize');
				actor.fontAlignment = fe.get('textAlign');
				actor.type = "textType";
				actor.textSize = "200,200";
				
			}
			else {
				//En local no funciona porque no contiene el = de la llamada al servicio
				actor.image = e.source.split('=')[1];
				actor.type = "actorType";
			}
			
			actor.name = e.text;
			actor.draggable = e.draggable;
			actor.touchable = e.touchable;
			//actor.uid       = e.uid;
			actor.rotation  = fe.getAngle();
			//actor.height = fe.getHeight();
			//actor.width  = fe.getWidth();
			actor.position   = fe.getLeft() + "," + fe.getTop(); 
			actor.scale = fe.getScaleX() + "," +  fe.getScaleY();
			actor.zindex = fe.get('zindex');

			_addActorActions(e, actor);
			
			//add element childrens
			if (e.hasChildren){
				
				var childrens = e.children.data();
				_addTreeActors(childrens, actor)
			}
				
		});//end each
		
	}
	
	function _addActorActions(e, actor){

		if (e.actions){
			$.each(e.actions, function(i,a){
				
				var action = actor.addAction(a);
				
				if (action){
					
					action.name = a.name;
					action.duration = a.duration;
					action.type = a.type;

					//Se eliminan las propiedades básicas en busca de más propiedades
					delete a.event;
					delete a.name;
					delete a.duration;
					delete a.type;
				
					if (!$.isEmptyObject(a)){
						
						$.each(a, function(pos, elem){
							
							if (typeof action.config == "undefined"){
								action.config = elem;
							}
							else {
								action.config = action.config + "," + elem;
							}
						})
					}
					
				}
			});	
		}
		
	}
	
	return b;
}