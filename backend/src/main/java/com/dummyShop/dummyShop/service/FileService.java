package com.dummyShop.dummyShop.service;

import com.azure.storage.blob.BlobClient;
import com.azure.storage.blob.BlobClientBuilder;
import com.dummyShop.dummyShop.utils.AzureBlobStorage;
import com.dummyShop.dummyShop.utils.ResponseEntityBuilder;
import com.dummyShop.dummyShop.utils.Validation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@Service
public class FileService {

    @Autowired
    ResponseEntityBuilder responseEntityBuilder;
    @Autowired
    Validation validation;
    @Autowired
    AzureBlobStorage azureBlobStorage;

    public ResponseEntity<Map<String, Object>> uploadFile(
            MultipartFile file
    ) {
        if (file.isEmpty()) {
            return responseEntityBuilder.createResponse(
                    400,
                    "error",
                    "file is empty"
            );
        }

        try {
            String uuid = UUID.randomUUID().toString();
            String originalFileName = file.getOriginalFilename();
            String extension = "";

            if (originalFileName == null || !originalFileName.contains(".")) {
                return responseEntityBuilder.createResponse(
                        400,
                        "error",
                        "invalid file"
                );
            }

            extension = originalFileName.substring(originalFileName.lastIndexOf("."));

            if (validation.isExtensionNotAllowed(extension)) {
                return responseEntityBuilder.createResponse(
                        400,
                        "error",
                        "File type not allowed"
                );
            }

            String uniqueFileName = uuid + extension;
            String url = azureBlobStorage.upload(uniqueFileName,file);

            return responseEntityBuilder.createResponse(
                    200,
                    "link",
                    url
            );
        } catch (IOException io) {
            io.printStackTrace();
            return responseEntityBuilder.createResponse(
                    500,
                    "error",
                    "something went wrong, uploading file failed"
            );
        }
    }
}
