export default {
  pages: [
    'pages/main/index',
    'pages/mine/index',
    'pages/news/index',
    
    // 'pages/setting/index',
    // 'pages/mycom/index',
    // 'pages/attention/index',
    // 'pages/record/index',
    // 'pages/detail/index',
    // 'pages/commovie/index',
    // 'pages/user/index',
    // 'pages/search/index',
    // 'pages/type/index',
    // 'pages/rank/index',
    // 'pages/store/index',
    // 'pages/comdetail/index',
    // 'pages/issue/index',
    // 'pages/userissue/index',
    // 'pages/special/index',
    // 'pages/fans/index',
    // 'pages/newsdetail/index',
    // 'pages/login/index',
    // 'pages/register/index',
    // 'pages/comment/index'
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
        "iconPath": "./assets/home-icon.png",
        "selectedIconPath": './assets/home-icon-active.png'
      },
      {
        "pagePath": "pages/news/index",
        "text": "消息",
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

  "subpackages": [
    {
      "root": "pages/wrapper-login",
      "pages": [
        'login/index',
        'register/index',
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
      ]
    },
    {
      "root": "pages/wrapper-user",
      "pages": [
        'attention/index',
        'user/index',
        'fans/index',
      ]
    },
    // {
    //   "root": "pages/wrapper-message",
    //   "pages": [
    //     'pages/newsdetail/index',
    //   ]
    // }
  ]
}