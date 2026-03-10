import React, { useEffect, useState } from 'react';
import { Descriptions, Card, Button, Space, message, Modal, Input } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';

const MerchantAuditDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [detail, setDetail] = useState({});
    const [loading, setLoading] = useState(false);
    const [rejectModalVisible, setRejectModalVisible] = useState(false);
    const [rejectReason, setRejectReason] = useState('');

    useEffect(() => {
        // TODO: 根据 id 获取审核详情
        // axios.get(`/api/admin/merchants/${id}`).then(res => setDetail(res.data));
    }, [id]);

    const handleAudit = (isPass) => {
        if (!isPass && !rejectReason) return message.warning('请输入拒绝原因');

        setLoading(true);
        // TODO: 提交审核结果 API
        // axios.post(`/api/admin/merchants/audit`, { id, isPass, reason: rejectReason }).then(() => {
        //    message.success('审核处理完成');
        //    navigate('/admin/merchant-audit');
        // }).finally(() => setLoading(false));

        setTimeout(() => {
            message.success(isPass ? '已通过入驻' : '已驳回申请');
            navigate('/admin/merchant-audit');
        }, 500);
    };

    return (
        <Card title={`审核商家申请 - ID: ${id}`}>
            <Descriptions bordered column={2}>
                <Descriptions.Item label="真实姓名">{detail.realName}</Descriptions.Item>
                <Descriptions.Item label="账号名称">{detail.username}</Descriptions.Item>
                <Descriptions.Item label="手机号码">{detail.phone}</Descriptions.Item>
                <Descriptions.Item label="关联邮箱">{detail.email}</Descriptions.Item>
                <Descriptions.Item label="身份证号" span={2}>{detail.idCard}</Descriptions.Item>
                <Descriptions.Item label="身份证照片" span={2}>
                    <div style={{ width: 200, height: 120, background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999' }}>
                        [图片预留位]
                    </div>
                </Descriptions.Item>
            </Descriptions>

            <div style={{ marginTop: 30, textAlign: 'center' }}>
                <Space size="large">
                    <Button onClick={() => navigate(-1)}>返回</Button>
                    <Button danger onClick={() => setRejectModalVisible(true)}>驳 回</Button>
                    <Button type="primary" loading={loading} onClick={() => handleAudit(true)}>通 过</Button>
                </Space>
            </div>

            <Modal
                title="填写驳回原因"
                open={rejectModalVisible}
                onOk={() => handleAudit(false)}
                onCancel={() => setRejectModalVisible(false)}
                confirmLoading={loading}
            >
                <Input.TextArea rows={4} value={rejectReason} onChange={e => setRejectReason(e.target.value)} placeholder="请详细说明驳回原因..." />
            </Modal>
        </Card>
    );
};

export default MerchantAuditDetail;
