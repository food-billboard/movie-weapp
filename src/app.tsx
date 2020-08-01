import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { Provider } from '@tarojs/redux'
import { dva, router, includes } from '~utils'
import Index from './pages/main/index'
import configure from './configure'

import './app.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

//创建dva实例
const app = dva.createDva({
  log: false,
  onError(e) {
    // 关闭所有Loading
    Taro.hideLoading()

    const response = e.response
    if(response){
      const { statusCode } = response
      let toast: Taro.showToast.Option
      if( statusCode === 404 ){
        toast = { title: '404 调用错误，无此接口', icon: 'none' };
        Taro.showToast(toast);
      }else if (statusCode >= 500) {
        toast = { title: '当前网络异常，请稍后重试', icon: 'none' };
        if (response.data && response.data.err) {
          toast.title = response.data.err;
        }
        Taro.showToast(toast);
      }else if( statusCode === 401 ){
        toast = { title: '未登录', icon: 'none' };
        Taro.showToast(toast);
        router.replace('/login')
      }else if( statusCode === 200 ){
        const body = response.data
        toast = { title: body.err.msg || '当前网络异常，请稍后重试', icon: 'none' };
        Taro.showToast(toast);
        if( body.err && includes(['401'], body.err.code) ){
          router.replace('/login')
        }
        if( body.err && includes(['404'], body.err.code) ){
          setTimeout(() => router.replace('/login'), 500);
        }
      }
      return
    }
    const toast:Taro.showToast.Option = { title: '当前网络异常，请稍后重试', icon: 'none' };
    Taro.showToast(toast);
  },
  initialState: {}
}, (app) => {
  configure(app);
})


//获取store
const store = app.getStore()


class App extends Component {

  public componentWillMount = async () => {
    // if( process.env.TARO_ENV === 'weapp' ){
    //   Taro.cloud.init({traceUser: true})
    // }

    const dispatch = dva.getDispatch()

    await Taro.showLoading({mask: true, title: '加载中'})
    if( includes(['/mine', '/news', '/issue'], router.getOptions().alias) ) {
       // 获取个人详情判断是否已经登录
      await dispatch({ type: 'global/getUserInfo'})
    }
    await Taro.hideLoading();
  }

  public componentDidMount () {}

  public componentDidShow () {}

  public componentDidHide () {}

  public componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  public render () {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

export default App