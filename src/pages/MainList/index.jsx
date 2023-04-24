import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import caseListReplace from "../../utils/caseListReplace"

import store from "../../Redux/store"
import { Input, Col, Row, Table, Button } from 'antd';
import { render } from 'react-dom';
const { Search } = Input;

export default function MainList() {
    const navigateTo = useNavigate()
    const pathName = useLocation().pathname
    const onSearch = (value) => console.log(value);
    const [isDisabled, setIsDisabled] = useState()
    const setRole = () => {
        // store.getState().role == "登记员" || "管理员" ? setIsNewBtnShow("block") : setIsNewBtnShow("none")
        // console.log("setRole", store.getState().role);
        switch (store.getState().role) {
            case "登记员":
                setIsDisabled(false)
                break;
            case "管理员":
                setIsDisabled(false)
                break;
            case "评估员":
                setIsDisabled(true)
                break;
            case "报销员":
                setIsDisabled(true)
                break;
            default:
                break;
        }
    }
    const [caseList, setCaseList] = useState()
    useEffect(() => {
        setRole()
    }, [])
    useEffect(() => {
        setCaseList(caseListReplace(store.getState().caseList))
    }, [store.getState().caseList])
    const columns = [
        {
            title: '保单号',
            dataIndex: 'id',
        },
        {
            title: '姓名',
            dataIndex: 'name',
        },
        {
            title: '手机号',
            dataIndex: 'phone',
        },
        {
            title: '身份证号',
            dataIndex: 'identityCard',
        },
        {
            title: '状态',
            dataIndex: 'policyStatus',
        },
        {
            title: '医保类型',
            dataIndex: 'insureType',
        },
        {
            title: '创建时间',
            dataIndex: 'declarationTime',
        },
    ];

    const onChange = (pagination, filters, sorter, extra) => {
        // console.log('params', pagination, filters, sorter, extra);
    };

    const handleClick = (record) => {
        console.log("record", record);
        store.dispatch({ type: "setCaseId", data: record.id })
        store.dispatch({ type: "setInsurantId", data: record.insurantId })
        store.dispatch({ type: "setInsureStatus", data: record.policyStatus })
        store.dispatch({ type: "setIsNewRegi", data: false })
        store.dispatch({ type: "setTelephone", data: record.phone })
        console.log("mainList role", store.getState().role);
        if (record.policyStatus == "已完成") {
            navigateTo(`${pathName}Case/${record.id}/overview`, { state: { record, outStepUrl: `${pathName}Case/${record.caseId}` } })
        } else if (record.policyStatus == "登记中") {
            navigateTo(`${pathName}Case/${record.id}/registration`, { state: { record, outStepUrl: `${pathName}Case/${record.caseId}` } })
        } else if (record.policyStatus == "评估中") {
            navigateTo(`${pathName}Case/${record.id}/assessment`, { state: { record, outStepUrl: `${pathName}Case/${record.caseId}` } })
        }
        else if (record.policyStatus == "报销中") {
            navigateTo(`${pathName}Case/${record.id}/settlement`, { state: { record, outStepUrl: `${pathName}Case/${record.caseId}` } })
        }
        // else {
        // switch (store.getState().role) {
        //     case "登记员":
        //         navigateTo(`${pathName}Case/${record.id}/registration`, { state: { record, outStepUrl: `${pathName}Case/${record.caseId}` } })
        //         break;
        //     case "评估员":
        //         navigateTo(`${pathName}Case/${record.id}/assessment`, { state: { record, outStepUrl: `${pathName}Case/${record.caseId}` } })
        //         break;
        //     case "报销员":
        //         navigateTo(`${pathName}Case/${record.id}/settlement`, { state: { record, outStepUrl: `${pathName}Case/${record.caseId}` } })
        //         break;
        //     case "管理员":
        //         navigateTo(`${pathName}Case/${record.id}/overview`, { state: { record, outStepUrl: `${pathName}Case/${record.caseId}` } })
        //         break;
        //     default:
        //         break;
        // }
        // }
    }
    // 创建新表单
    const goNewRegi = () => {
        store.dispatch({ type: "setIsNewRegi", data: true })
        navigateTo("/home/processingNew/registration")
    }
    return (
        <div>
            <Row>
                {/* <Col span={8}>
                    <Search placeholder="输入客户号" onSearch={onSearch} enterButton style={{ width: "65%" }} />
                </Col>
                <Col span={8}>
                    <Search placeholder="输入保单号" onSearch={onSearch} enterButton style={{ width: "65%" }} />
                </Col> */}
                <Col span={8}>
                    <Button type="primary" onClick={goNewRegi} disabled={isDisabled}>新建录入</Button>
                </Col>
                <Table
                    columns={columns}
                    dataSource={caseList}
                    onChange={onChange}
                    bordered="true"
                    style={{
                        width: "100%",
                        margin: "15px",
                        marginTop: "30px"
                    }}
                    pagination={
                        {
                            defaultPageSize: 5
                        }
                    }
                    onRow={(record) => {
                        return {
                            onClick: (event) => { handleClick(record) }, // 点击行
                            onDoubleClick: (event) => { },
                            onContextMenu: (event) => { },
                            onMouseEnter: (event) => { }, // 鼠标移入行
                            onMouseLeave: (event) => { },
                        };
                    }}
                />
            </Row>
        </div>
    )
}
