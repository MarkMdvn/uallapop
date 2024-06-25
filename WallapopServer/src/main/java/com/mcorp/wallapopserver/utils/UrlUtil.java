package com.mcorp.wallapopserver.utils;

import java.io.File;
import java.util.List;
import java.util.stream.Collectors;

public class UrlUtil {

  private static final String BASE_URL = "http://localhost:9192/images/";

  public static List<String> createImageUrls(List<String> filePaths) {
    return filePaths.stream()
        .map(path -> BASE_URL + new File(path).getName())
        .collect(Collectors.toList());
  }

  public static String createImageUrl(String filePath) {
    File file = new File(filePath);
    String fileName = file.getName();
    String parentDirName = file.getParentFile().getName(); // This gets the '7' in '.../ProductImages/7/'

    // Return the URL incorporating the product ID directory and the file name
    return BASE_URL + parentDirName + "/" + fileName;
  }
}