package com.wuyi.mall.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.wuyi.mall.entity.Favorite;
import com.wuyi.mall.mapper.FavoriteMapper;
import com.wuyi.mall.service.FavoriteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class FavoriteServiceImpl implements FavoriteService {

    @Autowired
    private FavoriteMapper favoriteMapper;

    @Override
    public void addFavorite(Long userId, Long productId) {
        // 先检查是否已经收藏过，避免违反唯一索引抛出异常
        if (checkIsFavorited(userId, productId)) {
            throw new RuntimeException("您已经收藏过该商品啦！");
        }

        Favorite favorite = new Favorite();
        favorite.setUserId(userId);
        favorite.setProductId(productId);
        favorite.setCreateTime(LocalDateTime.now());

        favoriteMapper.insert(favorite);
    }

    @Override
    public void removeFavorite(Long userId, Long productId) {
        LambdaQueryWrapper<Favorite> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(Favorite::getUserId, userId)
                    .eq(Favorite::getProductId, productId);
        
        favoriteMapper.delete(queryWrapper);
    }

    @Override
    public Page<Favorite> getUserFavorites(Long userId, int pageNum, int pageSize) {
        Page<Favorite> page = new Page<>(pageNum, pageSize);
        
        LambdaQueryWrapper<Favorite> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(Favorite::getUserId, userId)
                    .orderByDesc(Favorite::getCreateTime); // 按收藏时间倒序排列
        
        return favoriteMapper.selectPage(page, queryWrapper);
    }

    @Override
    public boolean checkIsFavorited(Long userId, Long productId) {
        LambdaQueryWrapper<Favorite> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(Favorite::getUserId, userId)
                    .eq(Favorite::getProductId, productId);
        
        return favoriteMapper.selectCount(queryWrapper) > 0;
    }
}