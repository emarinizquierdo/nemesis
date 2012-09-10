var mainPanel = new function(){
	
	
	function _init(){
		
//		$("#splitterWrapper").kendoSplitter({
//		    panes: [
//		        { collapsible: false, min: "300px" },
//		       	{ collapsible: false, resizable: false, size: "650px" },
//		       	{ collapsible: false, min: "300px" }
//		    ],
//		    orientation: "horizontal"
//		});
		
		$("#splitterWrapper").kendoSplitter({
		    panes: [
		        { size:"25%" },
		       	{ size:"50%" },
		       	{ size:"25%" }
		    ],
		    orientation: "horizontal"
		});
		
		
		
//		$("#leftPanel").kendoSplitter({
//		    panes: [
//		        { size: "400px",collapsible: false},
//		        { size: "685px",collapsible: false}
//		    ],
//		    orientation: "vertical"
//		});
		
//		$("#leftPanel").kendoSplitter({
//		    panes: [
//		        { size: "50%", collapsible: false},
//		        { size: "50%", collapsible: false}
//		    ],
//		    orientation: "vertical"
//		});
		
		
//		$("#middlePanel").kendoSplitter({
//		    panes: [
//		         {resizable: false, size: "550px", collapsible: false, min: "600px" },
//		         {collapsible: false, min: "200px" }
//		    ],
//		    orientation: "vertical"
//		});
		
		$("#middlePanel").kendoSplitter({
		    panes: [
		         {resizable: false, size: "450px" },
		         {}
		    ],
		    orientation: "vertical"
		});



//		$("#rightPanel").kendoSplitter({
//		    panes: [
//		         { size: "450px", collapsible: true, min: "310px" },
//		        { collapsible: true, min: "200px" }
//		    ],
//		    orientation: "vertical"
//		});
		
		
		$("#rightPanel").kendoSplitter({
		    panes: [
		         { size: "430px", collapsible: true },
		         { collapsible: true}
		    ],
		    orientation: "vertical"
		});
		
	}
	
	this.init = _init;
	
}


