package com.project.nemesis; 


import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.nio.channels.Channels;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;


import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


import com.google.appengine.api.blobstore.BlobInfo;
import com.google.appengine.api.blobstore.BlobInfoFactory;
import com.google.appengine.api.blobstore.BlobKey;
import com.google.appengine.api.blobstore.BlobstoreInputStream;
import com.google.appengine.api.blobstore.BlobstoreService;
import com.google.appengine.api.blobstore.BlobstoreServiceFactory;




public class DownloadFile extends HttpServlet {
	
 private static final Logger logger = Logger
   .getLogger(DownloadFile.class.getCanonicalName());
 private BlobstoreService blobstoreService = BlobstoreServiceFactory
   .getBlobstoreService();
 private BlobKey blobKey;


 private Logger LOGGER = Logger.getLogger( DownloadFile  .class
   .getName());


 public void doGet(HttpServletRequest req, HttpServletResponse res)
   throws IOException {  
  try {
	  
	  String fileName = req.getParameter("fileName");
	  
	  res.setContentType("application/force-download");
	  res.setHeader("Content-Transfer-Encoding", "binary");
	  res.setHeader("Content-Disposition", 
	  "attachment; filename= " + fileName + ".plist"); 
	  
	  BlobstoreService blobstoreService = BlobstoreServiceFactory.getBlobstoreService();
      Iterator<BlobInfo> iterator = null;
      BlobInfo info = null;
      iterator = new BlobInfoFactory().queryBlobInfos();
  	
      while(iterator.hasNext()){
      	info = iterator.next();        	
      	if(fileName.toString().equals(info.getFilename().toString())){
      		blobstoreService.serve(info.getBlobKey(), res);
      		break;
      	}        	
      }    
      
  } catch (Exception e) {
   String strCallResult = "FAIL: Excel Sheet Data Cannot be Uploaded";
   res.getWriter().println(
     strCallResult + "Exception : " + e.getMessage());
  }
 }


 public void doPost(HttpServletRequest req, HttpServletResponse res)
   throws IOException {
  doGet(req, res);
 }
}