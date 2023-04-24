export default (insureType) => {
    switch (insureType) {
        case 1:
            return "城镇职工基本医疗保险"
        case 2:
            return "城镇居民基本医疗保险"
        case 3:
            return "新型农村合作医疗"
        case 4:
            return "重大疾病保险"
        case 5:
            return "高发重大疾病全保"
        case 6:
            return "住院补偿性保险"
        case 7:
            return "意外医疗险"
        default:
            break;
    }
}