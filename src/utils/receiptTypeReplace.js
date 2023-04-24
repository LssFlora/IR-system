export default (typeStr) => {
    const typeArr = typeStr.split(",")
    typeArr.forEach((element, index) => {
        switch (element) {
            case "1":
                typeArr[index] = "中药费"
                break;
            case "2":
                typeArr[index] = "西药费"
                break;
            case "3":
                typeArr[index] = "检查费"
                break;
            case "4":
                typeArr[index] = "化验费"
                break;
            case "5":
                typeArr[index] = "卫生材料费"
                break;
            default:
                break;
        }
    });
    return typeArr.join()
}