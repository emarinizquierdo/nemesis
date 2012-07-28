


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
	    	if(typeof leftTree.treeView.select().attr("data-uid") != "undefined"){
	    		_recursiveRemoveNode(leftTree.treeView.dataSource.getByUid(leftTree.treeView.select().attr("data-uid")));
		    	leftTree.treeView.remove(leftTree.treeView.select());	    	
		    	
		    	function _recursiveRemoveNode(p_node){
		    		
		    		if(p_node.children._data.length > 0){
		    			
		    			for(var i = 0; i < p_node.children._data.length; i++){
		    				
		    				_recursiveRemoveNode(p_node.children._data[i]);
		    			}
		    			
		    		}
		    	
		    		mainCanvas.canvas.remove(p_node.imageObj);
		    	}
	    	
	    	}
	    })
	    
	
	}
	
	function _addToLefTree(){		
		
		var imageLocal = imageSource.dSource.getByUid(imageSource.imageList.find(".k-state-selected").attr("data-uid"));
		var dadaObject = {}
		
		
		
		//imageToTree.uid = guid();
		
		if(typeof imageLocal == "undefined"){
			alert("No has seleccionado ninguna imagen a añadir");
		}else{
			
			dadaObject.url = imageLocal.url;
			dadaObject.text = imageLocal.title;
			
			
			mainCanvas.addLocalImage(dadaObject.url,function(p_imageObj){
				window.console.log(p_imageObj);	
				dadaObject.imageObj = p_imageObj;
				leftTree.addElement(dadaObject);				
			});
			
			
		}	
		
		
	}
	
	this.init = _init;
	this.addToLeftTree = _addToLefTree;
	
}

