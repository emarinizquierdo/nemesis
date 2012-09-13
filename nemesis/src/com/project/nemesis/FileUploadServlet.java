package com.project.nemesis;

import org.apache.commons.fileupload.FileItemStream;
import org.apache.commons.fileupload.FileItemIterator;
import org.apache.commons.fileupload.FileUploadBase.SizeLimitExceededException;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.commons.io.IOUtils;

import com.google.appengine.api.blobstore.BlobKey;
import com.google.appengine.api.blobstore.BlobstoreService;
import com.google.appengine.api.blobstore.BlobstoreServiceFactory;
import com.google.appengine.api.files.AppEngineFile;
import com.google.appengine.api.files.FileService;
import com.google.appengine.api.files.FileServiceFactory;
import com.google.appengine.api.files.FileWriteChannel;

import java.io.InputStream;
import java.io.IOException;
import java.io.PrintWriter;
import java.nio.ByteBuffer;
import java.nio.channels.Channels;
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
						
						out.println("--------------");
						out.println("fileName = " + fileName);
						out.println("field name = " + fieldName);
						out.println("contentType = " + contentType);

						String fileContents = null;
						try {
							//fileContents = IOUtils.toString(in);
							inFile = IOUtils.toByteArray(in);
							out.println(inFile.length);
						} finally {
							IOUtils.closeQuietly(in);
						}
						
						

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
						  
					}
				}
			} catch (SizeLimitExceededException e) {
				out.println("You exceeded the maximu size ("
						+ e.getPermittedSize() + ") of the file ("
						+ e.getActualSize() + ")");
			}
		} catch (Exception ex) {

			throw new ServletException(ex);
		}
	}
}