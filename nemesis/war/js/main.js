$(document).ready(function(){
	
	//Header menu
	$("#menu").kendoMenu();
	
	//Book title & scene title
	$('#book-name-input, #scene-name-input')
		.blur(function(e){
			
			var name = $.trim($(this).val());
			if (name == ""){
				$(this).focus();
				return
			}
			
			if ($(this).attr('id') == 'scene-name-input'){
				sceneList.selected().item.attr('sceneName', name);
			}
		})
		.keyup(function(keyEvent){
			
			keyEvent = keyEvent? keyEvent : window.event;
			var keyCode = (keyEvent.keyCode ? keyEvent.keyCode : keyEvent.which);
			
            if ( keyCode == 13){ 
				$(this).blur();
            }
		})
	
	
	//export button
	$('#exportBtn').click(function(){
		
		$('#export-msg').empty().removeClass('ok-msg');
		$('#export-file-name').val($('#book-name-input').val());
		$("#export-window").data("kendoWindow").center().open();
	});
	
	
	//Open book button
	$('#openBookBtn').click(function(){

		$("#import-window").data("kendoWindow").center().open();
	});
	
	
	_initImportWindow();
	_initExportWindow();
	
	
	//Init import window
	function _initImportWindow(){
		var window = $("#import-window");
		window.kendoWindow({
			  width: "600px"
			, height: "150px"
			, title: "Abrir libro"
			, modal: true
			, visible: false
			, draggable: false
			, resizable: false
		});
		//window.data("kendoWindow").center().open();
		
		$('#file-name').focus(function(){
			
			$('#error-msg').empty();
		});
		
		
		$('#accept-file-btn').click(function(){
			
			var errorMsg = $('#error-msg');
			var file = $('#file-name');
			var fileName = file.val();
			
			if ($.trim(fileName) == ""){
				
				errorMsg.text('No ha seleccionado ningún fichero.')
			}
			else {
				
				$.ajax({
					  url: "/books/" + fileName
					, dataType: "xml"
					, success: function(data){
						
						var book = $.plist(data);
						console.log('Book imported: ', book);
						openBook(book);
						$('#exportBtn').attr('disabled', false)
						
						file.val('');
						errorMsg.empty();
						window.data("kendoWindow").close();
					}
					, error: function(){
						errorMsg.text('El fichero seleccionado no es válido.')
					}
				})
			}
		});	
	}//end _initImportWindow function
	
	
	//Init export window
	function _initExportWindow(){
		var window = $("#export-window");
		window.kendoWindow({
			  width: "600px"
			, height: "150px"
			, title: "Guardar libro"
			, modal: true
			, visible: false
			, draggable: false
			, resizable: false
		});
		//window.data("kendoWindow").center().open();
		
		$('#export-file-name').focus(function(){
			
			$('#export-msg').empty();
		});
		
		
		$('#accept-export-btn').click(function(){
			
			var exportMsg = $('#export-msg');
			var file = $('#export-file-name');
			var fileName = file.val();
			
			if ($.trim(fileName) == ""){
				
				exportMsg.removeClass('ok-msg').text('Debes escoger un nombre para tu libro.')
			}
			else {
				
				var book = tree2book(fileName);
				if (book){
					var plist = json2plist(book);
					
//					var uriContent = "data:application/octet-stream," + encodeURIComponent(plist);
//					location.href = uriContent
					
					var bb = new BlobBuilder;
					bb.append(plist);
					saveAs(bb.getBlob("text/plain;charset=utf-8"), fileName + ".plist");
					
					exportMsg
						.addClass('ok-msg')
						.text('¡Libro guardado con éxito!');
						_exportBook(fileName);	
				}
				else {
					exportMsg.removeClass('ok-msg').text('Se ha producido un error.')
				}
				
				
			}
		});	
	}//end _initExportWindow function
	
	function _exportBook(fileName){
		
		
	}
})