var actionController = new function(){
	
	var   _$
		, _$name
		, _$duration
		, _$type
	;
	
	function _init(){
		
		_$ = $('#new-action-window');
		_$.kendoWindow({
			  width: "600px"
			, height: "250px"
			, title: "Añade una acción al objeto"
			, modal: true
			, visible: false
			, draggable: false
			, resizable: false
		});
		
		_$name = $('#action-name');
		_$duration = $("#action-duration").kendoNumericTextBox().data("kendoNumericTextBox");
		//$('#action-type').kendoDropDownList();
		
		_$type = $('#action-type').kendoDropDownList().data("kendoDropDownList");
		
		_reset();
		//_open();
	}
	
	function _reset(){
		
		debugger;
		_$name.val('');
		_$type.select(3);
		_$duration.value(0)
		
	}
	
	function _open(){
		_$.data("kendoWindow").center().open();
	}
	
	this.open = _open;
	this.init =  _init;
}