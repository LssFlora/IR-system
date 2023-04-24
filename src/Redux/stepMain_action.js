export const setCaseId = (caseId) => {
    return {
        type: "setCaseId",
        data: caseId
    }
}
export const setStep = (step) => {
    return {
        type: "setStep",
        data: step
    }
}
export const reduxLogOut = () => {
    return {
        type: "logout",
        data: ""
    }
}
export const reduxRole = (role) => {
    return {
        type: "setRole",
        data: role
    }
}
export const setCaseList = (data) => {
    return {
        type: "setCaseList",
        data
    }
}
export const setInsureStatus = (data) => {
    return {
        type: "setInsureStatus",
        data
    }
}
export const setIsNewRegi = (data) => {
    return {
        type: "setIsNewRegi",
        data
    }
}
export const setTelephone = (data) => {
    return {
        type: "setTelephone",
        data
    }
}