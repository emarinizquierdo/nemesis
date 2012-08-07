var sceneList = new function(){
	
	this.sceneView;
	
	function _init(){
		

		sceneList.sceneView = $("#sceneList").kendoListView({
	          template: "<li>${FirstName} ${LastName}</li>",
	          dataSource: {
	              data: [
	                  {
	                      FirstName: "Joe",
	                      LastName: "Smith"
	                  },
	                  {
	                      FirstName: "Jane",
	                      LastName: "Smith"
	              }]
	          }
	      }).data("kendoListView");
		
		
		$("#snapshotButton").click(function(){
			
			var auxImgData = mainCanvas.canvas.toDataURL("png");
			
			$("#imgSnapshot").attr("src",auxImgData);
			
		});
		
		
	}
	
	
	
	
	this.init = _init;
	
}


