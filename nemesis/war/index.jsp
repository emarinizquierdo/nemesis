<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
	
<head>
	<title>Applicación</title>

	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<meta name="description" content="This is my bloody exciting web page about air conditioners" />
	
	<!--<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js" ></script>-->	
    <!--<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.21/jquery-ui.min.js" ></script>-->	
	
	<link rel="stylesheet" href="/css/main.css" type="text/css" media="screen" title="no title" />
	
	<link href="lib/kendo/styles/kendo.common.min.css" rel="stylesheet" type="text/css" />
	<link href="lib/kendo/styles/kendo.default.min.css" rel="stylesheet" type="text/css" />
	
	<script src="lib/kendo/js/jquery.min.js" type="text/javascript"></script>
	<script src="lib/kendo/js/kendo.web.min.js" type="text/javascript"></script>
	
	<script src="lib/fabric/fabric.js" type="text/javascript"></script>
	
	<script src="lib/BlobBuilder.min.js" type="text/javascript"></script>
	<script src="lib/FileSaver.min.js" type="text/javascript"></script>
	
	<script src="lib/jquery.plist.js" type="text/javascript"></script>
	
	<%@ include file="libraries.html" %>
	
	<script type="text/javascript" src="js/book.js"></script>
	<script type="text/javascript" src="js/saveBook.js"></script>
	<script type="text/javascript" src="js/json2plist.js"></script>
	<script type="text/javascript" src="js/openBook.js"></script>
	
	<script src="js/main.js" type="text/javascript"></script>
	
</head>
	
	
<body>
	
	<header>

		<ul id="menu">
			<li>
				<img src="/img/settings-wheel.png" width="24" height="24" />
				<ul>
<!-- 					<li id="newBookBtn">Nuevo libro</li> -->
					<li id="openBookBtn">Abrir libro</li>
					<li id="exportBtn">Guardar libro</li>
				</ul>
			</li>
		</ul>

		<input type="text" value="Mi primer libro" id="book-name-input" class="title" />
		
	</header>
	
	
	
	<div id="main">
	
		<div id="mainWrapper">
			
			<div id="splitterWrapper">
			    	    	
			    	<div id="leftPanel">
			    		<div id="leftPanelWrapper">
			    			<span class="title">Explorador de objetos</span>			    			
			    			<div id="treeview-left"></div>			    			
			    		</div>
			    		<div id="imagesPanel">
			    			<a id="uploadImagesLocalButton" class="button">Upload Images</a>
			    			<a id="addImageLocalButton" class="button">Add</a>
							<a id="removeImageLocalButton" class="button">Remove</a>
			    			<div id="listView"></div>
							<div id="pager" class="k-pager-wrap"></div>
			    		
				    		<script type="text/x-kendo-tmpl" id="template">
        						<div class="localImage">
            						<img src="\${url}" alt="\${title} image" />
        						</div>
    						</script>
						</div>
					</div>
					<!-- end leftPanel -->    
					
					
			    
			    
			    	<div id="middlePanel">

			 			<div class="mainCanvasWrapper">
			 			
			 				<input type="text" value="" id="scene-name-input" class="title" />
			    			<div id="canvasWrapper">

<!-- 			    				<canvas id="canvas" width="500" height="400"></canvas> -->
			    			
			    			</div>
			    		</div>
			    		<div>
			    			<div id="sceneButtonContainer">
			    				<button id="snapshotButton" class="button">Take Snapshot</button>
			    				<button id="removeSceneButton" class="button">Remove Scene</button>
			    				<button id="newSceneButton" class="button">New Scene</button>
			    			</div>
			    			
			    			<ul id="sceneList">	
			    			</ul>			    		
			    		</div>
					</div>	   
					<!-- end middlePanel --> 
					
						
			    
			    	<div id="rightPanel">
			    			    			
			    			<div id="rightUpperTabStripp">
								<ul>
									<li>Propiedades</li>
									<li class="k-state-active">Animaciones</li>
								</ul>
								
			                        <div class="bodyTabStrip">
				                        <ul>
				                        	<li>Position:</li>
				                        	<li><input id="sliderPositionX" class="positionX" />  <input id="numericPositionX" value="2" ></li>			                        	
				                        	<li><input id="sliderPositionY" class="positionY" />  <input id="numericPositionY" value="2" /></li>
				                        	<li>Scale:</li>
				                        	<li><input id="sliderScaleX" class="scaleX" /></li>
				                        	<li><input id="sliderScaleY" class="scaleY" /></li>
				                        	<li>Angle:</li>
				                        	<li><input id="sliderAngle" class="angle" />  <input id="numericAngle" value="2" /></li>			                        	
				                        	<li><span>Draggable:</span>
				                        		<input id="checkboxDraggable" type="checkbox" value="false"/>
				                        		<span>Touchable:</span>
				                        		<input id="checkboxTouchable" type="checkbox" value="false"/>
				                        	</li>
				                        	<li><span>Name:</span><input id="inputName" type="text" value=""/></li>
				                        	<li><span>z-index:</span><input id="zindex" type="text" value=""/></li>			                        	
				                        </ul>  
			                        </div>									
								
			                        <div class="bodyTabStrip">
			                        	<ul id="actionsList"></ul>
			                        	<button>Add action</button>
			                        </div>									
															
							</div>	
							<!-- end  rightUpperTabStripp-->
							
							
			    		
			    		
			    			 <div id="rightLowerTabStripp">
								<ul>
									<li class="k-state-active">
										Scene
									</li>
									<li>
										Lib
									</li>
									<li>
										Config Book
									</li>
								</ul>
								<div>
			                        <div class="bodyLowerTabStrip">
			                            Show Next Page Button <input id="nextButtonScene" type="checkbox" value="false"/><br/>
			                            Show Previous Page Button <input id="previousButtonScene" type="checkbox" value="false"/><br/>
			                        </div>									
								</div>
								<div>
			                        <div class="bodyLowerTabStrip"> 
			                        </div>									
								</div>
								<div>
			                        <div class="bodyLowerTabStrip">
			                        </div>									
								</div>								
							</div>	
							<!-- end rightLowerTabStripp -->	
							   			
			    			
			    		
					</div>
					<!-- end rightPanel -->
					
					

			</div>
			<!-- end splitterWrapper -->
		
		
		</div>	
		<!-- end mainWrapper -->
		
		
	</div>
	<!-- end main -->
	
	<footer>
	</footer>
	
	
	<div id="import-window">
		<span>Indica el nombre del fichero:</span>
		<input type="text" id="file-name" size="40" />
		<input type="button" id="accept-file-btn" value="Abrir libro" class="window-accept-btn" />
		<div id="error-msg" class="window-msg"></div>
	</div>
	
	<div id="export-window">
		<span>Escoge un nombre para tu libro:</span>
		<input type="text" id="export-file-name" size="33" />
		<input type="button" id="accept-export-btn" value="Guardar libro" class="window-accept-btn" />
		<div id="export-msg" class="window-msg"></div>
	</div>
	
	<div id="upload-window">
		<span>Selecciona imágenes a subir:</span>
		<form method="post" action="submit" style="width:45%">
				                <div>
				                    <input name="files" id="files" type="file" />
				                    <p>
				                        
				                    </p>
				                </div>
				            </form>
				             <script>
                $(document).ready(function() {
                    $("#files").kendoUpload({
                    	 async: { saveUrl: "/s/upload" }
                    });
                });
            </script>
	</div>
	

	<div id="new-action-window">
		<table>
			<tr><td>Nombre:</td>
				<td><input type="text" id="action-name" size="40" class="k-textbox" /></td>
			</tr>
			<tr><td>Duración:</td>
				<td><input id="action-duration" type="number" value="0" min="0" step="0.1" /></td>
			</tr>
			<tr><td>Tipo:</td>
				<td>
					<select id="action-type">
						<option value="DDMoveTo">Mover hasta</option>
						<option value="DDMoveBy">Mover desde</option>
						<option value="DDRotateTo">Girar hasta</option>
						<option value="DDRotateBy">Girar desde</option>
						<option value="DDScaleTo">Escalar hasta</option>
						<option value="DDScaleBy">Escalar desde</option>
						<option value="DDFadeIn">Aumentar opacidad</option>
						<option value="DDFadeOut">Disminuir opacidad</option>
						<option value="DDDelay">Aplicar retraso</option>
						<option value="DDRepeat">Repetir animación</option>
						<option value="DDRepeatForever">Repetir animación ininterrumpidamente</option>
						<option value="DDSequence">Animación secuencial</option>
						<option value="DDRepeatForever">Animación secuencial ininterrumpida</option>
					</select>
				</td>
			</tr>
			<tr>
				<td>Eje horizontal:</td>
				<td>Eje vertical</td>
			</tr>
			<tr>
				<td><input id="move-to-x" type="number" value="0" min="0" step="1" /></td>
				<td><input id="move-to-y" type="number" value="0" min="0" step="1" /></td>
			</tr>
			<tr>
				<td>Ángulo:</td>
			</tr>
			<tr>
				<td><input id="angle" type="number" value="0" min="0" step="1" /></td>
			</tr>
		
		</table>
		<div id="action-window-buttons">
			<div id="action-msg" class="window-msg"></div>
			<button id="accept-export-btn" class="window-accept-btn">Cancelar</button>
			<button id="cancel-action-btn" class="window-accept-btn">Aceptar</button>
		</div>
	</div>
	
</body>	
</html>
