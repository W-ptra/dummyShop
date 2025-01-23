package com.dummyShop.dummyShop.utils;

import com.azure.storage.blob.BlobClient;
import com.azure.storage.blob.BlobClientBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Component
public class AzureBlobStorage {
    @Value("${azure.storage.sas-url}")
    private String sasUrl;

    @Value("${azure.storage.container-name}")
    private String containerName;

    @Value("${azure.storage.sas-token}")
    private String sasToken;

    public String upload(String name, MultipartFile file) throws IOException {
        String blobUrl = sasUrl + containerName + "/" + name + "?" + sasToken;
        BlobClient blobClient = new BlobClientBuilder()
                .endpoint(blobUrl)
                .buildClient();

        blobClient.upload(file.getInputStream(), file.getSize(), true);

        return "https://evant.blob.core.windows.net/dummyshop/" + name;
    }
}
