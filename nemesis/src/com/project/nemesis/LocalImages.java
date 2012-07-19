package com.project.nemesis;

import java.io.File;
import java.io.IOException;
import javax.servlet.http.*;

@SuppressWarnings("serial")
public class LocalImages extends HttpServlet {
	
	public void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
				resp.setContentType("text/plain");
				
				String currentDir = System.getProperty("user.dir");
				File dir = new File(currentDir+"/resources/images");
				String[] ficheros = dir.list();				
				
				resp.getWriter().print("{\"images\":[");
				for (int x=0;x<ficheros.length-1;x++){
					resp.getWriter().print("{\"title\":\"" + ficheros[x] + "\",\"url\":\"/resources/images/" + ficheros[x] + "\"},");
				}
				if(ficheros.length > 0){
					resp.getWriter().print("{\"title\":\"" + ficheros[ficheros.length-1] + "\",\"url\":\"/resources/images/" + ficheros[ficheros.length-1] + "\"},");
				}
				resp.getWriter().print("]}");

	}
}


