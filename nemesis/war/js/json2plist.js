function json2plist(o){

	function parseObj(o){
		
		var r = "";
		
		if($.isEmptyObject(o)){
			
			r += tab() + '<dict/>' + '\n';
		}
		else {
		
			r += tab() + '<dict>' + '\n';
			
			ntab++
			
			$.each(o, function(i,e){
				r += parseElement(i, e);
			});
			
			ntab--
			
			r += tab() + '</dict>' + '\n';
		}
		
		return r;
	}
	
	/*
	 * Elemento array que se quiere convertir a dict
	 */
	function parseArray(a){
		
		var r = "";
		r += tab() + '<dict>' + '\n';
		
		ntab++;
		
		$.each(a, function(i,e){

			//Las escenas vienen en un array para mantener el orden
			//A su vez cada posición del array contiene un objeto con la escena
			$.each(e, function(x, y){
				r += parseElement(x, y);
			})
		})
		
		ntab--;
		
		r += tab() + '</dict>' + '\n';
		
		return r;
	}
	
	function parseEvents(key, value){
		
		var r = "";
		
		r += tab() + '<key>' + key + '</key>' + '\n';
		r += tab() + '<array>' + '\n';
		
		ntab++;
		
		$.each(value, function(i, e){
			
			r += parseObj(e);
		})
		
		ntab--;
		
		r += tab() + '</array>' + '\n';
		
		return r;
	}
	
	function parseActions(a){
		
		var r = "";
		r += tab() + '<dict>' + '\n';
		
		ntab++;
		
		$.each(a, function(i, e){
			r += parseEvents(i, e);
		})
		
		ntab--;
		
		r += tab() + '</dict>' + '\n';
		
		return r;
	}
	
	function parseConfig(value){
	
		var r = "";
		
		r += tab() + '<array>' + '\n';
		
		ntab++;
		
		r += tab() + '<string>' + value + '</string>' +'\n';
		
		ntab--;
		
		r += tab() + '</array>' + '\n';
		
		return r;
	}
	
	function parseText(value){
		
		var r = "";
		
		r += tab() + '<key>' + 'paragraphs' + '</key>' + '\n';
		
		r += tab() + '<array>' + '\n';
		
		ntab++;
		
		r += tab() + '<string>' + value + '</string>' +'\n';
		
		ntab--;
		
		r += tab() + '</array>' + '\n';
		
		return r;
	}
	
	function parseElement(key, value){
		
		var r = "";
		
		//tratamiento especial de los textos
		if (key == "text"){
			r += parseText(value);
		}
		//las acciones van como un array en el plist
		else if (key == "actions"){
			
			r += tab() + '<key>' + key + '</key>' + '\n';
			r += parseActions(value);
		}
		//la configuración de las acciones va dentro de un array
		else if(key == "config"){
			
			r += tab() + '<key>' + key + '</key>' + '\n';
			r += parseConfig(value);
		}
		//tratamiento de arrays
		else if ($.isArray(value)){
				
			r += tab() + '<key>' + key + '</key>' + '\n';
			r += parseArray(value);
		}
		else {
			
			switch (typeof value){
			
				case "string":
					r += tab() + '<key>' + key + '</key>' + '\n';
					r += tab() + '<string>' + value + '</string>' +'\n';
					break;
					
				case "number":
					r += tab() + '<key>' + key + '</key>' + '\n';
					r += tab() + '<string>' + value + '</string>' +'\n';
					break;
					
				case "boolean": 
					r += tab() + '<key>' + key + '</key>' + '\n';
					r += tab() + '<' + value + '/>' + '\n';
					break;
					
				case "object":
					r += tab() + '<key>' + key + '</key>' + '\n';
					r += parseObj(value);
					break;
					
				case "function":
					break;
					
				default: 
					console.log('Tipo no reconocido en parseObj');
					break;
			}	
		}

		return r;
	}
	
	function tab(){
		
		var r = "";
		for (var i=0, l=ntab.length; i<ntab; i++){
			r += "\t";
		}
		return r;
	}
	
	var ntab = 0;
	var r = "";
	
	r += '<?xml version="1.0" encoding="UTF-8"?>';
	r += '\n';
	r += '<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">';
	r += '\n';
	r += '<plist version="1.0">';
	r += '\n';
	r += parseObj(o);
	r += '</plist>';
	r += '\n';
	
	return r
}

