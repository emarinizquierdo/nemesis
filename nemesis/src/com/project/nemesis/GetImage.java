package com.project.nemesis;

import java.io.IOException;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.appengine.api.blobstore.BlobInfo;
import com.google.appengine.api.blobstore.BlobInfoFactory;
import com.google.appengine.api.blobstore.BlobKey;
import com.google.appengine.api.blobstore.BlobstoreService;
import com.google.appengine.api.blobstore.BlobstoreServiceFactory;

@SuppressWarnings("serial")
public class GetImage extends HttpServlet {
    private BlobstoreService blobstoreService = BlobstoreServiceFactory.getBlobstoreService();

	public void doGet(HttpServletRequest req, HttpServletResponse res)
	    throws IOException {
		
		BlobstoreService blobstoreService = BlobstoreServiceFactory.getBlobstoreService();
        Iterator<BlobInfo> iterator = null;
        BlobInfo info = null;
        iterator = new BlobInfoFactory().queryBlobInfos();
    	
        while(iterator.hasNext()){
        	info = iterator.next();        	
        	if(req.getParameter("fileName").toString().equals(info.getFilename().toString())){
        		blobstoreService.serve(info.getBlobKey(), res);
        		break;
        	}        	
        }       
	}     
}