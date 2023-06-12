import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { reqLogOut } from '../../service/api';
import "../../style/css/home.css"
import { LogoutOutlined, InsuranceOutlined } from '@ant-design/icons';
import { headStyle } from '../../style/js/home';
import { Layout, message, Modal } from 'antd';
import store from '../../Redux/store';
const { Header } = Layout;



export default function Home() {
    const navigateTo = useNavigate()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const goHome = () => {
        navigateTo("/home/all")
    }
    const comfirmLogOut = () => {
        setIsModalOpen(true)
    }
    const logOutYes = async () => {
        let result = await reqLogOut()
        if (result.code == 200) {
            localStorage.setItem("TOKEN", "")
            store.dispatch({ type: "logout" })
            message.success("登出成功", [3])
            navigateTo("/login")
        } else {
            message.error("登出失败", [3])
            setIsModalOpen(false)
        }
    }
    const logOutNo = () => {
        setIsModalOpen(false)
        message.warning("取消登出", [3])
    }
    return (
        <Header style={headStyle}>
            <InsuranceOutlined className='insuranceIcon' onClick={goHome} />
            <span
                className='headerTitle'
                onClick={goHome}
            >
                IR System
            </span>
            <LogoutOutlined className='headerIconStyle' onClick={comfirmLogOut} />
            <Modal title="确认退出登录？" open={isModalOpen} onOk={logOutYes} onCancel={logOutNo}>
            </Modal>
            <span className='headerSpanStyle'>
                {store.getState().role}
            </span>
        </Header>
    )
}
