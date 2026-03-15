package com.wuyi.mall.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.wuyi.mall.common.Result;
import com.wuyi.mall.entity.User;
import com.wuyi.mall.service.UserService;
import com.wuyi.mall.utils.JwtUtils;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtils jwtUtils;

    @GetMapping("/profile")
    public Result<User> getProfile(@RequestHeader("Authorization") String authHeader) {
        String token = authHeader.replace("Bearer ", "");
        Long userId = jwtUtils.getUserIdFromToken(token);
        User user = userService.getUserById(userId);
        user.setPassword(null);
        return Result.success("获取成功", user);
    }

    @PutMapping("/profile")
    public Result<User> updateProfile(@RequestHeader("Authorization") String authHeader,
                                       @RequestBody UpdateProfileRequest request) {
        String token = authHeader.replace("Bearer ", "");
        Long userId = jwtUtils.getUserIdFromToken(token);
        User user = new User();
        user.setAvatar(request.getAvatar());
        user.setPhone(request.getPhone());
        user.setEmail(request.getEmail());
        user.setRealName(request.getRealName());
        user.setIdCard(request.getIdCard());
        User updated = userService.updateUser(userId, user);
        updated.setPassword(null);
        return Result.success("更新成功", updated);
    }

    @PutMapping("/password")
    public Result<Void> updatePassword(@RequestHeader("Authorization") String authHeader,
                                       @RequestBody UpdatePasswordRequest request) {
        String token = authHeader.replace("Bearer ", "");
        Long userId = jwtUtils.getUserIdFromToken(token);
        userService.updatePassword(userId, request.getOldPassword(), request.getNewPassword());
        return Result.success("密码修改成功", null);
    }

    @GetMapping("/{id}")
    public Result<User> getUserById(@PathVariable Long id) {
        User user = userService.getUserById(id);
        user.setPassword(null);
        return Result.success("获取成功", user);
    }

    @PutMapping("/{id}/status")
    public Result<Void> updateUserStatus(@PathVariable Long id, @RequestBody UpdateStatusRequest request) {
        User user = new User();
        user.setId(id);
        user.setStatus(request.getStatus());
        userService.updateById(user);
        return Result.success("状态更新成功", null);
    }

    @GetMapping
    public Result<Page<User>> getUserList(@RequestParam(defaultValue = "1") Integer page,
                                          @RequestParam(defaultValue = "10") Integer size,
                                          @RequestParam(required = false) String username,
                                          @RequestParam(required = false) Integer role,
                                          @RequestParam(required = false) Integer status) {
        Page<User> pageParam = new Page<>(page, size);
        LambdaQueryWrapper<User> wrapper = new LambdaQueryWrapper<>();
        if (username != null && !username.isEmpty()) {
            wrapper.like(User::getUsername, username);
        }
        if (role != null) {
            wrapper.eq(User::getRole, role);
        }
        if (status != null) {
            wrapper.eq(User::getStatus, status);
        }
        wrapper.orderByDesc(User::getCreatedAt);
        Page<User> result = userService.page(pageParam, wrapper);
        result.getRecords().forEach(u -> u.setPassword(null));
        return Result.success("获取成功", result);
    }

    @Data
    public static class UpdateProfileRequest {
        private String avatar;
        private String phone;
        private String email;
        private String realName;
        private String idCard;
    }

    @Data
    public static class UpdatePasswordRequest {
        private String oldPassword;
        private String newPassword;
    }

    @Data
    public static class UpdateStatusRequest {
        private Integer status;
    }
}
