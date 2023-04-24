export default (caseList) => {
    let newList = caseList || []
    let result = []
    newList.forEach(caseItem => {
        console.log("caseItem", caseItem);
        switch (caseItem.policyStatus) {
            case 1:
                caseItem = { ...caseItem, policyStatus: "登记中" }
                break;
            case 2:
                caseItem = { ...caseItem, policyStatus: "评估中" }
                break;
            case 3:
                caseItem = { ...caseItem, policyStatus: "报销中" }
                break;
            case 4:
                caseItem = { ...caseItem, policyStatus: "已完成" }
                break;
            default:
                break;
        }
        switch (caseItem.insureType) {
            case 1:
                caseItem = { ...caseItem, insureType: "城镇职工基本医疗保险" }
                break;
            case 2:
                caseItem = { ...caseItem, insureType: "城镇居民基本医疗保险" }
                break;
            case 3:
                caseItem = { ...caseItem, insureType: "新型农村合作医疗" }
                break;
            case 4:
                caseItem = { ...caseItem, insureType: "重大疾病保险" }
                break;
            case 5:
                caseItem = { ...caseItem, insureType: "高发重大疾病全保" }
                break;
            case 6:
                caseItem = { ...caseItem, insureType: "住院补偿性保险" }
                break;
            case 7:
                caseItem = { ...caseItem, insureType: "意外医疗险" }
                break;
            default:
                break;
        }
        caseItem = { ...caseItem, key: caseItem.id }
        console.log("step caseItem", caseItem);
        result = [...result, caseItem]
    });
    return result
}