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
	var _$newBtn;
	
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
		_$relatedAction = $('#related-action').kendoDropDownList({
				dataTextField: "text",
			    dataValueField: "value"		
		}).data("kendoDropDownList");
		
		_$msg = $('#action-msg');
		
		_$actionList = $('#action-list');
		
		$('#cancel-action-btn').click(function(){
			_closeWindow();
		})
		$('#accept-action-btn').click(function(){
			if (_check()){
				_addAction();
				_closeWindow();
			}
		})
		
		//new action button
		_$newBtn = $('#new-action-button')
		_$newBtn.hide();
		_$newBtn.click(function(){
			actionController.openWindow();
		})
		
		//remove action red cross button
		_$actionList.on('click', 'a', function(){
			
			var leaf = leftTree.selected();
			if (leaf){
				
				//Eliminar la acción del listado
				$(this).parent().remove();
				
				//Eliminar la acción del árbol
				var actionName = $(this).siblings('[_type="actionName"]').text();
				console.log(actionName)
				delete leaf.actions[actionName]
				
			}
			else {
				console.log('Error al eliminar la acción. No hay ningún objeto seleccionado.')
			}
			
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
	
	function _openWindow(){
		
		_reset();
		_fillRelatedAction();
		_$.data("kendoWindow").center().open();
	}
	
	function _closeWindow(){
		
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
	
	function _fillRelatedAction(){
		
		 _$relatedAction.dataSource.data({});
		 _$actionList.children().each(function(i,e){
			 
			 var actionName = $(this).find('[_type="actionName"]').text();
			 
			 _$relatedAction.dataSource.add({value:actionName, text:actionName});
			 
		 })
		 _$relatedAction.refresh();
	}
	
	function _check(){
		
		if ($.trim(_$name.val()) == ""){
			
			_$msg.text('Elije un nombre para la acción.');
			return false;
		}
		
		var type = _$type.value();
		if (type == "DDRepeat" || type == "DDRepeatForever" || type == "DDSequence" || type == "DDSequenceForever"){
			if (_$relatedAction.select() == -1){
				_$msg.text('Elige una acción asociada.');
				return false;
			}
		}

		return true
	}
	
	function _createListItem(p_name){
		
		var action = $('<li><a><img width=16 height=16 src="/img/red_cross.png" /></a><span _type="actionName">' + p_name + '</span></li>' );
		_$actionList.append(action);
	}
	
	function _addAction(){
		
		var leaf = leftTree.selected();
		if (leaf){
			
			var actionName = $.trim(_$name.val())
		
			//create a new action in the list
			_createListItem(actionName);
			
			//create a new action in the selected leaf 
			var type = _$type.value();
			var newAction = {
				  name: actionName
				, type: _$type.value()
				, duration: _$duration.value()
			}
			if (type == "DDMoveTo" || type == "DDMoveBy"){
				newAction.moveX = _$moveX.value();
				newAction.moveY = _$moveY.value();
			}
			else if (type == "DDRotateTo" || type == "DDRotateBy"){
				newAction.angle = _$angle.value();
			}
			else if (type == "DDScaleTo" || type == "DDScaleBy"){
				newAction.scaleX = _$scaleX.value();
				newAction.scaleX = _$scaleY.value();
			}
			else if (type == "DDRepeat" || type == "DDRepeatForever" || type == "DDSequence" || type == "DDSequenceForever"){
				newAction.relatedAction = _$relatedAction.value();
			}
			
			if (!leaf.actions){
				leaf.actions = {}
			}
			leaf.actions[actionName] = newAction;
		}
		else {
			console.log('Error al crear la acción. No hay ningún objeto seleccionado.')
		}
	}
	
	
	function _updateActionList(){
		
		_emptyActionList();
		
		var leaf = leftTree.selected();
		if (leaf && leaf.actions){
			
			$.each(leaf.actions, function(i,e){
				
				_createListItem(i);
			})
		}
		
		//Toggle new action button
		_$newBtn.toggle(leaf != null);
	}
	
	function _emptyActionList(){
		_$actionList.empty();
	}
	
	this.openWindow = _openWindow;
	this.init =  _init;
	this.updateActionList = _updateActionList;
	this.emptyActionList = _emptyActionList;
}