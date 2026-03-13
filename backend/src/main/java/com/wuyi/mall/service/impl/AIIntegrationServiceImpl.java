package com.wuyi.mall.service.impl;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.wuyi.mall.service.AIIntegrationService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AIIntegrationServiceImpl implements AIIntegrationService {

    // 从 application.yml 中读取通义千问的 API Key
    @Value("${ai.dashscope.api-key}")
    private String apiKey;

    // 通义千问文本生成 API 端点
    private static final String API_URL = "https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation";
    
    // 使用的模型版本，qwen-turbo 速度快且性价比高，适合电商文本处理
    private static final String MODEL = "qwen-turbo";

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();

    

    @Override
    public String translateProductDetail(String description) {
        String prompt = "请将以下电商商品详情翻译成英文，要求专业、准确、符合海外电商平台的表达习惯。请直接输出翻译结果，不要包含任何多余的解释说明：\n" + description;
        return callQwenModel(prompt);
    }

    @Override
    public String summarizeProductDetail(String description) {
        String prompt = "你是一个电商平台的资深运营专家。请提取以下商品详情的核心卖点和基础信息，生成一段吸引人的商品简介，严格限制在100字以内。请直接输出简介文本，不要包含任何多余的解释：\n" + description;
        return callQwenModel(prompt);
    }

    @Override
    public Double calculateImageTextMatch(String description, String imagesJson) {
        // TODO: 后续可接入支持多模态（识图）的大模型。这里暂时返回一个高匹配度的随机数模拟 AI 运算结果
        return 0.85 + Math.random() * 0.14; 
    }


    /**
     * 核心私有方法：调用通义千问 API
     */
    private String callQwenModel(String userPrompt) {
        try {
            // 1. 设置请求头
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBearerAuth(apiKey);

            // 2. 构建请求体 (遵循 DashScope 的 message 格式)
            Map<String, Object> requestBody = new HashMap<>();
            requestBody.put("model", MODEL);


            // 构建 messages 列表
            List<Map<String, String>> messages = new ArrayList<>();
            // 系统角色提示词 (System Prompt)，用于约束 AI 的行为
            messages.add(Map.of("role", "system", "content", "你是一个专业、高效的电商平台AI运营助手。必须严格遵守用户的输出格式要求。"));
            // 用户输入 (User Prompt)
            messages.add(Map.of("role", "user", "content", userPrompt));

            Map<String, Object> input = new HashMap<>();
            input.put("messages", messages);
            requestBody.put("input", input);

            // 指定返回格式为 message
            Map<String, Object> parameters = new HashMap<>();
            parameters.put("result_format", "message");
            requestBody.put("parameters", parameters);

            // 3. 发送 HTTP POST 请求
            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);
            ResponseEntity<String> response = restTemplate.postForEntity(API_URL, entity, String.class);

            // 4. 解析响应 JSON
            JsonNode rootNode = objectMapper.readTree(response.getBody());
            JsonNode messageNode = rootNode.path("output").path("choices").get(0).path("message").path("content");
            
            if (messageNode.isMissingNode()) {
                throw new RuntimeException("AI大模型返回格式异常");
            }

            return messageNode.asText().trim();

        } catch (Exception e) {
            // 实际生产中可以记录日志 (log.error)，或者返回一个默认的兜底文本
            throw new RuntimeException("调用 AI 大模型失败: " + e.getMessage(), e);
        }
    }
}