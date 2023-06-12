import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import "../../style/css/registration.css"
import { Button, message, Modal, Input, Col, Divider, Row, Form, Descriptions, Table } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { getHistoryCase, getHistoryCompany, setAssessResult } from '../../service/api';
import insureTypeReplace from '../../utils/insureTypeReplace';
import store from '../../Redux/store';
import { getRegiInfo, getDishonesty } from '../../service/api';
import receiptTypeReplace from '../../utils/receiptTypeReplace'
import dishonestyReplace from '../../utils/dishonsetyReplace'



dayjs.extend(customParseFormat);

export default function Assessment() {
    const navigateTo = useNavigate()
    const [sameTypeData, setSameTypeData] = useState([])
    const [companyData, setCompanyData] = useState([])
    const [isSameType, setIsSameType] = useState("")
    const [isCompany, setIsCompany] = useState("")
    const [isBtnDisabled, setIsBtnDisabled] = useState()
    const [isDishonesty, setIsDishonesty] = useState()
    const [dishonestyData, setDishonestyData] = useState([])
    const [unpassRemark, setUnpassRemark] = useState("")
    const style = {
        // background: '#0092ff',
        // padding: '4px 0',
    };
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = (e) => {
        setIsModalOpen(true);
    };
    const handleOk = (e) => {
        setIsModalOpen(false);
        setAssessStatus(e, 0)
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const [info, setInfo] = useState({
        city: "",
        collectionAccount: "",
        dateOfBirth: "",
        declarationTime: "",
        designatedHospitalStatus: 0,
        eventDescription: "",
        expirationTime: "",
        hospitalName: "",
        hospitalizationStatus: 0,
        id: 0,
        identityCard: "",
        insurancePeriod: "",
        insureType: 0,
        name: "",
        payeeCity: "",
        payeeName: "",
        payeePhone: "",
        payeeSex: 0,
        paymentMethod: 0,
        phone: "",
        policyNumber: "",
        reimbursementAmount: 0,
        reimbursementCompany: "",
        reimbursementNumber: "",
        sex: 0,
        receiptInfo: {
            receiptType: "",
            receiptMoney: ""
        }
    })


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
            title: '报销金额（元）',
            dataIndex: 'reimbursementAmount',
            key: 'reimbursementAmount',
        },
    ];
    const dishonestyColumns = [
        {
            title: '失信时间',
            dataIndex: 'dishonestyTime',
        },
        {
            title: '失信原因',
            dataIndex: 'dishonestyReason',
        },
        {
            title: '失信类型',
            dataIndex: 'dishonestyType',
        },
        {
            title: '解除时间',
            dataIndex: 'releaseTime',
        }
    ];
    useEffect(() => {
        getInfo()
        getHistoryInfo()
        setBtnDisabled()
        getDishonestyInfo()
    }, [])
    const getHistoryInfo = async () => {
        let result = await getHistoryCase(store.getState().insurantId)
        if (result.code == 200) {
            setSameTypeData(result.data)
            result.data.length > 0 ? setIsSameType("是") : setIsSameType("否")
        } else {
        }
        let result2 = await getHistoryCompany(store.getState().insurantId)
        if (result2.code == 200) {
            setCompanyData(result2.data)
            console.log("res", result2.data);
            result2.data.length > 0 ? setIsCompany("是") : setIsCompany("否")
        } else {
        }
    }
    const setAssessStatus = async (e, status) => {
        console.log("unpassRemark", unpassRemark);
        let result = await setAssessResult({ id: store.getState().caseId, status, reason: status == 1 ? "" : unpassRemark })
        if (result.code == 200) {
            message.success("提交成功", [3])
            navigateTo("/home/processing")
        } else {
            message.error("提交失败", [3])
        }
    }
    const setBtnDisabled = () => {
        switch (store.getState().role) {
            case "登记员":
                setIsBtnDisabled(true)
                break;
            case "管理员":
                setIsBtnDisabled(false)
                break;
            case "评估员":
                setIsBtnDisabled(false)
                break;
            case "报销员":
                setIsBtnDisabled(true)
                break;
            default:
                break;
        }
    }
    const getInfo = async () => {
        let result = await getRegiInfo(store.getState().caseId)
        if (result.code == 200) {
            setInfo(result.data)
        }
    }
    const inputRemark = (e) => {
        setUnpassRemark(e.target.value)
    }
    const getDishonestyInfo = async () => {
        let result = await getDishonesty(store.getState().insurantId)
        if (result.code == 200) {
            if (result.data.length != 0) {
                setDishonestyData(dishonestyReplace(result.data))
                setIsDishonesty("是")
            } else {
                setIsDishonesty("否")

            }
        }
    }
    return (
        <div>
            <Divider orientation="left" className="dividerStyle">报销人信息</Divider>
            <Descriptions bordered>
                <Descriptions.Item label="姓名：">{info.name}</Descriptions.Item>
                <Descriptions.Item label="性别：">{info.sex == 1 ? "男" : "女"}</Descriptions.Item>
                <Descriptions.Item label="出生年月：">{info.dateOfBirth}</Descriptions.Item>
                <Descriptions.Item label="所在城市：">{info.city}</Descriptions.Item>
                <Descriptions.Item label="手机号：">{info.phone}</Descriptions.Item>
                <Descriptions.Item label="身份证号：">{info.identityCard}</Descriptions.Item>
                <Descriptions.Item label="参保时间：">
                    {info.insurancePeriod}
                </Descriptions.Item>
                <Descriptions.Item label="到期时间：">{info.expirationTime}</Descriptions.Item>
                <Descriptions.Item label="医保类型：">{insureTypeReplace(info.insureType)}</Descriptions.Item>
            </Descriptions>
            <Divider orientation="left" className="dividerStyle">医院信息</Divider>
            <Descriptions bordered>
                <Descriptions.Item label="医院名：">{info.hospitalName}</Descriptions.Item>
                <Descriptions.Item label="是否为定点医院：">{info.designatedHospitalStatus == 1 ? "是" : "否"}</Descriptions.Item>
                <Descriptions.Item label="是否住院：">{info.hospitalizationStatus == 1 ? "是" : "否"}</Descriptions.Item>
            </Descriptions>
            <Divider orientation="left" className="dividerStyle">事件信息</Divider>
            <Descriptions bordered>
                <Descriptions.Item label="事件时间：">{info.declarationTime}</Descriptions.Item>
                <Descriptions.Item label="事件描述：">{info.eventDescription}</Descriptions.Item>
                <Descriptions.Item label="收据项目">{receiptTypeReplace(info.receiptInfo.receiptType)}</Descriptions.Item>
                <Descriptions.Item label="收据金额">{info.receiptInfo.receiptMoney}元</Descriptions.Item>
            </Descriptions>
            <Divider orientation="left" className="dividerStyle">历史信息</Divider>
            <Form>
                <Row gutter={[16, 5]}>
                    <Col className="gutter-row" span={24}>
                        <div style={style}>
                            <Form.Item label="以前是否报销过同类保险" style={{ textAlign: 'left' }}>
                                <span>{isSameType}</span>
                            </Form.Item>
                        </div>
                    </Col>

                </Row>
                {isSameType == "否" ? "" : <Row gutter={[16, 5]}>
                    <Col className="gutter-row" span={24}>
                        <div style={style}>
                            <Form.Item label="其他公司历史保单信息" >
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
                </Row>}
                <Row gutter={[16, 5]}>
                    <Col className="gutter-row" span={12}>
                        <div style={style}>
                            <Form.Item label="本公司是否有报销记录" style={{ textAlign: 'left' }}>
                                <span>{isCompany}</span>
                            </Form.Item>
                        </div>
                    </Col>

                </Row>
                {isCompany == "否" ? "" : <Row gutter={[16, 5]}>
                    <Col className="gutter-row" span={24}>
                        <div style={style}>
                            <Form.Item label="本公司历史保单信息" >
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
                </Row>}
            </Form>
            <Row gutter={[16, 5]}>
                <Col className="gutter-row" span={12}>
                    <div style={style}>
                        <Form.Item label="是否有失信记录:" style={{ textAlign: 'left' }}>
                            <span>{isDishonesty}</span>
                        </Form.Item>
                    </div>
                </Col>

            </Row>
            {isDishonesty == "否" ? "" : <Row gutter={[16, 5]}>
                <Col className="gutter-row" span={24}>
                    <div style={style}>
                        <Form.Item label="失信记录" >
                            <Table columns={dishonestyColumns}
                                dataSource={dishonestyData}
                                bordered="true"
                                style={{
                                    border: "1px solid #d9d9d9",
                                    borderRadius: "6px"
                                }}
                            />
                        </Form.Item>
                    </div>
                </Col>
            </Row>}
            <Row gutter={[16, 5]}>
                <Col className="gutter-row" span={24}>
                    <div style={style}>
                        <Form.Item label="评估建议" style={{ textAlign: 'left' }} >
                            <span style={{ fontWeight: 'bold' }}>{isDishonesty == "是" ? "不通过" : "通过"}</span>
                        </Form.Item>
                    </div>
                </Col>
            </Row>
            <Divider orientation="left" className="dividerStyle">
            </Divider>
            <Row gutter={16}>
                <Col className="gutter-row" span={4}>
                    <div style={style}>
                        <Button
                            type="primary"
                            onClick={e => setAssessStatus(e, 1)}
                            disabled={isBtnDisabled}
                        >通过</Button>
                    </div>
                </Col>
                <Col className="gutter-row" span={4}>
                    <div style={style}>
                        <Button
                            type="primary"
                            onClick={e => showModal(e)}
                            disabled={isBtnDisabled}

                        >不通过</Button>
                    </div>
                </Col>
            </Row>
            <Modal title="不通过备注" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Input placeholder="请输入备注" onChange={e => inputRemark(e)} />
            </Modal>
        </div>
    )
}
