import request from "./request"

// 登录
export const reqLogin = (data) => {
    return request({
        url: "/login/in",
        method: "post",
        data,
    })
}
// 登出
export const reqLogOut = () => {
    return request({
        url: "/login/out",
        method: "get",
    })
}
// 获取保单用户基本信息
export const reqUserInfo = (phone) => {
    return request({
        url: `/insuredUserInfo/getInfo?phone=${phone}`,
        method: "get",
    })
}
// 获取待处理保单
export const reqProcessingCase = () => {
    return request({
        url: "/policyInfo/getProcessingInfo",
        method: "get",
    })
}
// 获取已处理保单
export const reqDoneCase = () => {
    return request({
        url: "/policyInfo/getCompletedInfo",
        method: "get",
    })
}
// 获取已结束保单
export const reqEndCase = () => {
    return request({
        url: "/policyInfo/getEndingInfo",
        method: "get",
    })
}
// 提交登记表单
export const uploadRegiForm = (data) => {
    return request({
        url: "/policyInfo/register",
        method: "put",
        data
    })
}
// 获得历史保单信息
export const getHistoryCase = (data) => {
    return request({
        url: `/policyInfo/getHistorical?insurantId=${data}`,
        method: "get",
    })
}
// 获得本公司历史保单信息
export const getHistoryCompany = (data) => {
    return request({
        url: `/policyInfo/getHistoricalSelf?insurantId=${data}`,
        method: "get",
    })
}
// 设置评估结果
export const setAssessResult = (data) => {
    const { id, status } = data
    return request({
        url: `/policyInfo/setEvaluationResults?id=${id}&status=${status}`,
        method: "post",
    })
}
// 获取报销金额
export const getPayAmount = (data) => {
    return request({
        url: `/policyInfo/getAmount?id=${data}`,
        method: "get",
    })
}
// 提交报销信息
export const uploadPayInfo = (data) => {
    return request({
        url: "/policyInfo/setReimbursement",
        method: "put",
        data
    })
}
// 获取总览信息
export const getOverviewInfo = (data) => {
    return request({
        url: `/policyInfo/getOverViewInfo?id=${data}`,
        method: "GET",
    })
}

