package org.edwith.webbe.securityReservation.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.security.Principal;
import java.sql.SQLDataException;
import java.text.ParseException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

import org.edwith.webbe.securityReservation.dto.FileInfo;
import org.edwith.webbe.securityReservation.dto.RegisteredReservationInfo;
import org.edwith.webbe.securityReservation.dto.ReservationInfo;
import org.edwith.webbe.securityReservation.dto.User;
import org.edwith.webbe.securityReservation.service.CategoriesService;
import org.edwith.webbe.securityReservation.service.CommentsService;
import org.edwith.webbe.securityReservation.service.DisplayinfosService;
import org.edwith.webbe.securityReservation.service.FilesService;
import org.edwith.webbe.securityReservation.service.PromotionsService;
import org.edwith.webbe.securityReservation.service.ReservationInfosService;
import org.edwith.webbe.securityReservation.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ReservationApiController {
    private final CategoriesService categoriesService;
    private final DisplayinfosService displayinfosService;
    private final PromotionsService promotionService;
    private final CommentsService commentsService;
    private final ReservationInfosService reservationInfosService;
    private final UserService userService;
    private final FilesService filesService;
    
    @GetMapping("/categories")
    @ApiOperation(value = "카테고리 목록", notes = "카테고리 목록 구하기")
    public Map<String, Object> categories() {
        return categoriesService.getCategories();
    }

    @GetMapping("/displayinfos")
    @ApiOperation(value = "상품 목록", notes = "상품 목록 구하기")
    public Map<String, Object> displayinfos(
            @ApiParam(value = "카테고리 아이디") @RequestParam(required = false) Integer categoryId,
            @ApiParam(value = "시작지점") @RequestParam(required = false) Integer start) {
        return displayinfosService.getDisplayinfos(categoryId, start);
    }

    @GetMapping("/promotions")
    @ApiOperation(value = "프로모션 목록", notes = "프로모션 목록 구하기")
    public Map<String, Object> promotions() {
        return promotionService.getPromotions();
    }

    @GetMapping("/displayinfos/{displayId}")
    @ApiOperation(value = "카테고리 전시 정보", notes = "카테고리 전시 정보 구하기")
    public Map<String, Object> displayinfosDisplayId(@PathVariable Integer displayId) {
        return displayinfosService.getDisplayinfosById(displayId);
    }

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
    		Principal principal, 
    		@ApiParam(value = "reservationInfoId") @RequestParam("reservationInfoId") Integer reservationInfoId,
    		@ApiParam(value = "score") @RequestParam("score") Integer score,
    		@ApiParam(value = "comment") @RequestParam("comment") String comment,
    		@ApiParam(value = "file") @RequestParam("file") MultipartFile file
    		){
        String userId = principal.getName();
        User user = userService.getUserByEmail(userId);
    	HashMap<String, String> result = new HashMap<>();
    	String path = "c:/img";
    	File Folder = new File(path);
    	if (!Folder.exists()) {
    		try{
    		    Folder.mkdir(); //폴더 생성합니다.
    		    System.out.println("폴더가 생성되었습니다.");
    	    }catch(Exception e){
    		    e.getStackTrace();
    		}        
        }else {
    		System.out.println("이미 폴더가 생성되어 있습니다.");
    	}
    	try(
            // 맥일 경우 
            //FileOutputStream fos = new FileOutputStream("/img/" + file.getOriginalFilename());
            // 윈도우일 경우
            FileOutputStream fos = new FileOutputStream("c:/img/" + file.getOriginalFilename());
            InputStream is = file.getInputStream();
        )
        {
    	    int readCount = 0;
    	    byte[] buffer = new byte[1024];
            while((readCount = is.read(buffer)) != -1){
                fos.write(buffer,0,readCount);
            }
            String fileName = file.getOriginalFilename();
    		commentsService.postComments(reservationInfoId, score, user.getId(), comment, fileName);
            result.put("result", "success");
        }catch(Exception ex){
            result.put("result", "fail");
        }
    	return result;
    }

    @GetMapping("/reservationInfos")
    @ApiOperation(value = "예약 정보", notes = "예약 정보 구하기")
    public HashMap<String, Object> reservationInfos(Principal principal){
        String loginId = principal.getName();
        User user = userService.getUserByEmail(loginId);
        return reservationInfosService.getReservationInfos(user.getId().intValue());
    }
    
    @PostMapping("/reservationInfos")
    @ApiOperation(value = "예약", notes = "예약하기")
    public RegisteredReservationInfo reservation(@RequestBody HashMap<String, Object> reservationInfo) throws ParseException {
        
        return reservationInfosService.reservation(reservationInfo);
    }

    @PutMapping("/reservationInfos")
    @ApiOperation(value = "예약취소", notes = "예약 취소하기")
    public HashMap<String, String> cancelReservation(@RequestBody HashMap<String, Object> cancelReservationId) {
        HashMap<String, String> result = new HashMap<>();
        try {
            reservationInfosService.cancelReservation((Integer) cancelReservationId.get("id"));
            result.put("result", "success");
        } catch (SQLDataException e) {
            result.put("result", "fail");
        }
        return result;
    }


    @GetMapping("/files/{fileId}")
    @ApiOperation(value = "이미지 다운로드", notes = "이미지 다운로드하기")
    public void fileDownload(HttpServletResponse response, @PathVariable("fileId") Integer fileId) {
    	
    	FileInfo fileInfo = filesService.files(fileId);
    	
    	String fileName = fileInfo.getFileName();
		String saveFileName = "c:/" + fileInfo.getSaveFileName(); 
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
