import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import store from '../../Redux/store';
import "../../style/css/registration.css"
import { Button, InputNumber, Col, Divider, Row, Input, Form, Select, Cascader, message } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import cityData from "../../utils/cityData"
import { getPayAmount, uploadPayInfo } from '../../service/api';


dayjs.extend(customParseFormat);

export default function Settlement() {
    const location = useLocation();
    const navigateTo = useNavigate()
    const [number, setNumber] = useState(0)
    const [payInfo, setPayInfo] = useState()
    const style = {
        // background: '#0092ff',
        // padding: '4px 0',
    };
    const cityOptions = cityData
    const setPayAmount = async () => {
        let result = await getPayAmount(store.getState().caseId)
        if (result.code == 200) {
            setNumber(result.data)
        }
    }
    useEffect(() => {
        setPayAmount()
    }, [])
    const handleInputChange = (e) => {
        const { value } = e.target
        switch (e.target.getAttribute("id")) {
            case "payeeName":
                setPayInfo({ ...payInfo, payeeName: value })
                break;
            case "phone":
                setPayInfo({ ...payInfo, phone: value })
                break;
            case "collectionAccount":
                setPayInfo({ ...payInfo, collectionAccount: value })
                break;
            default:
                break;
        }
    }
    const sexChange = (e) => {
        console.log("select settle e", e);
        setPayInfo({ ...payInfo, sex: e == "女" ? 0 : 1 })
    }
    const methodChange = (e) => {
        console.log("select settle e", e);
        setPayInfo({ ...payInfo, paymentMethod: e == "支付宝" ? 1 : e == "微信" ? 2 : 3 })
    }
    const casaderChange = (e) => {
        console.log("casader settle e", e);
        setPayInfo({ ...payInfo, city: e.join("-") })

    }
    const submitPayInfo = async () => {
        console.log("payInfo", { ...payInfo, insurantId: store.getState().insurantId, policyId: store.getState().caseId, reimbursementAmount: number });
        let result = await uploadPayInfo({ ...payInfo, insurantId: store.getState().insurantId, policyId: store.getState().caseId, reimbursementAmount: number })
        if (result.code == 200) {
            message.success("提交成功!", [3])
            navigateTo("/home/processing")

        } else {
            message.error("提交失败!", [3])
        }
    }
    return (
        <div>
            <Divider orientation="left" className="dividerStyle">收款人信息</Divider>
            <Form>
                <Row gutter={[16, 5]}>
                    <Col className="gutter-row" span={6}>
                        <div style={style}>
                            <Form.Item label="姓名：" >
                                <Input onChange={handleInputChange} id="payeeName" />
                            </Form.Item>
                        </div>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <div style={style}>
                            <Form.Item label="性别：">
                                <Select
                                    id="sex"
                                    // defaultValue="女"
                                    onChange={sexChange}
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
                    <Col className="gutter-row" span={6}>
                        <div style={style}>
                            <Form.Item label="联系方式：">
                                <Input
                                    min={11}
                                    max={11}
                                    id="phone"
                                    onChange={handleInputChange}
                                // onChange={onChange}
                                />
                            </Form.Item>
                        </div>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <div style={style}>
                            <Form.Item label="所在城市：">
                                <Cascader
                                    options={cityOptions}
                                    onChange={casaderChange}
                                    id="city"
                                // onChange={onChange}
                                />
                            </Form.Item>
                        </div>
                    </Col>
                </Row>
                <Divider orientation="left" className="dividerStyle" style={{ margin: "0 0 16px 0" }}>收款账户信息</Divider>
                <Row
                    gutter={[16, 5]}
                >
                    <Col className="gutter-row" span={6}>
                        <div style={style}>
                            <Form.Item label="报销金额">
                                <Input disabled value={number} onChange={handleInputChange} />
                            </Form.Item>
                        </div>
                    </Col>
                    <Col className="gutter-row" span={8}>
                        <div style={style}>
                            <Form.Item label="收款方式">
                                <Select
                                    onChange={methodChange}
                                    id="paymentMethod"
                                    // defaultValue="支付宝"
                                    style={{
                                        width: 120,
                                        float: "left"
                                    }}
                                    //   onChange={handleChange}
                                    options={[
                                        {
                                            value: '支付宝',
                                            label: '支付宝',
                                        },
                                        {
                                            value: '微信',
                                            label: '微信',
                                        },
                                        {
                                            value: '银联',
                                            label: '银联',
                                        },
                                    ]}
                                />
                            </Form.Item>
                        </div>
                    </Col>
                    <Col className="gutter-row" span={8}>
                        <div style={style}>
                            <Form.Item label="收款账户">
                                <Input
                                    min={1}
                                    max={19}
                                    style={{
                                        width: 120,
                                        float: "left"
                                    }}
                                    id="collectionAccount"
                                    onChange={handleInputChange}
                                // onChange={onChange}
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
                        <Button type="primary" onClick={submitPayInfo}>提交</Button>
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
