import axios from 'axios'
import { Message } from 'element-ui'
const service = axios.create({
    timeout:5000,
    baseURL:'http://api.xiaomadagege.cn:3355/api/private/v1/'
})

service.interceptors.request.use((config)=>{
    config.headers.Authorization = localStorage.token;
    return config
})


service.interceptors.response.use((response)=>{
    return response
},(err)=>{
    let errMsg = ''
        if (err && err.response.status) {
            switch (err.response.status) {
                case 401:
                    errMsg = '失败'
                    localStorage.removeItem('isetoken')
                    break;
                default:
                    errMsg = err.response.data.msg
            }
        }else {
            errMsg = err
        }
        Message.error(errMsg)
        return Promise.reject(errMsg)
})

export default service