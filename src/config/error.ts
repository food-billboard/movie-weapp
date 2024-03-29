import {setResponseCookie} from './cookie'

//报错来源
const originType = 'errorHandler'

export default (type, { response, origin }) => {
    //response处理
    if(type === 'REQUEST_SUCCESS') {
        //设置响应状态码
        !response.statusCode && (response.statusCode = response.status)
        const statusCode = response.statusCode
        //设置cookie的set-Cookie
        setResponseCookie(response.header)
        setResponseCookie(response.header, 'set-Cookie')
        //成功状态码的情况
        if([200, 204, 206].indexOf(statusCode) >= 0) {
            const body = response.data
            if(origin) return response
            if(body.success) {
                return body.res.data
            }
            throw { response, origin }
        }

        //失败
        if([500, 400, 401, 404, 502].indexOf(statusCode) >= 0) {
            throw {response, origin}
        }
    }
}