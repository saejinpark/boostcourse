package org.edwith.webbe.reservation.controller;

import java.io.ByteArrayOutputStream;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.List;

import org.edwith.webbe.reservation.dto.ProductImage;
import org.edwith.webbe.reservation.service.ProductImagesService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class ProductImageController {
	private final ProductImagesService productImagesService;

	@ResponseBody
	@GetMapping(value = "productImages/{productId}/{productImageId}", produces = { "image/bmp", "image/gif",
			"image/jpeg", "image/png", "image/svg+xml", "image/tiff", "image/webp" })
    @ApiOperation(value = "상품 이미지", notes = "상품 이미지 구하기")
	public byte[] productImage(@PathVariable Integer productId, @PathVariable Integer productImageId) {
		ProductImage productImage = productImagesService.getProductImageById(productImageId);

		FileInputStream fis = null;
		ByteArrayOutputStream baos = new ByteArrayOutputStream();
		try {
			fis = new FileInputStream("/" + productImage.getSaveFileName());
		}catch (FileNotFoundException e) {
			e.printStackTrace();
		}
		
		int readCount = 0;
		byte[] buffer = new byte[1024];
		byte[] fileArray = null;
		
		try{
        	while((readCount = fis.read(buffer)) != -1){
            		baos.write(buffer,0,readCount);
            }
        	
        	fileArray = baos.toByteArray();
        	fis.close();
        	baos.close();
        	
        }catch(IOException e){
            throw new RuntimeException("file Error");
        }
        
        return fileArray;
	}
	
	@ResponseBody
	@GetMapping(value = "productImages/{productId}", produces = { "image/bmp", "image/gif",
			"image/jpeg", "image/png", "image/svg+xml", "image/tiff", "image/webp" })
    @ApiOperation(value = "상품 이미지", notes = "상품 이미지 구하기")
	public byte[] productImageById(@PathVariable Integer productId, @RequestParam String type) throws IOException {
		
		List<ProductImage> productImages = null;
		
		if (type.equals("th")) {
			productImages = productImagesService.getProductImagesByProductIdByType(productId, type);
		}else {
			productImages = productImagesService.getProductImagesByProductId(productId);
		}
		
		ProductImage productImage = productImages.get(0);
		
		FileInputStream fis = null;
		ByteArrayOutputStream baos = new ByteArrayOutputStream();
		try {
			fis = new FileInputStream("/" + productImage.getSaveFileName());
		}catch (FileNotFoundException e) {
			e.printStackTrace();
		}
		
		int readCount = 0;
		byte[] buffer = new byte[1024];
		byte[] fileArray = null;
		
		try{
        	while((readCount = fis.read(buffer)) != -1){
            		baos.write(buffer,0,readCount);
            }
        	
        	fileArray = baos.toByteArray();
        	fis.close();
        	baos.close();
        	
        }catch(IOException e){
            throw new RuntimeException("file Error");
        }
        
        return fileArray;
	}
}
