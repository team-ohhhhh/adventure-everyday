package com.ssafy.antenna.controller;

import com.ssafy.antenna.domain.ResultResponse;
import com.ssafy.antenna.service.AwsS3Service;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping("${API}/image")
public class AmazonS3Controller {

    private final AwsS3Service awsS3Service;

    @PostMapping
    public ResultResponse<String> uploadImage(@RequestPart MultipartFile multipartFile) {
        return ResultResponse.success(awsS3Service.uploadImage(multipartFile));
    }

    @DeleteMapping
    public ResultResponse<Void> deleteImage(@RequestParam String fileName) {
        awsS3Service.deleteImage(fileName);
        return ResultResponse.success(null);
    }
}
