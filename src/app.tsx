import '@tarojs/async-await'
import Taro, { Component, Config } from '@tarojs/taro'
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
      if( statusCode === 404 ){
        let toast = { title: '404 调用错误，无此接口', icon: 'none' };
        Taro.showToast(toast);
      }else if (statusCode >= 500) {
        let toast = { title: '当前网络异常，请稍后重试', icon: 'none' };
        if (response.data && response.data.err) {
          toast.title = response.data.err;
        }
        Taro.showToast(toast);
      }else if( statusCode === 401 ){
        const toast = { title: '未登录', icon: 'none' };
        Taro.showToast(toast);
        router.replace('/login')
      }else if( statusCode === 200 ){
        const body = response.data
        const toast = { title: body.err.msg || '当前网络异常，请稍后重试', icon: 'none' };
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
    const toast = { title: '当前网络异常，请稍后重试', icon: 'none' };
    Taro.showToast(toast);
  },
  initialState: {}
}, (app) => {
  configure(app);
})


//获取store
const store = app.getStore()


class App extends Component {

  public config: Config = {
    pages: [
      // 'pages/setting/index',
      'pages/main/index',
      'pages/mine/index',
      'pages/register/index',
      'pages/login/index',
      'pages/setting/index',
      'pages/news/index',
      'pages/mycomment/index',
      'pages/attention/index',
      'pages/record/index',
      'pages/detail/index',
      'pages/comment/index',
      'pages/user/index',
      'pages/search/index',
      'pages/type/index',
      'pages/rank/index',
      'pages/store/index',
      'pages/commentdetail/index',
      'pages/issue/index',
      'pages/userissue/index'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black',
      backgroundColor: '#000',
      backgroundColorTop: 'black',
      onReachBottomDistance: 50
    },
    tabBar: {
      "color": "black",
      "selectedColor": "#ff6600",
      "list": [
        {
          "pagePath": "pages/main/index",
          "text": "首页",
          "iconPath": "./assets/home-icon.png",
          "selectedIconPath": './assets/home-icon-active.png'
        },
        {
          "pagePath": "pages/issue/index",
          "text": "发布",
          "iconPath": "./assets/issue-icon.png",
          "selectedIconPath": './assets/issue-icon-active.png'
        },
        {
          "pagePath": "pages/mine/index",
          "text": "我的",
          "iconPath": "./assets/mine-icon.png",
          "selectedIconPath": './assets/mine-icon.png'
        }
      ]
    },
  }

  public componentWillMount = async () => {
    // if( process.env.TARO_ENV === 'weapp' ){
    //   Taro.cloud.init({traceUser: true})
    // }

    const dispatch = dva.getDispatch();

    await Taro.showLoading({mask: true, title: '加载中'})
    if( !includes(['/my'], router.getOptions().alias) ) {
       // 获取个人详情判断是否已经登录
      await dispatch({ type: 'global/getUserInfo'});
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

Taro.render(<App />, document.getElementById('app'))
