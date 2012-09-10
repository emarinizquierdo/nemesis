


var imageSource = new function(){
	
	this.imageList;
	this.dSource;
	
	function _init(){
		
		imageSource.dSource = new kendo.data.DataSource({

            transport: {

                read: {

                    url: "/localImages",

                    dataType: "json"

                }
            },

            pageSize: 12
        });
	
	    $("#pager").kendoPager({
	    	
	        dataSource: imageSource.dSource
	    });
	
	    imageSource.imageList = $("#listView").kendoListView({
	
	        dataSource: imageSource.dSource,
	
	        template: kendo.template($("#template").html()),
	        selectable: true
	
	    });	
	    
	    $("#addImageLocalButton").click(function(){
	    	imageSource.addToLeftTree();
	    
	    })
	    
	    $("#removeImageLocalButton").click(function(){
	    	if(leftTree.treeView.select().length){
	    		
	    		var selected = leftTree.treeView.dataSource.getByUid(leftTree.treeView.select().attr("data-uid"));
	    		_removeElement(selected);
	    	}
	    	else {
	    		console.log('No hay ningún elemento seleccionado.')
	    	}
	    	
	    })
	    
	
	}
	
	function _addToLefTree(uid){	
		
		var _uid = uid || imageSource.imageList.find(".k-state-selected").attr("data-uid");
		var imageLocal = imageSource.dSource.getByUid( _uid );
		var dadaObject = {}
		
		if(typeof imageLocal == "undefined"){
			console.log("No has seleccionado ninguna imagen a añadir");
		}
		else{
			
			dadaObject.url = imageLocal.url;
			dadaObject.text = imageLocal.title;
			
			mainCanvas.addLocalImage(dadaObject.url,function(p_imageObj){
				//window.console.log(p_imageObj);	
				dadaObject.imageObj = p_imageObj;
				leftTree.addElement(dadaObject);				
			});
		}	
	}
	
	function _removeElement(e){
		
		//Es necesario desactivar los elementos del canvas antes de eliminarlos
		mainCanvas.canvas.deactivateAll();
		
		if(e.hasChildren){
			
			$.each(e.children.data(), function(i,children){
				_removeElement(children)
			});
		}
		
		mainCanvas.canvas.remove(e.imageObj);
		var uid = e.uid;
		var treeElem = leftTree.treeView.element.find('[data-uid="' + uid + '"]');			
		leftTree.treeView.remove(treeElem)
	} 
	
	
	function _removeAllElements(){
		
		while (leftTree.treeView.dataSource.total() > 0){
			
			var first = leftTree.treeView.dataSource.data()[0];
			_removeElement(first);
		}
	}
	
	this.init = _init;
	this.addToLeftTree = _addToLefTree;
	this.removeElement = _removeElement;
	this.removeAllElements = _removeAllElements;
	
}

