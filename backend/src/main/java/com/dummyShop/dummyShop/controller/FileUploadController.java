package com.dummyShop.dummyShop.controller;

import com.dummyShop.dummyShop.service.FileUploadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
@RequestMapping("/api/files")
public class FileUploadController {
    @Autowired
    FileUploadService fileUploadService;

    @PostMapping
    public ResponseEntity<Map<String,Object>> uploadFile(
            @RequestParam("file")MultipartFile file
    ){
        return fileUploadService.uploadFile(file);
    }
}
