package com.wuyi.mall.common.utils;

import com.aliyun.oss.OSS;
import com.aliyun.oss.OSSClientBuilder;
import com.aliyun.oss.model.ObjectMetadata;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;

/**
 * 后端B - 阿里云 OSS 上传工具类
 */
@Component
public class OssUtils {

    @Value("${aliyun.oss.endpoint}")
    private String endpoint;

    @Value("${aliyun.oss.access-key-id}")
    private String accessKeyId;

    @Value("${aliyun.oss.access-key-secret}")
    private String accessKeySecret;

    @Value("${aliyun.oss.bucket-name}")
    private String bucketName;

    /**
     * 上传文件到阿里云 OSS
     * @param file 前端传来的 MultipartFile 文件
     * @param folderName 存放在 OSS 的哪个文件夹下 (如: avatars, products, after-sales)
     * @return 返回上传成功后的文件公网访问 URL
     */
    public String uploadFile(MultipartFile file, String folderName) throws Exception {
        // 1. 获取原始文件名和后缀
        String originalFilename = file.getOriginalFilename();
        String extension = "";
        if (originalFilename != null && originalFilename.contains(".")) {
            extension = originalFilename.substring(originalFilename.lastIndexOf("."));
        }

        // 2. 生成新的唯一文件名 (UUID 去划线 + 时间戳 + 后缀)
        String newFileName = UUID.randomUUID().toString().replace("-", "") + extension;

        // 3. 按日期分目录管理 (例如：products/2023/10/25/xxx.jpg)
        String datePath = new SimpleDateFormat("yyyy/MM/dd").format(new Date());
        String objectName = folderName + "/" + datePath + "/" + newFileName;

        // 4. 创建 OSSClient 实例
        OSS ossClient = new OSSClientBuilder().build(endpoint, accessKeyId, accessKeySecret);

        try {
            InputStream inputStream = file.getInputStream();
            
            // 解决部分图片上传后在浏览器直接下载的问题 (设置正确的 Content-Type)
            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentType(file.getContentType());
            
            // 5. 执行上传请求
            ossClient.putObject(bucketName, objectName, inputStream, metadata);

            // 6. 拼接返回文件的公网 URL
            // 格式: https://{bucketName}.{endpoint}/{objectName}
            String url = "https://" + bucketName + "." + endpoint.replace("https://", "").replace("http://", "") + "/" + objectName;
            return url;

        } finally {
            if (ossClient != null) {
                // 关闭 OSSClient
                ossClient.shutdown();
            }
        }
    }
}