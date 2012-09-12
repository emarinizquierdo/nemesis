function openBook(b){
	
	var IMAGES_SRC = "/resources/images/";
	
	//Reset current book
	sceneList.removeAllScenes();
	
	$('#book-name-input').val(b.bookName);
	
	$.each(b.scenes, function(sceneName, scene){
		
		var newScene = sceneList.addScene();
		newScene.item.attr('scenename', sceneName);
	
		_loadActors(scene, newScene, null);
	})	
	
	if (!$.isEmptyObject(b.scenes)){
		sceneList.scenes[0].item.click();
	}
	
	mainCanvas.canvas.renderAll()
	
	function _loadActors(bookScene, p_scene, parent){
		
		$.each(bookScene.actors, function(actorName, actor){
			
			var settings = {
				  source: IMAGES_SRC + actorName
				, text: actorName
			}
			
			p_scene.canvas.addLocalImage(settings.source,function(p_imageObj){
				var leaf = p_scene.tree.treeView.append({text: settings.text}, parent);
				var uid = leaf.attr('data-uid');
				
				p_imageObj.set('angle', actor.angle);
				p_imageObj.set('height', actor.height);
				p_imageObj.set('width', actor.width);
				p_imageObj.set('top', actor.top);
				p_imageObj.set('left', actor.left);
				p_imageObj.set('scaleX', actor.scaleX);
				p_imageObj.set('scaleY', actor.scaleY);
				p_imageObj.set('zindex', actor.zindex);
				
				
				//incluye en el árbol la referencia al nodo
				p_scene.tree.treeView.dataSource.getByUid(uid).imageObj = p_imageObj;
				p_scene.tree.treeView.dataSource.getByUid(uid).imageObj.node = leaf;
				
				if (actor.actors){
					_loadActors(actor, p_scene, leaf);
				}
				
				mainCanvas.canvas.renderAll()
			});
			
			
		})
		

	}
}