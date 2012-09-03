$(document).ready(function(){
	
	$('#exportBtn').click(function(){
		
		var book = tree2book();
		if (book){
			var plist = json2plist(book);
			
//			var uriContent = "data:application/octet-stream," + encodeURIComponent(plist);
//			location.href = uriContent
			
			var bb = new BlobBuilder;
			bb.append(plist);
			saveAs(bb.getBlob("text/plain;charset=utf-8"), "my_first_book.xml");
		}
	});
})