package com.mcorp.wallapopserver.services;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FileStorageService {

  private String uploadDir = "D:\\Development\\Fullstack_Projects\\Wallapop2\\WallapopAssets\\ProductImages";

  public List<String> storeFiles(MultipartFile[] files, Long productId) throws IOException {
    List<String> filePaths = new ArrayList<>();
    if (files.length > 5) {
      throw new IllegalStateException("Cannot upload more than 5 images.");
    }

    Path productFolder = Paths.get(uploadDir, String.valueOf(productId)).toAbsolutePath()
        .normalize();
    Files.createDirectories(productFolder); // Ensure the directory for the product exists

    for (MultipartFile file : files) {
      String fileName = StringUtils.cleanPath(file.getOriginalFilename());
      Path targetLocation = productFolder.resolve(fileName);
      Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
      filePaths.add(targetLocation.toString());
    }

    return filePaths;
  }
}
