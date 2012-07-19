


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
	    
	
	}
	
	function _addToLefTree(){		
		
		leftTree.addElement(imageSource.dSource.getByUid(this.imageList.find(".k-state-selected").attr("data-uid")).title);
		
	}
	
	this.init = _init;
	this.addToLeftTree = _addToLefTree;
	
}

