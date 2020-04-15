import Taro from '@tarojs/taro'
//图片添加配置
export const IMAGE_CONFIG = {
  count: 6,
  sizeType: ['original', 'compressed'],
  sourceType: ['album', 'camera']
}

//表单提示样式
export const FORM_ERROR = {
  border: '2px solid red',
  boxShadow: '0 0 2px red'
}

//设置大小修改图标
export const SYSTEM_PAGE_SIZE = (basicSize: number=14) => {
  const { screenWidth } = Taro.getSystemInfoSync()
  if(screenWidth < 300) {
    return basicSize * 0.7
  }else if(screenWidth >= 300 && screenWidth < 700) {
    return basicSize
  }else if(screenWidth >= 700) {
    return basicSize * 2
  }else {
    return basicSize
  }
}

