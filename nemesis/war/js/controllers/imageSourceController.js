


var imageSource = new function(){
	
	this.imageList;
	this.dSource;
	
	function _init(){
		
		this.dSource = new kendo.data.DataSource({

            transport: {

                read: {

                    url: "/localImages",

                    dataType: "json"

                }

            },

            pageSize: 12

        });


	    $("#pager").kendoPager({
	
	        dataSource: this.dSource
	
	    });
	
	
	
	    this.imageList = $("#listView").kendoListView({
	
	        dataSource: this.dSource,
	
	        template: kendo.template($("#template").html()),
	        selectable: true
	
	    });	
	    
	    $("#addImageLocalButton").click(function(){
	    	imageSource.addToLeftTree();
	    })
	    
	    $("#removeImageLocalButton").click(function(){
	    	if(typeof leftTree.treeView.select().attr("data-uid") != "undefined"){
	    		mainCanvas.canvas.remove(leftTree.treeView.dataSource.getByUid(leftTree.treeView.select().attr("data-uid")).dSourceObject.imageCanvasObj);
		    	leftTree.treeView.remove(leftTree.treeView.select());
	    	}
	    	
	    	
	    })
	    
	
	}
	
	function _addToLefTree(){		
		
		var imageToTree = imageSource.dSource.getByUid(this.imageList.find(".k-state-selected").attr("data-uid"));
		
		if(typeof imageToTree == "undefined"){
			alert("No has seleccionado ninguna imagen a añadir");
		}else{
			
			mainCanvas.addLocalImage(imageToTree.url,function(p_imageCanvasObj){
				imageToTree.imageCanvasObj = p_imageCanvasObj;
				leftTree.addElement(imageToTree);
			});
			
			
		}
		
		
	}
	
	this.init = _init;
	this.addToLeftTree = _addToLefTree;
	
}

