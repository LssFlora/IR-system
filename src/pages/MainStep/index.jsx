import React, { useState, useEffect } from 'react'
import { useLocation, Outlet, useNavigate } from 'react-router-dom'
import store from "../../Redux/store"
import { Steps } from 'antd';

export default function MainStep() {
    const location = useLocation();
    console.log("location", location);
    const navigateTo = useNavigate();
    const pathName = location.pathname;
    const baseInfo = location.state
    const [current, setCurrent] = useState(0);
    const [items, setItems] = useState(
        [
            {
                status: 'finish',
                title: '登记',
                disabled: false
            },
            {
                status: 'process',
                title: '评估',
                disabled: false

            },
            {
                status: 'wait',
                title: '报销',
                disabled: false

            },
            {
                status: 'wait',
                title: '总览',
                disabled: false

            },
        ]
    )
    const initKey = () => {
        const pathArr = pathName.split("/")
        // switch (store.getState().insureStatus) {
        //     case "已完成":
        //         setCurrent(3)
        //         break;
        //     case "登记中":
        //         setCurrent(0)
        //         break;
        //     case "评估中":
        //         setCurrent(1)
        //         break;
        //     case "报销中":
        //         setCurrent(2)
        //         break;
        //     default:
        //         break;
        // }
        switch (pathArr[pathArr.length - 1]) {
            case "registration":
                setCurrent(0)
                break;
            case "assessment":
                setCurrent(1)
                break;
            case "settlement":
                setCurrent(2)
                break;
            case "overview":
                setCurrent(3)
                break;
            default:
                break;
        }
        console.log("store.getState().insureStatus", store.getState().insureStatus);
        switch (store.getState().insureStatus) {
            case "已完成":
                items.forEach((item) => {
                    item.title != "总览" ? item.status = "finish" : console.log("1");
                })
                break;
            case "登记中":
                items.forEach((item) => {
                    item.title != "登记" ? item.status = "wait" : item.status = "process";
                })
                break;
            case "评估中":
                items.forEach((item) => {
                    item.title == "登记" ? item.status = "finish" : (item.title == "评估" ? item.status = "process" : item.status = "wait");
                })
                break;
            case "报销中":
                items.forEach((item) => {
                    item.title == "登记" ? item.status = "finish" : item.title == "评估" ? item.status = "finish" : item.title = "报销" ? item.status = "process" : item.status = "wait";
                })
                break;
            default:
                break;
        }
    }
    const disabledKey = () => {
        items.forEach((item) => {
            item.status == "finish" ? item.disabled = true : item.disabled = false
        })
    }
    useEffect(() => {
        initKey()
        disabledKey()
    }, [])
    const onChange = (currentKey) => {
        setCurrent(currentKey);
        const { step, caseId } = store.getState()
        switch (currentKey) {
            case 0:
                navigateTo(`/home/${step}/${caseId}/registration`)
                break;
            case 1:
                navigateTo(`/home/${step}/${caseId}/assessment`)
                break;
            case 2:
                navigateTo(`/home/${step}/${caseId}/settlement`)
                break;
            case 3:
                navigateTo(`/home/${step}/${caseId}/overview`)
                break;
            default:
                break;
        }
    };
    return (
        <div>
            <Steps
                type="navigation"
                size='small'
                current={current}
                onChange={onChange}
                className="site-navigation-steps"
                style={{
                    paddingTop: 0
                }}
                items={items}
            />
            <Outlet />
        </div>
    )
}
