function openBook(b){
	
	var MAIN_SCENE = "main_scene";
	var actors = b.scenes[MAIN_SCENE].actors;
	
	$.each(b.scenes, function(esceneName, escene){
		
		$.each(escene.actors, function(actorName, actor){
			
			imageSource.addToLeftTree(actor.uid)
			
		})
	})
}