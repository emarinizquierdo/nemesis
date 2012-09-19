function book(bookName){
	
	this.bookName = bookName || "";
	this.versionEngine = $('#version-engine').text() || "";
	this.btnPrevImage = "";
	this.btnNextImage = "";
	this.mainBgMusic = "";
	this.openingScene = "";
	//this.scenes = [];
	//this.showBoundingBox = false;
	
	//scene icons
	var prev = $.trim( $('#prev-scene-icon').val() );
	var next = $.trim( $('#next-scene-icon').val() );
	if (prev != "" && prev.lastIndexOf('\\') != -1){
		prev = prev.substring(prev.lastIndexOf('\\')+1);
	}
	if (next != "" && next.lastIndexOf('\\') != -1){
		next = next.substring(next.lastIndexOf('\\')+1);
	}
	this.btnPrevImage = prev;
	this.btnNextImage = next;
	
	
	/*
	 *  scene constructor
	 */
	function scene(){
		
		this.showNextBtn = true;
		this.showPrevBtn = true;
		//this.actors = [];
		
		/*
		 *  actor constructor
		 */
		function actor(){
			
			//this.uid = "";
			//this.image = "";
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
			this.anchor = true;
			//this.actors = [];	
			
			this.addActor = _addActor;
			return this;
		}//end actor constructor
		
		function _addActor(actorName, where){
			
			if (actorName){
				var newActor = {};
				newActor[actorName] = new actor();
				//$.extend(this.actors, newActor);
				if (!this.actors){
					this.actors = [];
				}
				this.actors.push(newActor);
				
				return newActor[actorName];
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
			if(!this.scenes){
				this.scenes = [];
			}
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