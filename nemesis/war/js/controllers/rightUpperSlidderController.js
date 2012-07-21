
var rightUpperSlidder = new function(){

	this.positionXSlidder;
	this.positionYSlidder;
	this.scaleXSlidder;
	this.scaleYSlidder;
	this.angleSlidder;
	
	function _init(){

		function sliderOnSlide(e) {
			mainCanvas.canvas.getActiveObject().setLeft(e.value).setCoords();
			mainCanvas.canvas.getActiveObject().setTop(e.value).setCoords();
        }

        function sliderOnChange(e) {
        	mainCanvas.canvas.getActiveObject().setLeft(e.value).setCoords();
			mainCanvas.canvas.getActiveObject().setTop(e.value).setCoords();
        }

        function rangeSliderOnSlide(e) {
           
        }

        function rangeSliderOnChange(e) {
           
        }

        
        $("#sliderPositionX").kendoSlider({
                change: sliderOnChange,
                slide: sliderOnSlide,
                min: 0,
                max: 600,
                smallStep: 1,
                largeStep: 10,
                value: 18
            });   
        
        this.positionXSlidder = $("#sliderPositionX").data("kendoSlider");
            
        $("#sliderPositionY").kendoSlider({
                change: sliderOnChange,
                slide: sliderOnSlide,
                min: 0,
                max: 480,
                smallStep: 1,
                largeStep: 10,
                value: 18
            }); 
        
        this.positionYSlidder = $("#sliderPositionY").data("kendoSlider");
        
        $("#sliderScaleX").kendoSlider({
            change: sliderOnChange,
            slide: sliderOnSlide,
            min: 0,
            max: 1000,
            smallStep: 1,
            largeStep: 10,
            value: 18
        }); 
    
        this.scaleXSlidder = $("#sliderScaleX").data("kendoSlider");
    
	    $("#sliderScaleY").kendoSlider({
	        change: sliderOnChange,
	        slide: sliderOnSlide,
	        min: 0,
	        max: 1000,
	        smallStep: 1,
	        largeStep: 10,
	        value: 18
	    }); 
	
	    this.scaleYSlidder = $("#sliderScaleY").data("kendoSlider");
	    
	    $("#sliderAngle").kendoSlider({
	        change: sliderOnChange,
	        slide: sliderOnSlide,
	        min: 0,
	        max: 360,
	        smallStep: 1,
	        largeStep: 10,
	        value: 18
	    }); 
	
	    this.angleSlidder = $("#sliderAngle").data("kendoSlider");
        

	}
	
	this.init = _init;
	
}