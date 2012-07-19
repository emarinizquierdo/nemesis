


var leftTree = new function(){
	
	this.treeView;
	
	function _init(){
		
		this.treeView = $("#treeview-left").kendoTreeView({
            dragAndDrop: true,
            dataSource: []
        }).data("kendoTreeView");
	
	
	}
	
	
	function _addElement(p_element){
		
		var lastElement = this.treeView.dataSource._data[this.treeView.dataSource.total()-1];
		var node;
		
		if(typeof lastElement == "undefined"){
			this.treeView.dataSource.add({text : p_element.title, dSourceObject : p_element});
		}else{
			node = this.treeView.findByUid(lastElement.uid);		
			
			this.treeView.insertAfter({ text: p_element.title, dSourceObject : p_element}, node);		
		}
		
		lastElement = this.treeView.dataSource._data[this.treeView.dataSource.total()-1];
		node = this.treeView.findByUid(lastElement.uid);
		
		this.treeView.select(node);
		
	}
	
	this.init = _init;
	this.addElement = _addElement;
	
}


