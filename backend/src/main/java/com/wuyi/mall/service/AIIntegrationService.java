package com.wuyi.mall.service;

/**
 * AI 大模型能力接入服务接口
 */
public interface AIIntegrationService {

    /**
     * 商品详情自动英译
     * @param description 中文商品详情
     * @return 英文商品详情
     */
    String translateProductDetail(String description);

    /**
     * 一键生成商品简介缩写
     * @param description 完整的商品详情
     * @return 缩写后的商品简介 (通常限制在100字以内)
     */
    String summarizeProductDetail(String description);

    /**
     * 计算图文匹配度
     */
    Double calculateImageTextMatch(String description, String imagesJson);
    
}