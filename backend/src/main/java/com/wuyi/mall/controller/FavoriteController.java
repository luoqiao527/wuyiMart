package com.wuyi.mall.controller;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.wuyi.mall.common.result.Result;
import com.wuyi.mall.entity.Favorite;
import com.wuyi.mall.service.FavoriteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * 用户收藏模块接口
 */
@RestController
@RequestMapping("/api/user/favorites")
public class FavoriteController {

    @Autowired
    private FavoriteService favoriteService;

    /**
     * 添加关注/收藏
     */
    @PostMapping
    public Result<Void> addFavorite(@RequestBody Map<String, Long> params,
                                    @RequestHeader("X-User-Id") Long userId) {
        try {
            Long productId = params.get("productId");
            if (productId == null) {
                return Result.error("商品ID不能为空");
            }
            favoriteService.addFavorite(userId, productId);
            return Result.success();
        } catch (Exception e) {
            return Result.error(e.getMessage());
        }
    }

    /**
     * 取消关注/收藏
     */
    @DeleteMapping("/{productId}")
    public Result<Void> removeFavorite(@PathVariable Long productId,
                                       @RequestHeader("X-User-Id") Long userId) {
        try {
            favoriteService.removeFavorite(userId, productId);
            return Result.success();
        } catch (Exception e) {
            return Result.error(e.getMessage());
        }
    }

    /**
     * 获取我的关注列表 (分页)
     */
    @GetMapping
    public Result<Page<Favorite>> getUserFavorites(
            @RequestParam(defaultValue = "1") Integer pageNum,
            @RequestParam(defaultValue = "10") Integer pageSize,
            @RequestHeader("X-User-Id") Long userId) {
        
        return Result.success(favoriteService.getUserFavorites(userId, pageNum, pageSize));
    }

    /**
     * 检查是否已关注 (供商品详情页加载时使用)
     */
    @GetMapping("/check/{productId}")
    public Result<Boolean> checkFavorite(@PathVariable Long productId,
                                         @RequestHeader("X-User-Id") Long userId) {
        
        return Result.success(favoriteService.checkIsFavorited(userId, productId));
    }
}