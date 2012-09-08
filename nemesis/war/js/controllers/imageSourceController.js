


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
            
            change: function(){
            	
            	_setStaticUID();
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
	
	function _addToLefTree(uid){	
		
		var _uid = uid || imageSource.imageList.find(".k-state-selected").attr("data-uid");
		
		var imageLocal = imageSource.dSource.getByUid( _uid );
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
	
	function _setStaticUID(){
		
		var c = 1000;
		
		$.each(imageSource.dSource.data(), function(i,e){
			e.uid = "uid" + ++c;
		})
	}
	
	this.init = _init;
	this.addToLeftTree = _addToLefTree;
	
}

