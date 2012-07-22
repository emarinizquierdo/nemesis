


var leftTree = new function(){
	
	this.treeView;
	
	function _init(){
		
		leftTree.treeView = $("#treeview-left").kendoTreeView({
            dragAndDrop: true,
            dataSource: []
        }).data("kendoTreeView");
	
		_OnSelectNode();
	}
	
	
	function _addElement(p_element){
		
		var lastElement = this.treeView.dataSource._data[leftTree.treeView.dataSource.total()-1];
		var node;
		
		if(typeof lastElement == "undefined"){
			leftTree.treeView.dataSource.add({text : p_element.title, dSourceObject : p_element});
		}else{
			node = leftTree.treeView.findByUid(lastElement.uid);		
			
			leftTree.treeView.insertAfter({ text: p_element.title, dSourceObject : p_element}, node);		
		}	
		
	}
	
	function _OnSelectNode(){
		var node;
		
		leftTree.treeView.bind("select", function(e) {
			node = leftTree.treeView.dataSource.getByUid(e.node.dataset.uid);
			mainCanvas.canvas.setActiveObject(node.dSourceObject.imageCanvasObj);
			rightUpperSlidder.updateControls();
			window.console.log(node);
		});
		
	}
	
	this.init = _init;
	this.addElement = _addElement;
	
}


