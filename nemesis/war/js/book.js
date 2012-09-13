function book(bookName){
	
	this.bookName = bookName || "";
	this.versionEngine = "";
	this.openingScene = "";
	this.btnNextImage = "";
	this.btnPrevImage = "";
	this.mainBgMusic = "";
	this.openingScene = "";
	this.scenes = [];
	this.showBoundingBox = false;
	
	/*
	 *  scene constructor
	 */
	function scene(){
		
		this.showNextBtn = false;
		this.showPrevBtn = false;
		this.actors = {};
		
		/*
		 *  actor constructor
		 */
		function actor(){
			
			this.uid = "";
			this.image = "";
			this.angle = "";
			this.draggable = false;
			this.touchable = false;
			this.zindex = "";
			this.height = "";
			this.width = "";
			this.top = "";
			this.left = "";
			this.scaleX = "";
			this.scaleY = "";
			this.anchor = false;
			this.actors = {};	
			
			this.addActor = _addActor;
			return this;
		}//end actor constructor
		
		function _addActor(actorName, where){
			
			if (actorName){
				var newActor = {};
				newActor[actorName] = new actor();
				$.extend(this.actors, newActor);
				
				return this.actors[actorName];
			}
			else {
				console.log('BOOK.JS: error in _addActor()')
				return false;
			}
		}
		
		this.addActor = _addActor;
		return this;
	}//end scene constructor
	
	
	function _addScene(sceneName){
		
		if (sceneName){
			var newScene = {};
			newScene[sceneName] = new scene();
			//$.extend(this.scenes, newScene);
			this.scenes.push (newScene);
			
			return newScene[sceneName]
		}
		else {
			console.log('BOOK.JS: error in _addScene()')
			return false;	
		}
	}
	
	this.addScene = _addScene;
	return this;
}