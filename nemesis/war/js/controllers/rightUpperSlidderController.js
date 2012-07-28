
var rightUpperSlidder = new function(){

	this.positionXSlidder;
	this.positionYSlidder;
	this.scaleXSlidder;
	this.scaleYSlidder;
	this.angleSlidder;
	this.numericPositionX;
	this.numericPositionY;
	this.numericAngle;
	this.checkboxDraggable;
	this.checkboxTouchable;
	this.inputName;
	this.inputZindex;
	
	function _init(){

        
        
        $("#sliderPositionX").kendoSlider({
                change: sliderPositionXOnChange,
                slide: sliderPositionXOnChange,
                min: 0,
                max: 600,
                smallStep: 1,
                largeStep: 10,
                value: 18
            });   
        
        this.positionXSlidder = $("#sliderPositionX").data("kendoSlider");
            
        $("#sliderPositionY").kendoSlider({
                change: sliderPositionYOnChange,
                slide: sliderPositionYOnChange,
                min: 0,
                max: 480,
                smallStep: 1,
                largeStep: 10,
                value: 18
            }); 
        
        this.positionYSlidder = $("#sliderPositionY").data("kendoSlider");
        
        $("#sliderScaleX").kendoSlider({
            change: sliderScaleXOnChange,
            slide: sliderScaleXOnChange,
            min: -100,
            max: 1000,
            smallStep: 0.1,
            largeStep: 10,
            value: 18
        }); 
    
        this.scaleXSlidder = $("#sliderScaleX").data("kendoSlider");
    
	    $("#sliderScaleY").kendoSlider({
	        change: sliderScaleYOnChange,
	        slide: sliderScaleYOnChange,
	        min: -100,
	        max: 1000,
	        smallStep: 0.1,
	        largeStep: 10,
	        value: 18
	    }); 
	
	    this.scaleYSlidder = $("#sliderScaleY").data("kendoSlider");
	    
	    $("#sliderAngle").kendoSlider({
	        change: sliderAngleOnChange,
	        slide: sliderAngleOnChange,
	        min: -360,
	        max: 360,
	        smallStep: 1,
	        largeStep: 10,
	        value: 0
	    }); 
	
	    this.angleSlidder = $("#sliderAngle").data("kendoSlider");
        
	    // create NumericTextBox from input HTML element using custom format
        $("#numericPositionX").kendoNumericTextBox({
            format: "#.00px",
            change: numericPositionXOnChange,
            spin: numericPositionXOnChange
        });
        
        this.numericPositionX = $("#numericPositionX").data("kendoNumericTextBox");
        
        $("#numericPositionY").kendoNumericTextBox({
            format: "#.00px",
            change: numericPositionYOnChange,
            spin: numericPositionYOnChange
        });

        this.numericPositionY = $("#numericPositionY").data("kendoNumericTextBox");
        
        $("#numericAngle").kendoNumericTextBox({
            format: "#.00º",
            change: numericAngleOnChange,
            spin: numericAngleOnChange
        });

        this.numericAngle = $("#numericAngle").data("kendoNumericTextBox");
        
        this.checkboxDraggable = $("#checkboxDraggable");
        checkboxDraggableOnChange();
        
        this.checkboxTouchable = $("#checkboxTouchable");
        checkboxTouchableOnChange();
        
        this.inputName = $("#inputName");
        inputNameOnChange();
        
        this.inputZindex = $("#zindex");
        inputZindexOnChange();
        
	}
	
	function _updateControls() {
		
		rightUpperSlidder.positionXSlidder.value(mainCanvas.canvas.getActiveObject().getLeft());
		rightUpperSlidder.positionYSlidder.value(mainCanvas.canvas.getActiveObject().getTop());
		rightUpperSlidder.scaleXSlidder.value(mainCanvas.canvas.getActiveObject().getScaleX()*100);
		rightUpperSlidder.scaleYSlidder.value(mainCanvas.canvas.getActiveObject().getScaleY()*100);
		rightUpperSlidder.angleSlidder.value(mainCanvas.canvas.getActiveObject().getAngle());
		rightUpperSlidder.numericPositionX.value(mainCanvas.canvas.getActiveObject().getLeft());
		rightUpperSlidder.numericPositionY.value(mainCanvas.canvas.getActiveObject().getTop());
		rightUpperSlidder.numericAngle.value(mainCanvas.canvas.getActiveObject().getAngle());
		rightUpperSlidder.inputName.attr("value",leftTree.treeView.dataSource.getByUid(mainCanvas.canvas.getActiveObject().node[0].dataset.uid).text);
		rightUpperSlidder.inputZindex.attr("value",leftTree.treeView.dataSource.getByUid(mainCanvas.canvas.getActiveObject().node[0].dataset.uid).zindex);
		rightUpperSlidder.checkboxDraggable.attr("checked",leftTree.treeView.dataSource.getByUid(mainCanvas.canvas.getActiveObject().node[0].dataset.uid).draggable);
		rightUpperSlidder.checkboxTouchable.attr("checked",leftTree.treeView.dataSource.getByUid(mainCanvas.canvas.getActiveObject().node[0].dataset.uid).touchable);
		
	}
	
	function sliderPositionXOnChange(e) {
    	mainCanvas.canvas.getActiveObject().setLeft(e.value).setCoords();
    	_updateControls();
		mainCanvas.canvas.renderAll();
    }
    
    function sliderPositionYOnChange(e) {
		mainCanvas.canvas.getActiveObject().setTop(e.value).setCoords();
		_updateControls();
		mainCanvas.canvas.renderAll();
    }

    function sliderScaleXOnChange(e) {
    	mainCanvas.canvas.getActiveObject().setScaleX(e.value/100).setCoords();
    	_updateControls();
		mainCanvas.canvas.renderAll();
    }
    
    function sliderScaleYOnChange(e) {
    	mainCanvas.canvas.getActiveObject().setScaleY(e.value/100).setCoords();
    	_updateControls();
		mainCanvas.canvas.renderAll();
    }
    
    function sliderAngleOnChange(e) {
    	mainCanvas.canvas.getActiveObject().setAngle(e.value);	
    	_updateControls();
		mainCanvas.canvas.renderAll();
    }
    
    function numericPositionXOnChange(e){
    	mainCanvas.canvas.getActiveObject().setLeft(e.sender.value()).setCoords();
    	_updateControls();
		mainCanvas.canvas.renderAll();
    }
    
    function numericPositionYOnChange(e){
    	mainCanvas.canvas.getActiveObject().setTop(e.sender.value()).setCoords();	
    	_updateControls();
		mainCanvas.canvas.renderAll();
    }
    
    function numericAngleOnChange(e){
    	mainCanvas.canvas.getActiveObject().setAngle(e.sender.value());	
    	_updateControls();
		mainCanvas.canvas.renderAll();
    }
    
    function checkboxDraggableOnChange(){
    	rightUpperSlidder.checkboxDraggable.click(function(){
    		if(rightUpperSlidder.checkboxDraggable.is(':checked')) {  
    			leftTree.treeView.dataSource.getByUid(mainCanvas.canvas.getActiveObject().node[0].dataset.uid).draggable = true;
            } else {  
            	leftTree.treeView.dataSource.getByUid(mainCanvas.canvas.getActiveObject().node[0].dataset.uid).draggable = false;
            }     		
    	})
    			
    }
    
    function checkboxTouchableOnChange(){    	
    	rightUpperSlidder.checkboxTouchable.click(function(){
    		if(rightUpperSlidder.checkboxTouchable.is(':checked')) {  
    			leftTree.treeView.dataSource.getByUid(mainCanvas.canvas.getActiveObject().node[0].dataset.uid).touchable = true;
            } else {  
            	leftTree.treeView.dataSource.getByUid(mainCanvas.canvas.getActiveObject().node[0].dataset.uid).touchable = false;
            }     		
    	})
    		
    }
    
    function inputNameOnChange(){
    	rightUpperSlidder.inputName.change(function(e){
    		if(typeof mainCanvas.canvas.getActiveObject() != "undefined"){
    			leftTree.treeView.dataSource.getByUid(mainCanvas.canvas.getActiveObject().node[0].dataset.uid).text = e.srcElement.value;
    			leftTree.treeView.findByUid(mainCanvas.canvas.getActiveObject().node[0].dataset.uid).find(".k-in").html(e.srcElement.value);
    		}
    	})
    }
    
    function inputZindexOnChange(){
    	rightUpperSlidder.inputZindex.change(function(e){
    		if(typeof mainCanvas.canvas.getActiveObject() != "undefined"){
    			leftTree.treeView.dataSource.getByUid(mainCanvas.canvas.getActiveObject().node[0].dataset.uid).zindex = e.srcElement.value;
    		}
    	})
    }
	
    function _enableAll(){
    	rightUpperTab.rightUpper.find("input").attr("disabled",false);
    	rightUpperSlidder.positionXSlidder.enable();
		rightUpperSlidder.positionYSlidder.enable();
		rightUpperSlidder.scaleXSlidder.enable();
		rightUpperSlidder.scaleYSlidder.enable();
		rightUpperSlidder.angleSlidder.enable();
		rightUpperSlidder.numericPositionX.enable();
		rightUpperSlidder.numericPositionY.enable();
		rightUpperSlidder.numericAngle.enable();

    }
    
    function _disableAll(){
    	rightUpperTab.rightUpper.find("input").attr("disabled",true);
    	rightUpperSlidder.positionXSlidder.disable();
		rightUpperSlidder.positionYSlidder.disable();
		rightUpperSlidder.scaleXSlidder.disable();
		rightUpperSlidder.scaleYSlidder.disable();
		rightUpperSlidder.angleSlidder.disable();
		rightUpperSlidder.numericPositionX.enable(false);
		rightUpperSlidder.numericPositionY.enable(false);
		rightUpperSlidder.numericAngle.enable(false);

    }
    
	this.init = _init;
	this.updateControls = _updateControls;
	this.enableAll = _enableAll;
	this.disableAll = _disableAll;
}