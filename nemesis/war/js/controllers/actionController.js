var actionController = new function(){
	
	var   _$
		, _$name
		, _$duration
		, _$type
		, _$moveX
		, _$moveY
		, _$angle
		, _$scaleX
		, _$scaleY
		, _$relatedAction
		, _$msg
	;
	
	var _$actionList;
	
	function _init(){
		
		_$ = $('#new-action-window');
		_$.kendoWindow({
			  width: "600px"
			, height: "300px"
			, title: "Añade una acción al objeto"
			, modal: true
			, visible: false
			, draggable: false
			, resizable: false
		});
		
		_$name = $('#action-name');
		_$duration = $("#action-duration").kendoNumericTextBox().data("kendoNumericTextBox");
		_$type = $('#action-type')
			.kendoDropDownList({
				change: _changeType
			})
			.data("kendoDropDownList");
		_$moveX = $("#move-x").kendoNumericTextBox().data("kendoNumericTextBox");
		_$moveY = $("#move-y").kendoNumericTextBox().data("kendoNumericTextBox");
		_$angle = $("#angle").kendoNumericTextBox().data("kendoNumericTextBox");
		_$scaleX = $("#scale-x").kendoNumericTextBox().data("kendoNumericTextBox");
		_$scaleY = $("#scale-y").kendoNumericTextBox().data("kendoNumericTextBox");
		_$relatedAction = $('#related-action').kendoDropDownList().data("kendoDropDownList");
		
		_$msg = $('#action-msg');
		
		_$actionList = $('#action-list');
		
		$('#cancel-action-btn').click(function(){
			_close();
		})
		$('#accept-action-btn').click(function(){
			if (_check()){
				_addAction();
				_close();
			}
		})
		
		//new action button
		$('#new-action-button').click(function(){
			actionController.open();
		})
		
		//remove action red cross button
		_$actionList.on('click', 'a', function(){
			$(this).parent().remove();
		})
		
		_reset();
	}
	
	function _reset(){
		
		_$name.val('');
		_$type.select(0);
		_$duration.value(0);
		_$.find('.action-param').hide();
		$("#tr-move-x").show();
		$("#tr-move-y").show();
		_$moveX.value(0);
		_$msg.text('');
	}
	
	function _open(){
		
		_reset();
		_$.data("kendoWindow").center().open();
	}
	
	function _close(){
		
		_$.data("kendoWindow").close();
	}
	
	function _changeType(){
		
		//reset
		_$.find('.action-param').hide();
		_$.find('.action-param input').val(0);
		_$relatedAction.select(0);
		_$msg.text('');
		
		var type = _$type.value();
		
		
		if (type == "DDMoveTo" || type == "DDMoveBy"){
			$("#tr-move-x").show();
			$("#tr-move-y").show();
		}
		else if (type == "DDRotateTo" || type == "DDRotateBy"){
			$("#tr-rotate").show();
		}
		else if (type == "DDScaleTo" || type == "DDScaleBy"){
			$("#tr-scale-x").show();
			$("#tr-scale-y").show();
		}
		else if (type == "DDRepeat" || type == "DDRepeatForever" || type == "DDSequence" || type == "DDSequenceForever"){
			$("#tr-related").show();
		}
	}
	
	function _check(){
		
		if ($.trim(_$name.val()) == ""){
			
			_$msg.text('Elije un nombre para la acción.');
			return false;
		}

		return true
	}
	
	function _addAction(){
		var action = $('<li><a><img width=16 height=16 src="/img/red_cross.png" /></a><span>' + $.trim(_$name.val()) + '</span></li>' );
		_$actionList.append(action);
	}
	
	this.open = _open;
	this.init =  _init;
}