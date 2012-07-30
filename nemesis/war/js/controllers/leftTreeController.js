


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
		
		if(leftTree.treeView.dataSource._data.length <= 0){
			leftTree.treeView.dataSource.add({
				  text : p_dadaObj.text
				, zindex : 0
				, draggable : false
				, touchable : false
				});
			leftTree.treeView.dataSource._data[0].imageObj = p_dadaObj.imageObj;
			leftTree.treeView.dataSource._data[0].imageObj.node = leftTree.treeView.findByUid(leftTree.treeView.dataSource._data[0].uid);
			
		}else{
			var lastElement = leftTree.treeView.dataSource._data[leftTree.treeView.dataSource._data.length-1];
			var node;
			node = leftTree.treeView.findByUid(lastElement.uid);			
			var nodeaux = leftTree.treeView.insertAfter({
				  text: p_dadaObj.text
				, zindex : 0
				, draggable : false
				, touchable : false
				}, node);	
			leftTree.treeView.dataSource._data[leftTree.treeView.dataSource._data.length-1].imageObj = p_dadaObj.imageObj;
			leftTree.treeView.dataSource._data[leftTree.treeView.dataSource._data.length-1].imageObj.node = nodeaux;
			leftTree.treeView.dataSource._data[leftTree.treeView.dataSource._data.length-1].imageObj.zindex = 0;
			
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
	
	
	this.groupsController = function(){
		
		
		
	}
	
	this.init = _init;
	this.addElement = _addElement;
	
}


