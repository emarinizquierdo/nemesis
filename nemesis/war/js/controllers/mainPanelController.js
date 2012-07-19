


var mainPanel = new function(){
	
	
	function _init(){
		
		$("#splitterWrapper").kendoSplitter({
		    panes: [
		        { collapsible: false, min: "300px" },
		       	{ collapsible: false, resizable: false, size: "1000px" },
		       	{ collapsible: false, min: "300px" }
		    ],
		    orientation: "horizontal"
		});
				$("#leftPanel").kendoSplitter({
		    panes: [
		        { size: "400px", collapsible: true, min: "300px" },
		        { collapsible: true, min: "200px" }
		    ],
		    orientation: "vertical"
		});

		$("#middlePanel").kendoSplitter({
		    panes: [
		         {resizable: false, size: "600px", collapsible: false, min: "600px" },
		         {collapsible: false, min: "200px" }
		    ],
		    orientation: "vertical"
		});


		$("#rightPanel").kendoSplitter({
		    panes: [
		         { size: "400px", collapsible: true, min: "300px" },
		        { collapsible: true, min: "200px" }
		    ],
		    orientation: "vertical"
		});
		
	}
	
	
	
	
	this.init = _init;
	
}

