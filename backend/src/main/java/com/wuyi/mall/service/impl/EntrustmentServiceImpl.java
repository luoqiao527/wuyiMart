package com.wuyi.mall.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.wuyi.mall.entity.Entrustment;
import com.wuyi.mall.mapper.EntrustmentMapper;
import com.wuyi.mall.service.AIIntegrationService;
import com.wuyi.mall.service.EntrustmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.concurrent.CompletableFuture;

@Service
public class EntrustmentServiceImpl implements EntrustmentService {

    @Autowired
    private EntrustmentMapper entrustmentMapper;

    @Autowired
    private AIIntegrationService aiIntegrationService;

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void submitEntrustment(Entrustment entrustment, Long userId) {
        // 1. 初始化基础数据
        entrustment.setUserId(userId);
        entrustment.setStatus(0); // 0-待处理
        entrustment.setCreatedAt(LocalDateTime.now());
        // 刚提交时匹配度未知，暂留空
        entrustment.setRealValue(null);

        // 2. 先存入数据库，获取自增 ID (这一步极快，保证前端能瞬间收到成功响应)
        entrustmentMapper.insert(entrustment);

        // 3. 异步调用 AI 大模型计算图文匹配度并回写数据库
        CompletableFuture.runAsync(() -> {
            try {
                // 调用我们在第三阶段预留的 AI 服务接口
                // （注意：您需要在 AIIntegrationService 中补充此方法，利用大模型多模态能力分析图片和文本的匹配度）
                Double matchValue = aiIntegrationService.calculateImageTextMatch(

                        entrustment.getItemDesc(), 
                        entrustment.getImages()
                );
                
                // 将计算出的匹配度更新回该条委托记录中
                Entrustment updateRecord = new Entrustment();
                updateRecord.setId(entrustment.getId());
                updateRecord.setRealValue(matchValue);
                entrustmentMapper.updateById(updateRecord);
                
            } catch (Exception e) {
                // 生产环境中这里应替换为 log.error 记录日志
                System.err.println("AI 异步计算图文匹配度失败: " + e.getMessage());
            }
        });
    }

    @Override
    public Page<Entrustment> getUserEntrustments(Long userId, int pageNum, int pageSize) {
        Page<Entrustment> page = new Page<>(pageNum, pageSize);
        LambdaQueryWrapper<Entrustment> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(Entrustment::getUserId, userId)
                    .orderByDesc(Entrustment::getId);
        return entrustmentMapper.selectPage(page, queryWrapper);
    }

    @Override
    public Page<Entrustment> getMerchantEntrustments(Long merchantId, Integer status, int pageNum, int pageSize) {
        Page<Entrustment> page = new Page<>(pageNum, pageSize);
        LambdaQueryWrapper<Entrustment> queryWrapper = new LambdaQueryWrapper<>();
        // 仅查询指派给该商家的委托
        queryWrapper.eq(Entrustment::getMerchantId, merchantId);
        if (status != null) {
            queryWrapper.eq(Entrustment::getStatus, status);
        }
        queryWrapper.orderByDesc(Entrustment::getId);
        return entrustmentMapper.selectPage(page, queryWrapper);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void auditEntrustment(Long id, Long merchantId, Integer status, String replyMsg) {
        Entrustment entrustment = entrustmentMapper.selectById(id);
        if (entrustment == null) {
            throw new RuntimeException("委托记录不存在！");
        }
        // 越权校验
        if (!merchantId.equals(entrustment.getMerchantId())) {
            throw new RuntimeException("无权操作他人的委托！");
        }
        if (entrustment.getStatus() != 0) {
            throw new RuntimeException("该委托已被处理过！");
        }

        entrustment.setStatus(status);
        entrustment.setReplyMsg(replyMsg);
        entrustmentMapper.updateById(entrustment);
    }
}