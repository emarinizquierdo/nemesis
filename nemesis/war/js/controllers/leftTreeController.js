


var leftTreeConstructor = function(){
	
	var _this = this;
	this.treeView;
	
	function _init(n){
		
		var newtree = $('<div>');
		newtree.attr('id', "new-tree-" + n);
		newtree.addClass("new-tree");
		$("#treeview-left").append(newtree)
		
		_this.treeView = newtree.kendoTreeView({
            dragAndDrop: true,
            dataSource: []
        }).data("kendoTreeView");
	
		_OnSelectNode();
	}
	
	function _addElement(p_dadaObj){	
		
		if(_this.treeView.dataSource._data.length <= 0){
			_this.treeView.dataSource.add({
				  text : p_dadaObj.text
				, zindex : 0
				, draggable : false
				, touchable : false
				, source : p_dadaObj.url
				});
			_this.treeView.dataSource._data[0].imageObj = p_dadaObj.imageObj;
			_this.treeView.dataSource._data[0].imageObj.zindex = 0;
			_this.treeView.dataSource._data[0].imageObj.node = _this.treeView.findByUid(_this.treeView.dataSource._data[0].uid);
			
		}else{
			var lastElement = _this.treeView.dataSource._data[_this.treeView.dataSource._data.length-1];
			var node;
			node = _this.treeView.findByUid(lastElement.uid);			
			var nodeaux = _this.treeView.insertAfter({
				  text: p_dadaObj.text
				, zindex : 0
				, draggable : false
				, touchable : false
				, source : p_dadaObj.url
				}, node);	
			_this.treeView.dataSource._data[_this.treeView.dataSource._data.length-1].imageObj = p_dadaObj.imageObj;
			_this.treeView.dataSource._data[_this.treeView.dataSource._data.length-1].imageObj.node = nodeaux;
			_this.treeView.dataSource._data[_this.treeView.dataSource._data.length-1].imageObj.zindex = 0;
			
		}		
		
	}
	
	function _OnSelectNode(){
		var node;
		
		_this.treeView.bind("select", function(e) {
			mainCanvas.canvas.discardActiveGroup()
			
			if(mainCanvas.canvas.getActiveObject()){
				mainCanvas.canvas.getActiveObject().setActive(false);
				mainCanvas.canvas.renderAll();
			}
			
			node = _this.treeView.dataSource.getByUid(e.node.dataset.uid);
			window.console.log(_recursiveSelectNode(node));
			if(node.children._data.length == 0){
				mainCanvas.canvas.setActiveObject(node.imageObj);
				rightUpperSlidder.updateControls();
			}else{
				var aux = new fabric.Group(_recursiveSelectNode(node));
				mainCanvas.canvas.setActiveGroup(aux);
				mainCanvas.canvas.renderAll();
				window.console.log(aux);
				
			}
			window.console.log(node);
		});
		
	}
	
	
	function _recursiveSelectNode(p_node){
		
		var   auxArray = [];

		
		if(p_node.children._data.length==0){
			return [p_node.imageObj];
			
		}else{
			
			auxArray = [p_node.imageObj];
			
			for(var i = 0; i<p_node.children._data.length; i++){
				auxArray = auxArray.concat(_recursiveSelectNode(p_node.children._data[i]));
				
			}
		}	
		
		return auxArray;
	}
	
	function _drawTree(){
		
		var t = leftTree.treeView.dataSource.data();
		
		$.each(t, function(i,e){
			
			var settings = {
				top: e.top
			}
			
			mainCanvas.addLocalImage(e.source, function(p_imageObj){
				
			}, settings);
		});
	}
	
	this.init = _init;
	this.addElement = _addElement;
	this.drawTree = _drawTree;
	
	return this;
	
}


