package org.edwith.webbe.reservation.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.edwith.webbe.reservation.dto.FileInfo;
import org.edwith.webbe.reservation.service.CommentsService;
import org.edwith.webbe.reservation.service.FilesService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class CommentApiController {

	private Logger logger = LoggerFactory.getLogger(this.getClass());
	
    private final CommentsService commentsService;
    private final FilesService filesService;

    @GetMapping("/comments")
    @ApiOperation(value = "댓글 목록", notes = "댓글 목록 구하기")
    public Map<String, Object> getComments(
    		@ApiParam(value = "프로덕트 아이디") @RequestParam(required = false) Integer productId,
            @ApiParam(value = "시작지점") @RequestParam(required = false) Integer start) {
        return commentsService.getComments(productId, start);
    }
    
    @PostMapping("/comments")
    @ApiOperation(value = "댓글 등록", notes = "댓글 등록하기")
    public HashMap<String, String> postComments(
    		HttpServletRequest request,
    		@ApiParam(value = "reservationInfoId") @RequestParam Integer reservationInfoId,
    		@ApiParam(value = "score") @RequestParam Integer score,
    		@ApiParam(value = "comment") @RequestParam String comment,
    		@ApiParam(value = "file") @RequestPart(required = false) MultipartFile file
		){
    	
    	HashMap<String, String> result = new HashMap<>();
    	HttpSession session = request.getSession(false);
    	String email = (String) session.getAttribute("email");
    	
    	if(email == null) {
            result.put("result", "fail");
            return result;
    	}
    	
    	if(file == null) {
    		try {
        		commentsService.postComments(reservationInfoId, score, email, comment);
        		result.put("result", "success");
    		}catch (Exception e) {
                result.put("result", "fail");
			}
    	} else {
    		String path = "/img/";
	    	File Folder = new File(path);
	    	
	    	if (!Folder.exists()) {
	    		try{
	    		    Folder.mkdir();
	    		    logger.info("폴더가 생성되었습니다.");
	    	    }catch(Exception e){
	    		    e.getStackTrace();
	    		}        
	        }else {
	        	logger.info("이미 폴더가 생성되어 있습니다.");
	    	}
	    	
	    	try(
	            FileOutputStream fos = new FileOutputStream(path + file.getOriginalFilename());
	            InputStream is = file.getInputStream();
	        )
	        {
	    	    int readCount = 0;
	    	    byte[] buffer = new byte[1024];
	            while((readCount = is.read(buffer)) != -1){
	                fos.write(buffer,0,readCount);
	            }
	            String fileName = file.getOriginalFilename();
	            
	    		commentsService.postComments(reservationInfoId, score, email, comment, fileName);
	            result.put("result", "success");
	        }catch(Exception ex){
	            result.put("result", "fail");
	        }
    	}
    	
    	return result;
    }

    @GetMapping("/files/{fileId}")
    @ApiOperation(value = "이미지 다운로드", notes = "이미지 다운로드하기")
    public void fileDownload(HttpServletResponse response, @PathVariable("fileId") Integer fileId) {
    	
    	FileInfo fileInfo = filesService.files(fileId);
    	String fileName = fileInfo.getFileName();
		String saveFileName = "/" + fileInfo.getSaveFileName(); 
		String contentType = fileInfo.getContentType();
		
        response.setHeader("Content-Disposition", "attachment; filename=\"" + fileName + "\";");
        response.setHeader("Content-Transfer-Encoding", "binary");
        response.setHeader("Content-Type", contentType);
        response.setHeader("Pragma", "no-cache;");
        response.setHeader("Expires", "-1;");
        
        try(
            FileInputStream fis = new FileInputStream(saveFileName);
            OutputStream out = response.getOutputStream();
        ){
    	    int readCount = 0;
    	    byte[] buffer = new byte[1024];
            while((readCount = fis.read(buffer)) != -1){
            		out.write(buffer,0,readCount);
            }
        }catch(Exception ex){
            throw new RuntimeException("file Save Error");
        }
    }

}
