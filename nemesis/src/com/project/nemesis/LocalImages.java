package com.project.nemesis;

import com.google.appengine.api.blobstore.BlobInfo;
import com.google.appengine.api.blobstore.BlobInfoFactory;

import java.io.IOException;
import java.util.Iterator;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class LocalImages extends HttpServlet {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public void doGet(HttpServletRequest req, HttpServletResponse res)
			throws ServletException, IOException {
		try {
			
			res.setContentType("text/plain");
			res.getWriter().print("[");
			
	        Iterator<BlobInfo> iterator = null;
	        BlobInfo info = null;
	        iterator = new BlobInfoFactory().queryBlobInfos();
	       
	       
        	if(iterator.hasNext()){
        		info = iterator.next();
        		if("image/jpg".equals(info.getContentType().toString()) || "image/png".equals(info.getContentType().toString()) || "image/gif".equals(info.getContentType().toString()) || "image/jpeg".equals(info.getContentType().toString()))
        			res.getWriter().print("{ \"title\" : \"" + info.getFilename().toString() + "\", \"url\" : \"/s/getfile?fileName=" + info.getFilename().toString() + "\" }");
        	}
        	
	        while(iterator.hasNext()){
	        	info = iterator.next();
	        	if("image/jpg".equals(info.getContentType().toString()) || "image/png".equals(info.getContentType().toString()) || "image/gif".equals(info.getContentType().toString()) || "image/jpeg".equals(info.getContentType().toString())){
		        	res.getWriter().print(", ");
		        	res.getWriter().print("{ \"title\" : \"" + info.getFilename().toString() + "\", \"url\" : \"/s/getfile?fileName=" + info.getFilename().toString() + "\" }");
	        	}
	        }
		        
						
			res.getWriter().print("]");
	        
	        
		}catch (Exception ex) {

				throw new ServletException(ex);
		}
	}
}