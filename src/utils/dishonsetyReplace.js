export default (data) => {
    let result = []
    data.map((item) => {
        item = { ...item, key: item.id }
        switch (item.dishonestyType) {
            case 1:
                item = { ...item, dishonestyType: "不履行法律确定义务" }
                break;
            case 2:
                item = { ...item, dishonestyType: "妨碍、抗拒执行" }
                break;
            case 3:
                item = { ...item, dishonestyType: "非法规避执行" }
                break;
            case 4:
                item = { ...item, dishonestyType: "违反财产报告制度" }
                break;
            case 5:
                item = { ...item, dishonestyType: "违反限制消费令" }
                break;
            case 6:
                item = { ...item, dishonestyType: "无正当理由拒不履行执行和解协议" }
                break;
            default:
                break;
        }
        result = [...result, item]

    })
    return result
}