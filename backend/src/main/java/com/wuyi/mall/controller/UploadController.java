package com.wuyi.mall.controller;

import com.wuyi.mall.common.result.Result;
import com.wuyi.mall.common.utils.OssUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

/**
 * 全局公共模块 - 文件上传接口
 */
@RestController
@RequestMapping("/api")
public class UploadController {

    @Autowired
    private OssUtils ossUtils;

    /**
     * 统一文件上传接口
     * @param file 前端传来的文件对象 (表单名必须为 file)
     * @param folder 文件夹分类，默认存入 common，可传 avatars / products 等
     * @return 文件的公网访问地址
     */
    @PostMapping("/upload")
    public Result<String> upload(
            @RequestParam("file") MultipartFile file,
            @RequestParam(value = "folder", defaultValue = "common") String folder) {
        
        // 校验文件是否为空
        if (file.isEmpty()) {
            return Result.error("上传文件不能为空");
        }

        // 校验文件大小 (单体限制，比如不能超过10MB，具体大小可在 application.yml 中配置全局拦截)
        long size = file.getSize();
        if (size > 10 * 1024 * 1024) {
            return Result.error("文件大小不能超过10MB");
        }

        try {
            // 调用工具类执行上传
            String url = ossUtils.uploadFile(file, folder);
            return Result.success(url);
        } catch (Exception e) {
            return Result.error("文件上传失败: " + e.getMessage());
        }
    }
}