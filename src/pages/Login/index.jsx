import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Card } from 'antd';
import { Button, Form, Input, message } from 'antd';
import urlAddress from "../../utils/urlAddress"
import { reqLogin } from '../../service/api';
import store from "../../Redux/store"


const MyFormItemContext = React.createContext([]);
function toArr(str) {
    return Array.isArray(str) ? str : [str];
}
const MyFormItemGroup = ({ prefix, children }) => {
    const prefixPath = React.useContext(MyFormItemContext);
    const concatPath = React.useMemo(() => [...prefixPath, ...toArr(prefix)], [prefixPath, prefix]);
    return <MyFormItemContext.Provider value={concatPath}>{children}</MyFormItemContext.Provider>;
};
const MyFormItem = ({ name, ...props }) => {
    const prefixPath = React.useContext(MyFormItemContext);
    const concatName = name !== undefined ? [...prefixPath, ...toArr(name)] : undefined;
    return <Form.Item name={concatName} {...props} />;
};

export default function Login() {
    const navigateTo = useNavigate()
    const [loginForm, setLoginForm] = useState({})
    const onFinish = (value) => {
        // console.log("form finish", value);
    };
    // 刷新获得验证码
    const refresh = () => {
        loginForm.userName ? document.getElementById("codeImg").src = urlAddress + "/login/getCode/" + loginForm.userName + "?time=" + new Date().getTime() : message.error("请输入用户名", [3])
    }
    // 输入登录信息
    const handleChange = (e) => {
        const { value } = e.target
        switch (e.target.getAttribute("id")) {
            case "userName":
                setLoginForm({ ...loginForm, userName: value })
                break;
            case "password":
                setLoginForm({ ...loginForm, password: value })
                break;
            case "code":
                setLoginForm({ ...loginForm, code: value })
                break;
            default:
                break;
        }
    }
    // 登录
    const goLogin = async () => {
        if (!loginForm.userName) {
            message.error("请输入用户名", [3])
        } else if (!loginForm.password) {
            message.error("请输入密码", [3])
        } else if (!loginForm.code) {
            message.error("请输入验证码", [3])
        } else {
            if (localStorage.getItem("TOKEN")) localStorage.setItem("TOKEN", "")
            let result = await reqLogin(loginForm)
            if (result.code == 200) {
                console.log(" login result", result);
                localStorage.setItem("TOKEN", result.data.token)
                message.success("登录成功", [3])
                // 存账户角色
                switch (result.data.Authority) {
                    case "1":
                        store.dispatch({ type: "setRole", data: "登记员" })
                        break;
                    case "2":
                        store.dispatch({ type: "setRole", data: "评估员" })
                        break;
                    case "3":
                        store.dispatch({ type: "setRole", data: "报销员" })
                        break;
                    case "4":
                        store.dispatch({ type: "setRole", data: "管理员" })
                        break;
                    default:
                        break;
                }
                navigateTo("/home/all")
            } else {
                message.error("登录失败！请重新登录", [3])
            }
        }
    }

    return (
        <div style={{ width: "100%", height: "100vh" }}>
            <div id="left" style={{ height: "100vh", width: "50%", float: "left" }}>
                <img src={require("./static/loginBg.png")} style={{ height: "100%", width: "100%" }} alt="" />
            </div>
            <div id="right" style={{ height: "100vh", width: "50%", float: "left", display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                <Card title="Welcome to IR System" bordered={false} style={{ width: "60%", height: "60%", flex: "1", marginTop: "-70px" }} headStyle={{ color: "#4966df", fontSize: "1.75rem" }}>
                    <Form name="form_item_path" layout="vertical" onFinish={onFinish} style={{ width: "50%", margin: "0 auto" }}>
                        <MyFormItemGroup prefix={['user']}>
                            <MyFormItemGroup prefix={['name']}>
                                <MyFormItem name="username" label={<label style={{ fontWeight: 500 }}>Username</label>} >
                                    <Input onChange={(e) => handleChange(e)} id="userName" />
                                </MyFormItem>
                                <MyFormItem name="password" label={<label style={{ fontWeight: 500 }}>Password</label>}>
                                    <Input.Password onChange={(e) => handleChange(e)} id="password" />
                                </MyFormItem>
                            </MyFormItemGroup>

                            <MyFormItem name="code" label={<label style={{ fontWeight: 500 }}>Verification Code</label>}>
                                <div>
                                    <Input style={{ width: "69%" }} onChange={(e) => handleChange(e)} id="code" />
                                    <img
                                        height="30px"
                                        width="30%"
                                        style={{ marginLeft: "3px", borderRadius: "7px", float: "right", width: "29%" }}
                                        id="codeImg"
                                        onClick={refresh}
                                    />
                                </div>
                            </MyFormItem>
                        </MyFormItemGroup>

                        <Button type="primary" htmlType="submit" style={{ width: "100%" }} onClick={goLogin}>
                            Login
                        </Button>
                    </Form>
                </Card>
            </div>
        </div >
    )
}
