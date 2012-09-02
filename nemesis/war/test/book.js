function book(){
	
	this.bookName = "";
	this.btnNextImage = "";
	this.btnPrevImage = "";
	this.mainBgMusic = "";
	this.openingScene = "";
	this.scenes = {};
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
			
			this.image = "";
			this.margins = "";
			this.position = "";
			this.type = "";
			this.zIndex = "";
			this.draggable = false;
			this.touchable = false;
			this.anchor = false;
			this.childrens = {};	
			
			function _addChildren(childrenName){
				
				if (childrenName){
					var newActor = {};
					newActor[childrenName] = new actor();
					$.extend(this.childrens, newActor);
					return true;
				}
				else {
					console.log('BOOK.JS: error in _addChildren()')
					return false;
				}
			}
			
			this.addChildren = _addChildren;
			return this;
		}//end actor constructor
		
		function _addActor(actorName){
			
			if (actorName){
				var newActor = {};
				newActor[actorName] = new actor();
				$.extend(this.actors, newActor);
				return true;
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
			$.extend(this.scenes, newScene);
			
			return true;
		}
		else {
			console.log('BOOK.JS: error in _addScene()')
			return false;	
		}
	}
	
	this.addScene = _addScene;
	return this;
}