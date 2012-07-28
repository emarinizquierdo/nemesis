
var rightUpperTab = new function(){
	
	this.rightUpper;
	
	function _init(){
		
		rightUpperTab.rightUpper = $("#rightUpperTabStripp").kendoTabStrip({
			animation:	{
				open: {
					effects: "fadeIn"
				}
			}
		
		});
		
		rightUpperTab.rightUpper.find("input").attr("disabled",true);
		
	}
	
	this.init = _init;
	
}


