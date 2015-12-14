var textController = new function(){
	
	var   _$newTextBtn
		, _$newTextWindow
		, _$size
		, _$text
		, _$color
		, _$msg
		, _$acceptBtn
		, _$cancelBtn
	;
	
	function _init(){
		
		_$newTextBtn = $('#addTextButton');
		_$newTextWindow = $('#text-window');
		_$text = $('#text');
		_$color = $('#color');
		_$size = $("#size").kendoNumericTextBox().data("kendoNumericTextBox");
		_$msg = $('#text-msg');
		_$cancelBtn = $('#cancel-text-btn')
		_$acceptBtn = $('#accept-text-btn')
		
		_$newTextBtn.click(function(){
			
			_$text.val('');
			_$size.value(50);
			_$color.val('FF0000');
			_$msg.text('');
			_$newTextWindow.data("kendoWindow").center().open();
		})
		
		_$newTextWindow.kendoWindow({
			  width: "310px"
			, height: "235px"
			, title: "Añade un texto a la escena"
			, modal: true
			, visible: false
			, draggable: false
			, resizable: false
		});
		
		_$cancelBtn.click(function(){
			_closeWindow();
		})
		
		_$acceptBtn.click(function(){
			if (_check()){
				_addTextObject();
				_closeWindow();
			}
		})
		
	}
	
	function _closeWindow(){
		
		_$newTextWindow.data("kendoWindow").close();
	}
	
	function _addTextObject(){
		
		var text = $.trim( _$text.val() );
		var settings = {
			fontFamily: 'Delicious_500', 
			left: 300,
			top: 240,
	        fontSize: _$size.value(),
	        textAlign: "left",
	        fill: _$color.val(),
	        text: text
		}
		
		mainCanvas.addText(text, settings, function(p_imageObj){
			leftTree.addElement(p_imageObj, settings);				
		});
	}
	
	function _check(){
		
		var text = $.trim( _$text.val() );
		var color =  $.trim( _$color.val() );
		
		if (text == ""){
			_$msg.text('Indica un texto.')
			return false;
		}
		else if (color.length != 6){
	
			_$msg.text('El código de color tiene 6 caracteres.')
			return false;
		}
		else {
			return true;
		}
		
	}
	
	
	this.init = _init;
}