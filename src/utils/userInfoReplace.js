export default (userInfo) => {
    switch (userInfo.insureType) {
        case 1:
            userInfo = { ...userInfo, insureType: "城镇职工基本医疗保险" }
            break;
        case 2:
            userInfo = { ...userInfo, insureType: "城镇居民基本医疗保险" }
            break;
        case 3:
            userInfo = { ...userInfo, insureType: "新型农村合作医疗" }
            break;
        case 4:
            userInfo = { ...userInfo, insureType: "重大疾病保险" }
            break;
        case 5:
            userInfo = { ...userInfo, insureType: "高发重大疾病全保" }
            break;
        case 6:
            userInfo = { ...userInfo, insureType: "住院补偿性保险" }
            break;
        case 7:
            userInfo = { ...userInfo, insureType: "意外医疗险" }
            break;
        default:
            break;
    }
    switch (userInfo.sex) {
        case 0:
            userInfo = { ...userInfo, sex: "女" }
            break;
        case 1:
            userInfo = { ...userInfo, sex: "男" }
            break;
        case 2:
            userInfo = { ...userInfo, sex: "其他" }
            break;
        default:
            break;
    }
    return userInfo
}