$(document).ready(function(){
	
	//Resize main container
	var h = $(window).height() - $('header').height() - $('footer').height();
	$('#splitterWrapper').height(h);
	
	mainPanel.init();
	
	//leftTree.init();

	rightUpperTab.init();
	
	rightLowerTab.init();
	
	//mainCanvas.init();
	
	imageSource.init();
	
	rightUpperSlidder.init();

	sceneList.init();
	
	actionController.init();
	
	textController.init();
	
	
	
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
		
	//new book button
	$('#newBookBtn').click(function(){
		//TODO: incluir confirm
		document.location.reload();
	})
	
	
	//export button
	$('#exportBtn').click(function(){
		
		if (_checkNames()){
			
			$('#export-msg').empty().removeClass('ok-msg');
			$('#export-file-name').val($('#book-name-input').val());
			$("#export-window").data("kendoWindow").center().open();	
		}
		
	});
	
	
	//Open book button
	$('#openBookBtn').click(function(){


		$("#import-window").data("kendoWindow").center().open();
	});
	
	
	//Upload image button
	$('#uploadImagesLocalButton').click(function(){

		if($("#files").data("kendoUpload")){
			$("#upload-window div").html('<input name="files" id="files" type="file" />');
		}

		$("#files").kendoUpload({
        	async: {
                saveUrl: "/s/upload",
                removeUrl: "remove",
                autoUpload: true
               
            } 
        });

		$("#upload-window").data("kendoWindow").center().open();
	});

	
	_initImportWindow();
	_initExportWindow();
	_initUploadWindow();
	
	//Init import window
	function _initImportWindow(){
		
		var window = $("#import-window");
		var errorMsg = $('#error-msg');
		
		window.kendoWindow({
			  width: "600px"
			, height: "150px"
			, title: "Abrir libro"
			, modal: true
			, visible: false
			, draggable: false
			, resizable: false
		});
		
		//Book upload button		
		$("#import-book-button").kendoUpload({
        	async: {
                saveUrl: "/s/upload",
                autoUpload: true,
            },
            success: _onUploadSuccess,
            error: _onUploadError
		});
		
		function _onUploadError(e){
		
			console.log('Upload error', e);	
			_onUploadComplete(e);
		}
		function _onUploadSuccess(e){
			
			console.log('Upload success', e);	
			_onUploadComplete(e);
		}
		
		function _onUploadComplete(e){
			
			var extension = e.files[0].extension;
			if (extension == ".plist"){
				
				var fileName = e.files[0].name;
				$.ajax({
						  url: "/s/getfile?fileName=" + fileName
						, dataType: "xml"
						, success: function(data){
							
							console.log('Data: ', data)
							var book = $.plist(data);
							console.log('Book loaded: ', book);
							openBook(book);
							errorMsg.empty();
							$("#import-window").data("kendoWindow").close();
						}
						, error: function(){
							errorMsg.text('No se encuentra el fichero seleccionado.')
						}
					})
			}
			else {
				errorMsg.text('El fichero seleccionado no tiene extensión .plist');
			}
			
		}
		
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
				
				var book = saveBook();
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
		
				}
				else {
					exportMsg.removeClass('ok-msg').text('Se ha producido un error.')
				}
				
				
			}
		});	
	}//end _initExportWindow function

	
	//Init upload window
	function _initUploadWindow(){
		var window = $("#upload-window");
		window.kendoWindow({
			  width: "600px"
			, height: "250px"
			, title: "Subir imágenes"
			, modal: true
			, visible: false
			, draggable: false
			, resizable: false
		});
		//window.data("kendoWindow").center().open();
		
		

	}//end _initExportWindow function
	
	/*
	 *  Comprobar que no haya nombres de escena duplicados
	 *  ni nombres de actor duplicados en la misma escena 
	 *  
	 */
	function _checkNames(){
		
		var   repeated = false
			, i = 0
			, j = 0
			, scenesLength = sceneList.scenes.length
			, actorNames = []
		;

		while (!repeated && i < scenesLength){
			
			//Comprobamos que no haya nombres de escena duplicados
			j = 0;
			while (!repeated && j < scenesLength){
				
				if(i != j && sceneList.scenes[i].item.attr('sceneName') == sceneList.scenes[j].item.attr('sceneName')){
					repeated = true;
				}
				else {
					j++
				}
				
			}
			
			i++;
			
			//TODO: comprobación de nombres de actores repetidos en la misma escena
		}
		
		if (repeated){
			alert('No puede haber escenas con el mismo nombre.');
			return false;
		}
		else {
			return true;
		}

	}
	
	
})
