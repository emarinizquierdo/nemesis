package com.project.nemesis;

import org.apache.commons.fileupload.FileItemStream;
import org.apache.commons.fileupload.FileItemIterator;
import org.apache.commons.fileupload.FileUploadBase.SizeLimitExceededException;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.commons.io.IOUtils;
import org.apache.commons.io.FileUtils;

import com.google.appengine.api.blobstore.BlobInfo;
import com.google.appengine.api.blobstore.BlobInfoFactory;
import com.google.appengine.api.blobstore.BlobKey;
import com.google.appengine.api.blobstore.BlobstoreService;
import com.google.appengine.api.blobstore.BlobstoreServiceFactory;
import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.files.AppEngineFile;
import com.google.appengine.api.files.FileService;
import com.google.appengine.api.files.FileServiceFactory;
import com.google.appengine.api.files.FileWriteChannel;

import java.io.InputStream;
import java.io.IOException;
import java.io.PrintWriter;
import java.nio.ByteBuffer;
import java.nio.channels.Channels;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.logging.Logger;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class SaveFile extends HttpServlet {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private static final Logger logger = Logger
			   .getLogger(DownloadFile.class.getCanonicalName());
	private BlobstoreService blobstoreService = BlobstoreServiceFactory
			   .getBlobstoreService();
	private BlobKey blobKey;
			 
	private Logger LOGGER = Logger.getLogger( DownloadFile  .class
					   .getName());

	public void doPost(HttpServletRequest req, HttpServletResponse res)
			throws ServletException, IOException {
		try {		
			
			String plist = req.getParameter("plist");
			String fileName = req.getParameter("fileName");
			
			
			BlobstoreService blobstoreService = BlobstoreServiceFactory.getBlobstoreService();
		      Iterator<BlobInfo> iterator = null;
		      BlobInfo info = null;
		      iterator = new BlobInfoFactory().queryBlobInfos();
		  	
		      while(iterator.hasNext()){
		      	info = iterator.next(); 
		      	if(fileName.toString().equals(info.getFilename().toString())){
		      		blobstoreService.delete(info.getBlobKey());	
		      		break;
		      	}   
		      	
		      }    
		      
		      
			
	        
	        byte[] inFile = plist.getBytes();
	        	

			// Get a file service
			  FileService fileService = FileServiceFactory.getFileService();

			  // Create a new Blob file with mime-type "text/plain"
			  AppEngineFile file = fileService.createNewBlobFile("text/plain", fileName);

			  // Open a channel to write to it
			  boolean lock = true;						  
			  FileWriteChannel writeChannel = fileService.openWriteChannel(file, lock);

			  writeChannel.write(ByteBuffer.wrap(inFile));
			  writeChannel.closeFinally();
			 

				 // Now read from the file using the Blobstore API
			  BlobKey blobKey = fileService.getBlobKey(file);
			  BlobstoreService blobStoreService = BlobstoreServiceFactory.getBlobstoreService();
			  
	        
		} catch (Exception ex) {
			
			throw new ServletException(ex);
		}
	}
}