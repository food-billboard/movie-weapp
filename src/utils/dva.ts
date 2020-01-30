import createLoading from 'dva-loading'
import * as core from 'dva-core'
import {createLogger} from 'redux-logger'

const isProduction = process.env.NODE_ENV === 'production'

let app,
    dispatch,
    store;

const createDva : any = (options: any = {}, callback : any = () => {}) => {
    if(options.log && !isProduction) {
        //日志打印
        options.onAction = [createLogger({collapsed: true})]
    }
    //创建dva实例
    app = core.create(options)

    //使用Loading
    app.use(createLoading({effects: true}))

    //回调挂载
    callback(app)

    //启动
    app.start()

    //store赋值
    store = app._store

    //获取store
    app.getStore = () => store

    //dispatch赋值
    dispatch = store.dispatch
    app.dispatch = dispatch

    return app

}

export default {
    createDva,
    //获取dispatch
    getDispatch() {
        return app._store.dispatch
    }
}