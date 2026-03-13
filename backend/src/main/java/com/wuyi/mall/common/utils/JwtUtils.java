package com.wuyi.mall.common.utils;

import io.jsonwebtoken.Claims; // 👈 修复1：补充了 Claims 的导入
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtUtils {
    
    // 👈 修复2：统一了密钥，加密解密都用这一个，必须足够长否则 HS256 算法会报错
    private static final String SECRET_KEY = "WuYiMall_SecretKey_D_Version_2024_MustBeLongEnough";
    
    // 过期时间：7天
    private static final long EXPIRATION_TIME = 7 * 24 * 60 * 60 * 1000L;

    /**
     * 生成 Token
     */
    public String generateToken(Long userId, String username, Integer role) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("userId", userId);
        claims.put("username", username);
        claims.put("role", role);

        return Jwts.builder()
                .setClaims(claims) // 设置载荷
                .setIssuedAt(new Date()) // 签发时间
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME)) // 过期时间
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY) // 使用统一定义的 SECRET_KEY
                .compact();
    }

    /**
     * 解析 Token
     */
    // 👈 修复3：去掉了 static 关键字，保持与 Spring Component 实例的统一
    public Claims parseToken(String token) {
        return Jwts.parser()
                .setSigningKey(SECRET_KEY) // 使用统一定义的 SECRET_KEY
                .parseClaimsJws(token)
                .getBody();
    }

    public Long getUserIdFromToken(String token) {
        return parseToken(token).get("userId", Long.class);
    }

    public Integer getRoleFromToken(String token) {
        return parseToken(token).get("role", Integer.class);
    }
}