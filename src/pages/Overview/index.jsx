import React, { useEffect, useState } from 'react'
import store from '../../Redux/store';
import insureTypeReplace from '../../utils/insureTypeReplace';
import receiptTypeReplace from '../../utils/receiptTypeReplace';
import "../../style/css/registration.css"
import { Divider, Descriptions } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { getOverviewInfo } from '../../service/api';


dayjs.extend(customParseFormat);

export default function Registration() {
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
        recepitInfo: {
            receiptType: "",
            receiptMoney: ""
        }
    })
    useEffect(() => {
        getInfo()
    }, [])
    const getInfo = async () => {
        let result = await getOverviewInfo(store.getState().caseId)
        if (result.code == 200) {
            console.log("overview", result.data);
            setInfo(result.data)
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
                <Descriptions.Item label="是否为定点医院">{info.designatedHospitalStatus == 1 ? "是" : "否"}</Descriptions.Item>
                <Descriptions.Item label="是否住院：">{info.hospitalizationStatus == 1 ? "是" : "否"}</Descriptions.Item>
            </Descriptions>
            <Divider orientation="left" className="dividerStyle">事件信息</Divider>
            <Descriptions bordered>
                <Descriptions.Item label="事件时间">{info.declarationTime}</Descriptions.Item>
                <Descriptions.Item label="事件描述">{info.eventDescription}</Descriptions.Item>
                <Descriptions.Item label="收据项目">{receiptTypeReplace(info.recepitInfo.receiptType)}</Descriptions.Item>
                <Descriptions.Item label="收据金额">{info.recepitInfo.receiptMoney}</Descriptions.Item>
            </Descriptions>
            <Divider orientation="left" className="dividerStyle">收款人信息</Divider>
            <Descriptions bordered>
                <Descriptions.Item label="姓名：">{info.payeeName}</Descriptions.Item>
                <Descriptions.Item label="性别：">{info.payeeSex == 1 ? "男" : "女"}</Descriptions.Item>
                <Descriptions.Item label="联系方式：">{info.payeePhone}</Descriptions.Item>
                <Descriptions.Item label="所在城市：">{info.payeeCity}</Descriptions.Item>
            </Descriptions>
            <Divider orientation="left" className="dividerStyle">收款账户信息</Divider>
            <Descriptions bordered>
                <Descriptions.Item label="报销金额">{info.reimbursementAmount}</Descriptions.Item>
                <Descriptions.Item label="收款方式">{info.paymentMethod == 1 ? "支付宝" : info.paymentMethod == 2 ? "微信" : "银联"}</Descriptions.Item>
                <Descriptions.Item label="收款账户">{info.collectionAccount}</Descriptions.Item>
            </Descriptions>
        </div>
    )
}
