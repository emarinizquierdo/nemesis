


var leftTree = new function(){
	
	this.treeView;
	
	function _init(){
		
		leftTree.treeView = $("#treeview-left").kendoTreeView({
            dragAndDrop: true,
            dataSource: []
        }).data("kendoTreeView");
	
		_OnSelectNode();
	}
	
	
	function _addElement(p_dadaObj){
		
		var lastElement = this.treeView.dataSource._data[leftTree.treeView.dataSource.total()-1];
		var node;
		window.console.log("esta es la imagen",p_dadaObj.imageObj);
		//p_dadaObj.uid = guid();
		if(typeof lastElement == "undefined"){
			leftTree.treeView.dataSource.add({text : p_dadaObj.text});
			this.treeView.dataSource._data[leftTree.treeView.dataSource.total()-1].imageObj = p_dadaObj.imageObj;
			
		}else{
			node = leftTree.treeView.findByUid(lastElement.uid);			
			leftTree.treeView.insertAfter({ text: p_dadaObj.text}, node);	
			this.treeView.dataSource._data[leftTree.treeView.dataSource.total()-1].imageObj = p_dadaObj.imageObj;
			
		}		
		
	}
	
	function _OnSelectNode(){
		var node;
		
		leftTree.treeView.bind("select", function(e) {
			node = leftTree.treeView.dataSource.getByUid(e.node.dataset.uid);
			mainCanvas.canvas.setActiveObject(node.imageObj);
			rightUpperSlidder.updateControls();
			window.console.log(node);
		});
		
	}
	
	this.init = _init;
	this.addElement = _addElement;
	
}


