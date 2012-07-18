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
	
	<%@ include file="libraries.html" %>
	
</head>
	
	
<body>
	
	<header>
		Cabecera herramienta
	</header>
	
	<div id="main">
	
		<div id="mainWrapper">
			
			<div id="splitterWrapper">
			    <div>	    	
			    	<div id="leftPanel">
			    		<div>
			    			
			    			<div id="treeview-left"></div>
			    			
			    			
			    		</div>
			    		<div>Area 2</div>
					</div>	    
			    </div>
			    <div>
			    	<div id="middlePanel">
			    		<div>Area 1</div>
			    		<div>Area 2</div>
					</div>	    	
			    </div>
			    <div>
			    	<div id="rightPanel">
			    		<div>Area 1</div>
			    		<div>Area 2</div>
					</div>
			    </div>
			</div>
		
		</div>	
		
	</div>
	
	<footer>
		Pie página
	</footer>
	
	
	
	
	<script type="text/javascript">
		
	mainPanel.init();

	leftTree.init();

	</script>
	
	
	
	
</body>	
</html>