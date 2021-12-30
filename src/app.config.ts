export default {
  pages: [
    'pages/main/index',
    'pages/mine/index',
    'pages/news/index',
    'pages/setting/index',
    'pages/adminSetting/index'
  ],
  window: {
    backgroundTextStyle: 'dark',
    navigationBarTextStyle: 'black',
    navigationBarBackgroundColor: '#fff',
    onReachBottomDistance: 25,
    enablePullDownRefresh: false
  },
  tabBar: {
    "color": "black",
    "selectedColor": "#ff6600",
    "list": [
      {
        "pagePath": "pages/main/index",
        "text": "首页",
        "iconPath": "./assets/home.png",
        "selectedIconPath": './assets/home-active.png'
      },
      {
        "pagePath": "pages/news/index",
        "text": "消息",
        "iconPath": "./assets/message.png",
        "selectedIconPath": './assets/message-active.png'
      },
      {
        "pagePath": "pages/mine/index",
        "text": "我的",
        "iconPath": "./assets/mine.png",
        "selectedIconPath": './assets/mine-active.png'
      }
    ]
  },

  "subpackages": [
    {
      "root": "pages/wrapper-login",
      "pages": [
        'login/index',
        'register/index',
        'forget/index',
      ]
    },
    {
      "root": "pages/wrapper-comment",
      "pages": [
        'mycom/index',
        'commovie/index',
        'comdetail/index',
        'comment/index'
      ]
    },
    {
      "root": "pages/wrapper-data",
      "pages": [
        'record/index',
        'detail/index',
        'search/index',
        'type/index',
        'rank/index',
        'store/index',
        'issue/index',
        'userissue/index',
        'special/index',
        'indexes/index'
      ]
    },
    {
      "root": "pages/wrapper-user",
      "pages": [
        'attention/index',
        'user/index',
        'fans/index',
      ]
    }
  ]
}