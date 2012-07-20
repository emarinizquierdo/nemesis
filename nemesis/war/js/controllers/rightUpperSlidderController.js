
var rightUpperSlidder = new function(){

	this.positionXSlidder;
	this.positionYSlidder;
		
	function _init(){

		function sliderOnSlide(e) {
            
        }

        function sliderOnChange(e) {
            
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
        

	}
	
	this.init = _init;
	
}