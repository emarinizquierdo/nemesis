function openBook(b){
	
	var IMAGES_SRC = "/s/getfile?fileName=";
	
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
		
		$.each(bookScene.bookObjects, function(actorName, actor){
			
			var settings = {
				  source: IMAGES_SRC + actor.image
				, text: actorName
			}
			
			p_scene.canvas.addLocalImage(settings.source,function(p_imageObj){
				var leaf = p_scene.tree.treeView.append(settings, parent);
				var uid = leaf.attr('data-uid');
				
				p_imageObj.set('scaleX', actor.scale.split(",")[0]).setCoords();
				p_imageObj.set('scaleY', actor.scale.split(",")[1]).setCoords();
				p_imageObj.set('angle', actor.rotation);
				p_imageObj.set('top', actor.position.split(",")[1]).setCoords();
				p_imageObj.set('left', actor.position.split(",")[0]).setCoords();
				p_imageObj.set('zindex', actor.zindex).setCoords();
				
				//Sin el parseInt falla el cálculo de los cuadraditos azules para el drag&drop
				//p_imageObj.set('width', parseInt(actor.width));
				//p_imageObj.set('height', parseInt(actor.height));

				//incluye en el árbol la referencia al nodo
				p_scene.tree.treeView.dataSource.getByUid(uid).imageObj = p_imageObj;
				p_scene.tree.treeView.dataSource.getByUid(uid).imageObj.node = leaf;
				
				if (actor.actors){
					_loadActors(actor, p_scene, leaf);
				}
			
				mainCanvas.canvas.renderAll();
			});
			
			
		})
		

	}
}