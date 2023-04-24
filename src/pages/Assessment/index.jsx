import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import "../../style/css/registration.css"
import { Button, message, InputNumber, Col, Divider, Row, Input, Form, Select, DatePicker, Cascader, Descriptions, Space, Table, Tag } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { getHistoryCase, getHistoryCompany, setAssessResult } from '../../service/api';
import store from '../../Redux/store';

dayjs.extend(customParseFormat);
const { TextArea } = Input;

export default function Assessment() {
    const navigateTo = useNavigate()
    const [sameTypeData, setSameTypeData] = useState()
    const [companyData, setCompanyData] = useState()
    const [isSameType, setIsSameType] = useState("否")
    const [isCompany, setIsCompany] = useState("否")
    const [isDisabled, setIsDisabled] = useState(true)
    const style = {
        // background: '#0092ff',
        // padding: '4px 0',
    };
    const monthFormat = 'YYYY/MM';
    const dateFormat = 'YYYY/MM/DD';


    const sameTypeColumns = [
        {
            title: '报销时间',
            dataIndex: 'declarationTime',
            key: 'declarationTime',
        },
        {
            title: '事件概述',
            dataIndex: 'eventDescription',
            key: 'eventDescription',
        },
        {
            title: '报销金额',
            dataIndex: 'reimbursementAmount',
            key: 'reimbursementAmount',
        },
        {
            title: '报销公司',
            dataIndex: 'reimbursementCompany',
            key: 'reimbursementCompany',
        },
    ];
    const myCompanyColumns = [
        {
            title: '报销时间',
            dataIndex: 'declarationTime',
            key: 'declarationTime',
        },
        {
            title: '事件概述',
            dataIndex: 'eventDescription',
            key: 'eventDescription',
        },
        {
            title: '报销金额',
            dataIndex: 'reimbursementAmount',
            key: 'reimbursementAmount',
        },
    ];
    useEffect(() => {
        getHistoryInfo()
    }, [])
    const getHistoryInfo = async () => {
        let result = await getHistoryCase(store.getState().insurantId)
        if (result.code == 200) {
            // message.success("获取成功", [3])
            // console.log("历史信息", result.data);
            setSameTypeData(result.data)
            result.data.length > 0 ? setIsSameType("是") : setIsSameType("否")
        } else {
            // message.error("获取失败！", [3])
        }
        let result2 = await getHistoryCompany(store.getState().insurantId)
        if (result2.code == 200) {
            // message.success("获取公司历史信息成功", [3])
            setCompanyData(result2.data)
            result.data.length > 0 ? setIsCompany("是") : setIsCompany("否")
        } else {
            // message.error("获取公司历史信息失败！", [3])
        }
    }
    const setAssessStatus = async (e, status) => {
        let result = await setAssessResult({ id: store.getState().caseId, status })
        if (result.code == 200) {
            message.success("提交成功", [3])
            console.log("通过成功", result.data);
            navigateTo("/home/processing")
        } else {
            message.error("提交失败", [3])
        }
    }
    return (
        <div>
            <Divider orientation="left" className="dividerStyle">历史信息</Divider>
            <Form>
                <Row gutter={[16, 5]}>
                    <Col className="gutter-row" span={24}>
                        <div style={style}>
                            <Form.Item label="以前是否报销过同类保险">
                                <Select
                                    disabled={isDisabled}
                                    value={isSameType}
                                    style={{
                                        width: 120,
                                        float: "left"
                                    }}
                                    //   onChange={handleChange}
                                    options={[
                                        {
                                            value: '是',
                                            label: '是',
                                        },
                                        {
                                            value: '否',
                                            label: '否',
                                        },
                                    ]}
                                />
                            </Form.Item>
                        </div>
                    </Col>

                </Row>
                <Row gutter={[16, 5]}>
                    <Col className="gutter-row" span={24}>
                        <div style={style}>
                            <Form.Item label="历史保单信息" >
                                <Table columns={sameTypeColumns}
                                    dataSource={sameTypeData}
                                    bordered="true"
                                    style={{
                                        border: "1px solid #d9d9d9",
                                        borderRadius: "6px"
                                    }}
                                />
                            </Form.Item>
                        </div>
                    </Col>
                </Row>
                <Row gutter={[16, 5]}>
                    {/* <Col className="gutter-row" span={12}>
                        <div style={style}>
                            <Form.Item label="第一次购买本公司产品">
                                <Select
                                    value={isCompany}
                                    style={{
                                        width: 120,
                                        float: "left"
                                    }}
                                    //   onChange={handleChange}
                                    options={[
                                        {
                                            value: '是',
                                            label: '是',
                                        },
                                        {
                                            value: '否',
                                            label: '否',
                                        },
                                    ]}
                                />
                            </Form.Item>
                        </div>
                    </Col> */}
                    <Col className="gutter-row" span={12}>
                        <div style={style}>
                            <Form.Item label="本公司是否有报销记录">
                                <Select
                                    value={isCompany}
                                    disabled={isDisabled}
                                    style={{
                                        width: 120,
                                        float: "left"
                                    }}
                                    //   onChange={handleChange}
                                    options={[
                                        {
                                            value: '是',
                                            label: '是',
                                        },
                                        {
                                            value: '否',
                                            label: '否',
                                        },
                                    ]}
                                />
                            </Form.Item>
                        </div>
                    </Col>

                </Row>
                <Row gutter={[16, 5]}>
                    <Col className="gutter-row" span={24}>
                        <div style={style}>
                            <Form.Item label="历史保单信息" >
                                <Table columns={myCompanyColumns}
                                    dataSource={companyData}
                                    bordered="true"
                                    style={{
                                        border: "1px solid #d9d9d9",
                                        borderRadius: "6px"
                                    }}
                                />
                            </Form.Item>
                        </div>
                    </Col>
                </Row>
            </Form>
            <Divider orientation="left" className="dividerStyle">
            </Divider>
            <Row gutter={16}>
                <Col className="gutter-row" span={4}>
                    <div style={style}>
                        <Button type="primary" onClick={e => setAssessStatus(e, 1)}>通过</Button>
                    </div>
                </Col>
                <Col className="gutter-row" span={4}>
                    <div style={style}>
                        <Button type="primary" onClick={e => setAssessStatus(e, 0)}>不通过</Button>
                    </div>
                </Col>
            </Row>
        </div>
    )
}
