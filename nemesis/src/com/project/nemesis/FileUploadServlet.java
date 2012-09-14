package com.project.nemesis;

import org.apache.commons.fileupload.FileItemStream;
import org.apache.commons.fileupload.FileItemIterator;
import org.apache.commons.fileupload.FileUploadBase.SizeLimitExceededException;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.commons.io.IOUtils;

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

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class FileUploadServlet extends HttpServlet {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public void doPost(HttpServletRequest req, HttpServletResponse res)
			throws ServletException, IOException {
		try {		
			
			ServletFileUpload upload = new ServletFileUpload();
			upload.setSizeMax(500000);
			res.setContentType("text/plain");
			PrintWriter out = res.getWriter();

			try {
				FileItemIterator iterator = upload.getItemIterator(req);
				while (iterator.hasNext()) {
					FileItemStream item = iterator.next();
					InputStream in = item.openStream();
					
					if (item.isFormField()) {
						out.println("Got a form field: " + item.getFieldName());
					} else {
						String fieldName = item.getFieldName();
						String fileName = item.getName();
						String contentType = item.getContentType();
						byte[] inFile;

						try {
							//fileContents = IOUtils.toString(in);
							inFile = IOUtils.toByteArray(in);
						} finally {
							IOUtils.closeQuietly(in);
						}
						
				        Iterator<BlobInfo> iterator2 = null;
				        BlobInfo info = null;
				        iterator2 = new BlobInfoFactory().queryBlobInfos();
				    	boolean file_exist = false;
				    	
				        while(iterator2.hasNext()){
				        	info = iterator2.next();        	
				        	if(fileName.equals(info.getFilename().toString())){
				        		file_exist = true;
				        		break;
				        	}        	
				        }
				        
				        if(!file_exist){

						// Get a file service
						  FileService fileService = FileServiceFactory.getFileService();

						  // Create a new Blob file with mime-type "text/plain"
						  AppEngineFile file = fileService.createNewBlobFile(contentType, fileName);

						  // Open a channel to write to it
						  boolean lock = true;						  
						  FileWriteChannel writeChannel = fileService.openWriteChannel(file, lock);

						  writeChannel.write(ByteBuffer.wrap(inFile));
						  writeChannel.closeFinally();
						 

							 // Now read from the file using the Blobstore API
						  BlobKey blobKey = fileService.getBlobKey(file);
						  BlobstoreService blobStoreService = BlobstoreServiceFactory.getBlobstoreService();
						    
						    out.print("{ OK : {");
							out.print(" \"fileName\" : \"" + fileName + "\", ");
							out.print(" \"url\" : \"/s/getfile?fileName=\"" + fileName + "\",");
							out.print(" \"contentType\" : \"" + contentType + "\" } }");
							
				        }else{
				        	 out.print("{ KO : {");
							out.print(" \"statusCode\" : \"1\", ");
							out.print(" \"statusInfo\" : \"image was on blobstore\" } }");
				        }
					}
				}
			} catch (SizeLimitExceededException e) {
				out.print("{ KO : {");
				out.print(" \"statusCode\" : \"2\", ");
				out.print(" \"statusInfo\" : \"You exceeded the maximu size\" (" + e.getPermittedSize() + ") of the file ("	+ e.getActualSize() + ") } }");
			}
	        
		} catch (Exception ex) {
			
			throw new ServletException(ex);
		}
	}
}