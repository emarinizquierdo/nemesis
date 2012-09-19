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
	<script src="fonts/Delicious_500.font.js" type="text/javascript"></script>
	
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
			    		
			    			<table id="images-panel-buttons">
			    				<tr>
				    				<td><a title="Upload image" id="uploadImagesLocalButton"><img src="/img/upload.png" /></a></td>
				    				<td><a title="Add image object" id="addImageLocalButton"><img src="/img/image_add.png" /></a></td>
				    				<td class="ico-text"><a title="Add text object" id="addTextButton"><img src="/img/insert-text.png" /></a></td>
				    				<td><a title="Remove selected object" id="removeImageLocalButton"><img src="/img/image_remove.png" /></a></td>
			    				</tr>
			    			</table>			    			
							
			    			<div id="listView"></div>
							<div id="pager" class="k-pager-wrap"></div>
			    		
				    		<script type="text/x-kendo-tmpl" id="template">
        						<div class="localImage">
            						<img src="\${url}" title="\${title}" />
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
									<li class="k-state-active">Properties</li>
									<li>Actions</li>
								</ul>
								
			                        <div class="bodyTabStrip">
				                        <ul id="properties-list">
				                        	
				                        	<li><span class="inputSpan">Name:</span><input id="inputName" type="text" value="" class="k-textbox" /></li>
				                        	
				                        	<li><span class="inputSpan">Layer:</span><input id="zindex" type="text" value="" class="k-textbox" /></li>
				                        	
				                        	<li class="prop-title">Position:</li>
				                        	<li><input id="sliderPositionX" class="positionX" />  <input id="numericPositionX" value="0" ></li>			                        	
				                        	<li><input id="sliderPositionY" class="positionY" />  <input id="numericPositionY" value="0" /></li>
				                        	
				                        	<li class="prop-title">Angle:</li>
				                        	<li><input id="sliderAngle" class="angle" />  <input id="numericAngle" value="0" /></li>
				                        	
				                        	<li class="prop-title">Scale:</li>
				                        	<li><input id="sliderScaleX" class="scaleX" /></li>
				                        	<li><input id="sliderScaleY" class="scaleY" /></li>
				                        	
				                        	<li class="prop-title">
				                        		<input id="checkboxDraggable" type="checkbox" value="false"/>
				                        		<span>Draggable</span>
				                        	</li>
				                        	
				                        	<li>
				                        		<input id="checkboxTouchable" type="checkbox" value="false"/>
				                        		<span>Touchable</span>
				                        	</li>
				                        				                        	
				                        </ul>  
			                        </div>									
								
			                        <div class="bodyTabStrip">
			                        	<ul id="action-list"></ul>
			                        	<button class="button" id="new-action-button">New action</button>
			                        </div>									
															
							</div>	
							<!-- end  rightUpperTabStripp-->
							
							
			    		
			    		
			    			 <div id="rightLowerTabStripp">
								<ul>
									<li class="k-state-active">
										Scene
									</li>
									<li>
										Config Book
									</li>
								</ul>
								
		                        <div class="bodyLowerTabStrip">
		                        	<table>
		                        		<tr>
		                        			<td><input id="nextButtonScene" type="checkbox" value="false"/></td>
		                        			<td><span>Show next scene button</span></td>
		                        		</tr>
		                        		<tr>
		                        			<td><input id="previousButtonScene" type="checkbox" value="false"/></td>
		                        			<td><span>Show previous scene button</span></td>
		                        		</tr>
		                        	</table>
		                        </div>									
								
		                        <div class="bodyLowerTabStrip">
		                        	<ul>
		                        		<li>
		                        			<p>Engine version: <span id="version-engine">0.1.3</span></p>
		                        		</li>
		                        		
		                        		<li>
		                        			<p>Previous escene icon:</p>
		                        			<p><input type="file" id="prev-scene-icon"/></p>
		                        		</li>
		                        		
		                        		<li>
		                        			<p>Next escene icon:</p>
		                        			<p><input type="file" id="next-scene-icon"/></p>
		                        		</li>
		                        	
		                        	</ul>
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
		<p>Indica el nombre del fichero:</p>
			<input id="import-book-button" name="import-book-button" type="file" />	
        	<div id="error-msg" class="window-msg"></div>
	</div>
	
	<div id="export-window">
		<span>Escoge un nombre para tu libro:</span>
		<input type="text" id="export-file-name" size="30" />
		<input type="button" id="accept-export-btn" value="Guardar libro" class="button" />
		<div id="export-msg" class="window-msg"></div>
	</div>
	
	<div id="upload-window">
		<span>Selecciona imágenes a subir:</span>
		<div style="width:45%">
			<input name="files" id="files" type="file" />
        </div>
        <div id="upload-msg" class="window-msg"></div>
	</div>
	
	<div id="text-window">
		<table>
			<tr>
				<td>Texto:</td>
				<td><input type="text" id="text" name="text" class="k-textbox" /></td>
			</tr>
			<tr>
				<td>Tamaño:</td>
				<td><input type="number" id="size" value="50" min="0" step="1" name="size" /></td>
			</tr>
			<tr>
				<td>Color:</td>
				<td><input type="text" maxlength="7" id="color" name="color" class="k-textbox" /></td>
			</tr>
		</table>
		
		<div id="text-window-buttons">
			
			<button id="cancel-text-btn" class="button" >Cancelar</button>
			<button id="accept-text-btn" class="button">Aceptar</button>
			<div id="text-msg" class="window-msg"></div>
		</div>
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
					<select id="action-type" style="width:300px">
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
						<option value="DDSequenceForever">Animación secuencial ininterrumpidamente</option>
					</select>
				</td>
			</tr>
			<tr class="action-param" id="tr-move-x">
				<td>Eje horizontal:</td>
				<td><input id="move-x" type="number" value="0" min="0" step="1" /></td>
			</tr>
			<tr class="action-param" id="tr-move-y">
				<td>Eje vertical</td>
				<td><input id="move-y" type="number" value="0" min="0" step="1" /></td>
			</tr>
			<tr class="action-param" id="tr-rotate">
				<td>Ángulo:</td>
				<td><input id="angle" type="number" value="0" min="0" step="1" /></td>
			</tr>
			<tr class="action-param" id="tr-scale-x">
				<td>Escala horizontal:</td>
				<td><input id="scale-x" type="number" value="0" min="0" step="0.1" /></td>	
			</tr>
			<tr class="action-param" id="tr-rotate">
				<td>Ángulo:</td>
				<td><input id="angle" type="number" value="0" min="0" step="1" /></td>
			</tr>
			<tr class="action-param" id="tr-scale-x">
				<td>Escala horizontal:</td>
				<td><input id="scale-x" type="number" value="0" min="0" step="0.1" /></td>	
			</tr>
			<tr class="action-param" id="tr-scale-y">
				<td>Escala vertical:</td>
				<td><input id="scale-y" type="number" value="0" min="0" step="0.1" /></td>
			</tr>
			<tr  class="action-param" id="tr-related">
				<td>Animación:</td>
				<td><select id="related-action"></select></td>
			</tr>
		
		</table>
		<div id="action-window-buttons">
			
			<button id="cancel-action-btn" class="button" >Cancelar</button>
			<button id="accept-action-btn" class="button">Aceptar</button>
			<div id="action-msg" class="window-msg"></div>
		</div>
	</div>
	
</body>	
</html>
