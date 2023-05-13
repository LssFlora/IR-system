import React, { useState, useEffect } from 'react'
import { reqProcessingCase, reqDoneCase, reqEndCase } from '../../service/api';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import MyHeader from "../../component/Header"
import "../../style/css/home.css"
import { MailOutlined, SettingOutlined, AppstoreOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import store from "../../Redux/store"
const { Content, Sider } = Layout;


function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}
const items = [
    getItem('待处理', 'processing', <MailOutlined />,),
    getItem('已处理', 'done', <AppstoreOutlined />),
    getItem('已结束', 'end', <SettingOutlined />),
];

export default function Home() {
    const navigateTo = useNavigate();
    const [openKeys, setOpenKeys] = useState(['sub1']);
    const [caseList, setCaseList] = useState([])
    const location = useLocation();
    const pathStr = location.pathname
    const pathName = (pathStr.indexOf("processing") && "processing") || (pathStr.indexOf("done") && "done") || (pathStr.indexOf("end") && "end")
    const [selectKey, setSelectKey] = useState(pathName)


    useEffect(() => {
        store.dispatch({ type: "setStep", data: 'processing' })
        getProcessingCase();
    }, [])
    const handleClick = (e) => {
        store.dispatch({ type: "setStep", data: `${e.key}Case` })
        switch (e.key) {
            case "processing":
                getProcessingCase();
                break;
            case "done":
                getDoneCase();
                break;
            case "end":
                getEndCase();
                break;
            default:
                break;
        }
        navigateTo(`/home/${e.key}`)
    }
    // 获取待处理保单
    const getProcessingCase = async () => {
        let result = await reqProcessingCase();
        if (result.code == 200) {
            console.log("processing result data", result.data);
            setCaseList([...result.data])
            store.dispatch({ type: "setCaseList", data: result.data })
        }
    }
    const getDoneCase = async () => {
        let result = await reqDoneCase();
        if (result.code == 200) {
            console.log("done result data", result.data);
            setCaseList([...result.data])
            store.dispatch({ type: "setCaseList", data: result.data })
        }
    }
    const getEndCase = async () => {
        let result = await reqEndCase();
        if (result.code == 200) {
            console.log("end result data", result.data);
            setCaseList([...result.data])
            store.dispatch({ type: "setCaseList", data: result.data })
        }
    }

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Layout>
            <MyHeader />
            <Layout style={{ marginTop: "2px" }}>
                <Sider
                    width={200}
                    style={{
                        background: colorBgContainer,
                    }}
                >
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={[selectKey]}
                        style={{
                            height: '100%',
                            borderRight: 0,
                            // backgroundColor: "#4966df"
                        }}
                        items={items}
                        onClick={handleClick}
                    />
                </Sider>
                <Layout
                    style={{
                        padding: '0 24px 24px',
                    }}
                >
                    <Content
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: "521px",
                            height: "100%",
                            background: colorBgContainer,
                        }}
                    >
                        <Outlet caseList={caseList} />
                    </Content>
                </Layout>
            </Layout>
        </Layout>

    )
}
