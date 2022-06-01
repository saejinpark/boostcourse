<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<% 
	response.sendRedirect(
		"http://" + 
		request.getServerName() + ":" + 
		request.getServerPort() + 
		request.getContextPath() + "/" + 
		"swagger-ui.html"
	);
%>