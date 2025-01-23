package com.dummyShop.dummyShop.controller;

import com.dummyShop.dummyShop.service.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.core.io.Resource;

import java.util.Map;

@RestController
@RequestMapping("/api/files")
public class FileUploadController {
    @Autowired
    FileService fileService;

    @PostMapping
    public ResponseEntity<Map<String,Object>> uploadFile(
            @RequestParam("file")MultipartFile file
    ){
        return fileService.uploadFile(file);
    }
}
