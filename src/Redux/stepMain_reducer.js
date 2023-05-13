const initState = {
    caseId: "",
    step: "",
    role: "",
    caseList: [],
    insurantId: "",
    insureStatus: "",
    isNewRegi: "",
    telephone: ""
}
const stepMainReducer = (preState = initState, action) => {
    console.log("redux", preState);
    const { type, data } = action
    switch (type) {
        case "setCaseId":
            preState = { ...preState, caseId: data }
            return preState
        case "setInsurantId":
            preState = { ...preState, insurantId: data }
            return preState
        case "setStep":
            preState = { ...preState, step: data }
            return preState
        case "logout":
            preState = initState
            return preState
        case "setRole":
            preState = { ...preState, role: data }
            return preState
        case "setCaseList":
            preState = { ...preState, caseList: data }
            return preState
        case "setInsureStatus":
            preState = { ...preState, insureStatus: data }
            return preState
        case "setIsNewRegi":
            preState = { ...preState, isNewRegi: data }
            return preState
        case "setTelephone":
            preState = { ...preState, telephone: data }
            return preState
        default:
            return preState
    }
}
export default stepMainReducer