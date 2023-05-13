import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import store from '../../Redux/store';
import "../../style/css/registration.css"
import { Button, message, Col, Divider, Row, Input, Form, Select, DatePicker, Descriptions, Space, Table, Tag } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { reqUserInfo, uploadRegiForm } from '../../service/api';
import userInfoReplace from '../../utils/userInfoReplace';
import md5 from 'js-md5';
React.Component.prototype.$md5 = md5;

dayjs.extend(customParseFormat);
const { TextArea } = Input;

export default function Registration(props) {
    const location = useLocation();
    const navigateTo = useNavigate()
    const style = {}
    const [regiForm, setRegiForm] = useState({
        recepitInfoVoList: [{
            "receiptMoney": "",
            "receiptType": ""
        }],
    })
    const [phone, setPhone] = useState()
    const [userInfo, setUserInfo] = useState({})
    useEffect(() => {
        setRegiForm({ ...regiForm, insurantId: userInfo.id })
        console.log("store.getState().isNewRegi", store.getState().isNewRegi);
        store.getState().isNewRegi ? console.log("222") : getAutoUserInfo();
    }, [userInfo.id])
    // 日期选择格式
    const dateFormat = 'YYYY/MM/DD';
    // 收据项目选择
    const receiptOptions = [
        {
            value: '1',
            label: '西药费',
        },
        {
            value: '2',
            label: '中药费',
        },
        {
            value: '3',
            label: '检查费',
        },
        {
            value: '4',
            label: '化验费',
        },
        {
            value: '5',
            label: '卫生材料费',
        },
    ];
    // 手机号获取用户信息
    const getUserInfo = async () => {
        // console.log("idCard", idCard);
        let result = await reqUserInfo(phone)
        if (result.code == 200) {
            console.log("useInfo", result.data);
            message.success("查询成功！", [3])
            setUserInfo(userInfoReplace(result.data))
        } else {
            message.error("查询失败", [3])
        }
    }
    // 手机号自动获取用户信息
    const getAutoUserInfo = async () => {
        let result = await reqUserInfo(store.getState().telephone)
        if (result.code == 200) {
            console.log("useInfo", result.data);
            // message.success("获取成功！", [3])
            setUserInfo(userInfoReplace(result.data))
        } else {
            // message.error("获取失败", [3])
        }
    }
    // 收集input框信息
    const handleInputChange = (e) => {
        const { value } = e.target
        switch (e.target.getAttribute("id")) {
            case "phone":
                setPhone(value);
                break;
            case "hospitalName":
                setRegiForm({ ...regiForm, hospitalName: value })
                break;
            case "eventDescription":
                setRegiForm({ ...regiForm, eventDescription: value })
                break;
            case "receiptMoney":
                setRegiForm({ ...regiForm, recepitInfoVoList: [{ ...regiForm.recepitInfoVoList[0], receiptMoney: value * 1 }] })
                break;
            default:
                break;
        }
    }
    const DesignateSelectChange = (e) => {
        setRegiForm({ ...regiForm, designatedHospitalStatus: e == "是" ? 1 : 0 })
    }
    const beInSelectChange = (e) => {
        setRegiForm({ ...regiForm, hospitalizationStatus: e == "是" ? 1 : 0 })
    }
    const receiptSelectChange = (e) => {
        setRegiForm({ ...regiForm, recepitInfoVoList: [{ ...regiForm.recepitInfoVoList[0], receiptType: e.join() }] })
    }
    // 收集日期选择框信息
    const handleDateChange = (e) => {
        console.log("data e", e);
        setRegiForm({ ...regiForm, declarationTime: `${e.$y}-${e.$M + 1}-${e.$D}` })

    }
    const submitRegiForm = async () => {
        console.log("submit regiForm", regiForm);
        if (!userInfo.id) {
            message.error("请先获取用户信息！")
        } else {
            let result = await uploadRegiForm({ ...regiForm, status: 1 })
            if (result.code == 200) {
                message.success("提交成功！", [3])
                navigateTo("/home/processing")
            } else {
                message.error("提交失败！", [3])

            }
        }
    }
    return (
        <div>
            <Divider orientation="left" className="dividerStyle">报销人信息</Divider>
            <Form>
                <Row gutter={[16, 5]}>
                    <Col className="gutter-row" span={8}>
                        <div style={style}>
                            <Form.Item label="请输入手机号：" id="phone">
                                <Input
                                    placeholder='回车获取用户信息'
                                    onChange={e => handleInputChange(e)}
                                    id="phone"
                                    onPressEnter={getUserInfo}
                                    disabled={!store.getState().isNewRegi}
                                />
                            </Form.Item>
                        </div>
                    </Col>

                </Row>
                <Row gutter={[16, 5]}>
                    <Descriptions bordered labelStyle={{ padding: "16px 16px", boxSizing: "content-box" }}>
                        <Descriptions.Item label="姓名：" value={userInfo.name}>{userInfo.name}</Descriptions.Item>
                        <Descriptions.Item label="性别：" value={userInfo.sex}>{userInfo.sex}</Descriptions.Item>
                        <Descriptions.Item label="联系方式：" value={userInfo.phone}>{userInfo.phone}</Descriptions.Item>
                        <Descriptions.Item label="身份证号:" value={userInfo.identityCard}>{userInfo.identityCard}</Descriptions.Item>
                        <Descriptions.Item label="出生年月：" value={userInfo.birthDate} >{userInfo.dateOfBirth}</Descriptions.Item>
                        <Descriptions.Item label="所在城市：" value={userInfo.city}>{userInfo.city}</Descriptions.Item>
                        <Descriptions.Item label="参保时间：" value={userInfo.insureTime}>{userInfo.insurancePeriod}
                        </Descriptions.Item>
                        <Descriptions.Item label="到期时间：" value={userInfo.expireTime}>{userInfo.expirationTime}</Descriptions.Item>
                        <Descriptions.Item label="医保类型：" value={userInfo.insureType}>{userInfo.insureType}</Descriptions.Item>
                    </Descriptions>
                </Row>
                {/* <Row gutter={[16, 5]}>
                    <Col className="gutter-row" span={6}>
                        <div style={style}>
                            <Form.Item label="姓名：">
                                <Input />
                            </Form.Item>
                        </div>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <div style={style}>
                            <Form.Item label="性别：">
                                <Select
                                    defaultValue="女"
                                    style={{
                                        width: 120,
                                        float: "left"
                                    }}
                                    //   onChange={handleChange}
                                    options={[
                                        {
                                            value: '男',
                                            label: '男',
                                        },
                                        {
                                            value: '女',
                                            label: '女',
                                        },
                                    ]}
                                />
                            </Form.Item>
                        </div>
                    </Col>
                </Row> */}


                <Divider orientation="left" className="dividerStyle" style={{ margin: "0 0 16px 0" }}>医院信息</Divider>
                <Row
                    gutter={[16, 5]}
                >
                    <Col className="gutter-row" span={8}>
                        <div style={style}>
                            <Form.Item label="医院名：">
                                <Input id='hospitalName' onChange={e => handleInputChange(e)} />
                            </Form.Item>
                        </div>
                    </Col>
                    <Col className="gutter-row" span={8}>
                        <div style={style}>
                            <Form.Item label="是否为定点医院">
                                <Select
                                    id='designatedHospitalStatus'
                                    defaultValue="否"
                                    style={{
                                        width: 120,
                                        float: "left"
                                    }}
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
                                    onChange={e => DesignateSelectChange(e)}
                                />
                            </Form.Item>
                        </div>
                    </Col>
                    <Col className="gutter-row" span={8}>
                        <div style={style}>
                            <Form.Item label="是否住院：">
                                <Select
                                    defaultValue="否"
                                    id='hospitalizationStatus'
                                    style={{
                                        width: 120,
                                        float: "left"
                                    }}
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
                                    onChange={e => beInSelectChange(e)}
                                />
                            </Form.Item>
                        </div>
                    </Col>
                </Row>
                <Divider orientation="left" className="dividerStyle" style={{ margin: "0 0 16px 0" }}>事件信息</Divider>
                <Row gutter={[16, 5]}>
                    {/* <Col className="gutter-row" span={8}>
                        <div style={style}>
                            <Form.Item label="申请报销时间">
                                <DatePicker
                                    id='declarationTime'
                                    defaultValue={dayjs('2015/01/01', dateFormat)}
                                    format={dateFormat}
                                    onChange={e => handleDateChange(e)}
                                />
                            </Form.Item>
                        </div>
                    </Col> */}
                    <Col className="gutter-row" span={16}>
                        <div style={style}>
                            <Form.Item label="事件描述">
                                <TextArea
                                    placeholder="填写事件梗要"
                                    autoSize
                                    id='eventDescription'
                                    onChange={e => handleInputChange(e)}
                                />
                            </Form.Item>
                        </div>
                    </Col>
                    <Col className="gutter-row" span={12}>
                        <div style={style}>
                            <Form.Item label="收据项目" >
                                <Select
                                    mode="multiple"
                                    allowClear
                                    style={{
                                        width: '100%',
                                    }}
                                    id='receiptType'
                                    placeholder="请选择收据项目"
                                    onChange={e => receiptSelectChange(e)}
                                    options={receiptOptions}
                                />
                            </Form.Item>
                        </div>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <div style={style}>
                            <Form.Item label="总金额">
                                <Input
                                    prefix="￥"
                                    suffix="RMB"
                                    id="receiptMoney"
                                    onChange={e => handleInputChange(e)}
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
                        <Button type="primary" onClick={submitRegiForm}>提交</Button>
                    </div>
                </Col>
                {/* <Col className="gutter-row" span={4}>
                    <div style={style}>
                        <Button type="primary">保存</Button>
                    </div>
                </Col> */}
            </Row>
        </div>
    )
}
