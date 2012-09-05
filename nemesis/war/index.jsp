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
	<script type="text/javascript" src="js/tree2book.js"></script>
	<script type="text/javascript" src="js/json2plist.js"></script>
	<script type="text/javascript" src="js/openBook.js"></script>
	
	<script src="js/main.js" type="text/javascript"></script>
	
</head>
	
	
<body>
	
	<header>
		<a id="openBookBtn">Abrir libro</a>
		<input id="exportBtn" type="button" value="Guardar libro" disabled	 />
	</header>
	
	<div id="main">
	
		<div id="mainWrapper">
			
			<div id="splitterWrapper">
			    <div>	    	
			    	<div id="leftPanel">
			    		<div>
			    						    			
			    			<div id="treeview-left"></div>			    			
			    			
			    		</div>
			    		<div>
			    		<div id="listView"></div>



    <div id="pager" class="k-pager-wrap">


    </div>
			    		
			    			<script type="text/x-kendo-tmpl" id="template">

        						<div class="localImage">
            						<img src="\${url}" alt="\${title} image" />
        						</div>

    						</script>


<button id="addImageLocalButton">Add</button>
<button id="removeImageLocalButton">Remove</button>




<div class="demo-description" style="display: none; ">
<p>Examples of the markup that can be used for buttons: A button element, an input of type submit and an anchor.</p>
</div><!-- End demo-description -->
						</div>
					</div>	    
			    </div>
			    <div>
			    	<div id="middlePanel">
			    		<div>
			    			<div id="canvasWrapper">
			    				<canvas id="mainCanvas" width="600" height="480"></canvas>
							</div>
			    		</div>
			    		<div>
			    			<div id="sceneButtonContainer">
			    				<button id="newSceneButton">New Scene</button>
			    				<button id="removeSceneButton">Remove Scene</button>
								<button id="snapshotButton">Take Snapshot</button>
			    			</div>
			    			
							
			    			<ul id="sceneList">
			    				<li><img id="imgSnapshot" src="" width=100  /></li>
			    			</ul>			    		
			    		</div>
					</div>	    	
			    </div>
			    <div>
			    	<div id="rightPanel">
			    		<div>	    			
			    			
			    			<div id="rightUpperTabStripp">
								<ul>
									<li class="k-state-active">
										Propiedades
									</li>
									<li>
										Acciones
									</li>
								</ul>
								<div>
			                        <div class="bodyTabStrip">
			                            Position:<br/>
							                <input id="sliderPositionX" class="positionX" /> <input id="numericPositionX" value="2" /><br/>							                
							                <input id="sliderPositionY" class="positionY" /> <input id="numericPositionY" value="2" /><br/>
							            Scale:							                    
							            	<input id="sliderScaleX" class="scaleX" />
							            	<input id="sliderScaleY" class="scaleY" /><br/>
							            
							            Angle:
							            	<input id="sliderAngle" class="angle" /> <input id="numericAngle" value="2" /><br/>
							            
							            Draggable <input id="checkboxDraggable" type="checkbox" value="false"/><br/>
							            Touchable <input id="checkboxTouchable" type="checkbox" value="false"/><br/>
							            Name <input id="inputName" type="text" value=""/><br/>
							            z-index <input id="zindex" type="text" value=""/><br/>
							           
			                        </div>									
								</div>
								<div>
			                        <div class="bodyTabStrip">
			                            
			                        </div>									
								</div>								
							</div>	
			    			
			    			
			    		</div>
			    		<div>
			    			
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
			    			
			    		</div>
					</div>
			    </div>
			</div>
		
		</div>	
		
	</div>
	
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
	
	
	
	
	<script type="text/javascript">
		
	mainPanel.init();

	leftTree.init();

	rightUpperTab.init();
	
	rightLowerTab.init();
	
	mainCanvas.init();
	
	imageSource.init();
	
	rightUpperSlidder.init();

	sceneList.init();
	
	</script>
	
	
	
	
</body>	
</html>