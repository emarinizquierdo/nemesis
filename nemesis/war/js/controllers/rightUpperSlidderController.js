
var rightUpperSlidder = new function(){

	this.positionXSlidder;
	this.positionYSlidder;
	this.scaleXSlidder;
	this.scaleYSlidder;
	this.angleSlidder;
	
	function _init(){

		function sliderPositionXOnSlide(e) {
			mainCanvas.canvas.getActiveObject().setLeft(e.value).setCoords();
			mainCanvas.canvas.renderAll();
        }
		
		function sliderPositionYOnSlide(e) {
			mainCanvas.canvas.getActiveObject().setTop(e.value).setCoords();
			mainCanvas.canvas.renderAll();
        }

        function sliderPositionXOnChange(e) {
        	mainCanvas.canvas.getActiveObject().setLeft(e.value).setCoords();			
			mainCanvas.canvas.renderAll();
        }
        
        function sliderPositionYOnChange(e) {
			mainCanvas.canvas.getActiveObject().setTop(e.value).setCoords();
			mainCanvas.canvas.renderAll();
        }
        
        function sliderScaleXOnSlide(e) {
			mainCanvas.canvas.getActiveObject().setScaleX(e.value/100).setCoords();
			mainCanvas.canvas.renderAll();
        }
        
        function sliderScaleYOnSlide(e) {
			mainCanvas.canvas.getActiveObject().setScaleY(e.value/100).setCoords();
			mainCanvas.canvas.renderAll();
        }
        
        function sliderScaleXOnChange(e) {
        	mainCanvas.canvas.getActiveObject().setScaleX(e.value/100).setCoords();			
			mainCanvas.canvas.renderAll();
        }
        
        function sliderScaleYOnChange(e) {
        	mainCanvas.canvas.getActiveObject().setScaleY(e.value/100).setCoords();			
			mainCanvas.canvas.renderAll();
        }
        
        function sliderAngleOnSlide(e) {
			mainCanvas.canvas.getActiveObject().setAngle(e.value);
			mainCanvas.canvas.renderAll();
        }
        
        function sliderAngleOnChange(e) {
        	mainCanvas.canvas.getActiveObject().setAngle(e.value);			
			mainCanvas.canvas.renderAll();
        }
        
        $("#sliderPositionX").kendoSlider({
                change: sliderPositionXOnChange,
                slide: sliderPositionXOnSlide,
                min: 0,
                max: 600,
                smallStep: 1,
                largeStep: 10,
                value: 18
            });   
        
        this.positionXSlidder = $("#sliderPositionX").data("kendoSlider");
            
        $("#sliderPositionY").kendoSlider({
                change: sliderPositionYOnChange,
                slide: sliderPositionYOnSlide,
                min: 0,
                max: 480,
                smallStep: 1,
                largeStep: 10,
                value: 18
            }); 
        
        this.positionYSlidder = $("#sliderPositionY").data("kendoSlider");
        
        $("#sliderScaleX").kendoSlider({
            change: sliderScaleXOnChange,
            slide: sliderScaleXOnSlide,
            min: -100,
            max: 1000,
            smallStep: 0.1,
            largeStep: 10,
            value: 18
        }); 
    
        this.scaleXSlidder = $("#sliderScaleX").data("kendoSlider");
    
	    $("#sliderScaleY").kendoSlider({
	        change: sliderScaleYOnChange,
	        slide: sliderScaleYOnSlide,
	        min: -100,
	        max: 1000,
	        smallStep: 0.1,
	        largeStep: 10,
	        value: 18
	    }); 
	
	    this.scaleYSlidder = $("#sliderScaleY").data("kendoSlider");
	    
	    $("#sliderAngle").kendoSlider({
	        change: sliderAngleOnChange,
	        slide: sliderAngleOnSlide,
	        min: -360,
	        max: 360,
	        smallStep: 1,
	        largeStep: 10,
	        value: 0
	    }); 
	
	    this.angleSlidder = $("#sliderAngle").data("kendoSlider");
        

	}
	
	this.init = _init;
	
}