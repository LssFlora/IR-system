import axios from 'axios'
import { reqLogOut } from './api'
import { message } from 'antd';
import { HashRouter } from 'react-router-dom'
import urlAddress from '../utils/urlAddress';


var request = axios.create({
    // 后台接口的基准地址
    baseURL: urlAddress,
    timeout: 5000
})

// 请求拦截器
request.interceptors.request.use((config) => {
    if (localStorage.getItem("TOKEN")) {
        // 若有token,则在请求头中配置，一起发请求
        config.headers.token = localStorage.getItem("TOKEN")
    }
    return config
}, function (error) {
    //对相应错误做点什么
    message.error(error.message)
    return Promise.reject(error)
}
)



//响应拦截器
request.interceptors.response.use(async (response) => {
    // nProgress.done();
    // console.log("response", response);
    if (response.data.code === 4111) {
        const router = new HashRouter()
        let result = await reqLogOut()
        if (result.code == 200) {
            localStorage.setItem("TOKEN", "")
            message.success("已登出", [3])
            router.history.push('/login')
        } else {
            message.error("自动登出失败！", [3])
        }
    }
    return response.data
}, function (error) {
    //对相应错误做点什么
    message.error(error.message)
    return Promise.reject(error)
}
)


export default request