package com.wuyi.mall.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.wuyi.mall.entity.Favorite;

/**
 * 收藏模块业务接口
 */
public interface FavoriteService {

    /**
     * 添加收藏
     * @param userId 用户ID
     * @param productId 商品ID
     */
    void addFavorite(Long userId, Long productId);

    /**
     * 取消收藏
     * @param userId 用户ID
     * @param productId 商品ID
     */
    void removeFavorite(Long userId, Long productId);

    /**
     * 分页获取用户的收藏列表
     */
    Page<Favorite> getUserFavorites(Long userId, int pageNum, int pageSize);

    /**
     * 检查某个商品是否已被当前用户收藏 (用于商品详情页点亮红心)
     */
    boolean checkIsFavorited(Long userId, Long productId);
}