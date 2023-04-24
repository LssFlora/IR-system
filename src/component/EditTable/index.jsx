import React, { useState } from 'react'
import { EditableProTable } from '@ant-design/pro-components';
import { Select } from 'antd';


const waitTime = (time = 100) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, time);
    });
};

export default function EditTable() {
    const [editableKeys, setEditableRowKeys] = useState([]);
    const [dataSource, setDataSource] = useState([]);
    const [position, setPosition] = useState('bottom');
    // 收据项目选择
    const receiptOptions = [
        {
            value: '西药费',
            label: '西药费',
        },
        {
            value: '中药费',
            label: '中药费',
        },
        {
            value: '检查费',
            label: '检查费',
        },
        {
            value: '化验费',
            label: '化验费',
        },
        {
            value: '卫生材料费',
            label: '卫生材料费',
        },
    ];

    const columns = [
        {
            title: '收据项目',
            key: 'receiptType',
            dataIndex: 'receiptType',
            // valueType: 'select',
            // valueEnum: {
            //     all: { text: '全部', status: 'Default' },
            //     open: {
            //         text: '未解决',
            //         status: 'Error',
            //     },
            //     closed: {
            //         text: '已解决',
            //         status: 'Success',
            //     },
            // },
            render: () => <Select
                mode="multiple"
                allowClear
                style={{ width: '100%' }}
                defaultValue={['a10', 'c12']}
                options={receiptOptions}
            // onChange={e => handleReceiptInfo(e)}
            />
        },
        {
            title: '描述',
            dataIndex: 'decs',
            fieldProps: (form, { rowKey, rowIndex }) => {
                if (form.getFieldValue([rowKey || '', 'title']) === '不好玩') {
                    return {
                        disabled: true,
                    };
                }
                if (rowIndex > 9) {
                    return {
                        disabled: true,
                    };
                }
                return {};
            },
        },
        {
            title: '活动时间',
            dataIndex: 'created_at',
            valueType: 'date',
        },
        {
            title: '操作',
            valueType: 'option',
            width: 200,
            render: (text, record, _, action) => [
                <a
                    key="editable"
                    onClick={() => {
                        action?.startEditable?.(record.id);
                    }}
                >
                    编辑
                </a>,
                <a
                    key="delete"
                    onClick={() => {
                        setDataSource(dataSource.filter((item) => item.id !== record.id));
                    }}
                >
                    删除
                </a>,
            ],
        },
    ];

    return (
        <div>
            <EditableProTable
                rowKey="id"
                maxLength={5}
                scroll={{
                    x: 960,
                }}
                recordCreatorProps={
                    position !== 'hidden'
                        ? {
                            position: 'top',
                            record: () => ({ id: (Math.random() * 1000000).toFixed(0) }),
                        }
                        : false
                }
                loading={false}
                columns={columns}
                value={dataSource}
                onChange={setDataSource}
                editable={{
                    type: 'multiple',
                    editableKeys,
                    onSave: async (rowKey, data, row) => {
                        console.log(rowKey, data, row);
                        await waitTime(2000);
                    },
                    onChange: setEditableRowKeys,
                }}
            />
        </div>
    );
}

