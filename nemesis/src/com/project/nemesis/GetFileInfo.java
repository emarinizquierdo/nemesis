package com.project.nemesis;

import com.google.appengine.api.blobstore.BlobInfo;
import com.google.appengine.api.blobstore.BlobInfoFactory;
import com.google.appengine.api.blobstore.BlobstoreService;
import com.google.appengine.api.blobstore.BlobstoreServiceFactory;

import java.io.IOException;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class GetFileInfo extends HttpServlet {

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
        		res.getWriter().print("{ key : \"" + info.getBlobKey().getKeyString() + "\" }");
        	}
        	
	        while(iterator.hasNext()){
	        	info = iterator.next();
	        	res.getWriter().print(", ");
	        	res.getWriter().print("{ key : \"" + info.getBlobKey().getKeyString() + "\" }");
	        	
	        }
		        
						
			res.getWriter().print("]");
	        
	        
		}catch (Exception ex) {

				throw new ServletException(ex);
		}
	}
}