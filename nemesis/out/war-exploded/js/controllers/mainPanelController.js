var mainPanel = new function(){
	
	
	function _init(){
		
		$("#splitterWrapper").kendoSplitter({
		    panes: [
		        { size:"25%" },
		       	{ size:"50%" },
		       	{ size:"25%" }
		    ],
		    orientation: "horizontal"
		});
		
		
		$("#middlePanel").kendoSplitter({
		    panes: [
		         {resizable: false, size: "380px" },
		         {}
		    ],
		    orientation: "vertical"
		});
		
		
		$("#rightPanel").kendoSplitter({
		    panes: [
		         { size: "430px", collapsible: true },
		         { collapsible: true}
		    ],
		    orientation: "vertical"
		});
		
		//Activo el scroll después del kendoSplitter porque si no calcula mal su ancho
		$('body').css('overflow','auto')
		
	}
	
	this.init = _init;
	
}