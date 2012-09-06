

//commit de prueba

var mainPanel = new function(){
	
	
	function _init(){
		
		$("#splitterWrapper").kendoSplitter({
		    panes: [
		        { collapsible: false, min: "300px" },
		       	{ collapsible: false, resizable: false, size: "650px" },
		       	{ collapsible: false, min: "300px" }
		    ],
		    orientation: "horizontal"
		});
				$("#leftPanel").kendoSplitter({
		    panes: [
		        { size: "400px",collapsible: true},
		        { size: "685px",collapsible: true}
		    ],
		    orientation: "vertical"
		});

		$("#middlePanel").kendoSplitter({
		    panes: [
		         {resizable: false, size: "550px", collapsible: false, min: "600px" },
		         {collapsible: false, min: "200px" }
		    ],
		    orientation: "vertical"
		});


		$("#rightPanel").kendoSplitter({
		    panes: [
		         { size: "450px", collapsible: true, min: "310px" },
		        { collapsible: true, min: "200px" }
		    ],
		    orientation: "vertical"
		});
		
	}
	
	
	
	
	this.init = _init;
	
}


