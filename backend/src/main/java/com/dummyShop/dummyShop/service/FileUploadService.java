package com.dummyShop.dummyShop.service;

import com.dummyShop.dummyShop.utils.ResponseEntityBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.*;

@Service
public class FileUploadService {

    @Value("${upload.directory}")
    private String uploadDirectory;
    @Autowired
    ResponseEntityBuilder responseEntityBuilder;

    public ResponseEntity<Map<String,Object>> uploadFile(
            MultipartFile file
    ){
        if(file.isEmpty()){
            return responseEntityBuilder.createResponse(
                    400,
                    "error",
                    "file is empty"
            );
        }

        try{
            String uuid = UUID.randomUUID().toString();
            String originalFileName = file.getOriginalFilename();
            String extension = "";

            if(originalFileName == null || !originalFileName.contains(".")){
                return responseEntityBuilder.createResponse(
                        400,
                        "error",
                        "invalid file"
                );
            }

            extension = originalFileName.substring(originalFileName.lastIndexOf("."));

            List<String> allowedExtension = new ArrayList<>();
            allowedExtension.add("png");
            allowedExtension.add("jpeg");
            allowedExtension.add("jpg");

            if (!allowedExtension.contains(extension)) {
                return responseEntityBuilder.createResponse(
                        400,
                        "error",
                        "File type not allowed"
                );
            }

            String uniqueFileName = uuid + extension;

            File destination = new File(
                    uploadDirectory +
                            File.separator +
                            "product" +
                            File.separator +
                            uniqueFileName
            );

            destination.getParentFile().mkdirs();
            file.transferTo(destination);
            //uniqueFileName = "/"
            return responseEntityBuilder.createResponse(
                    200,
                    "link",
                    uniqueFileName
            );
        } catch (IOException io){
            return responseEntityBuilder.createResponse(
                    500,
                    "error",
                    "something went wrong, uploading file failed"
            );
        }

    }
}
