import { setStyle } from '~config'
import Taro from '@tarojs/taro'
//小程序色调
export let TypeColor = {
  'primary':'#cc9f01',
  'secondary': '#ffc701',
  'disabled': '#FFFFE0',
  'thirdly': '#ffd541',
  'bgColor': '#FFFFF0'
}

//色调类型 蓝黑黄红
export const Color = ['#6190E8', '#424143', '#FFC701', '#E93B3D']

//分类色调
const typeColor = {
  '#6190E8': {
    'primary':'#78A4F4',
    'secondary': '#6190E8',
    'disabled': '#b4d3fc',
    'thirdly': '#346FC2',
    'bgColor': '#d2e2f8'
  },
  '#424143': {   //夜
    'primary':'#353436',
    'secondary': '#424143',
    'disabled': '#e6e6e6',
    'thirdly': '#717172',
    'bgColor': '#aeb3b3'
   },
  '#FFC701': {   //日
    'primary':'#cc9f01',
    'secondary': '#ffc701',
    'disabled': '#FFFFE0',
    'thirdly': '#ffd541',
    'bgColor': '#FFFFF0'
   },
  '#E93B3D': {
    'primary':'#ef6c6e',
    'secondary': '#e93b3d',
    'disabled': '#ea9b9b',
    'thirdly': '#ba2f31',
    'bgColor': '#eac0c0'
  }
}

//日色调
const dayTypeColor = {...typeColor['#FFC701']}

//夜色调
const nightTypeColor = {...typeColor['#424143']}

const Direction = {
  all: [ 'Top', 'Bottom', 'Left', 'Right' ],
  top: ['top'],
  bottom: ['Bottom'],
  left: ['Left'],
  right: ['Right'],
  top_left:['Top', 'Left'],
  top_bottom: ['Top', 'Bottom'],
  left_bottom: ['Left', 'Bottom'],
  left_right: ['Left', 'Right'],
  bottom_right: ['Bottom', 'Right'],
  no_top: ['Left', 'Right', 'Bottom'],
  no_left: ['Top', 'Right', 'Bottom'],
  no_right: ['Top', 'Left', 'Bottom'],
  no_bottom: ['Top', 'Right', 'Left']
} 

//border 线型样式
type TLine = 'solid' | 'dashed'

//色调开启时的色调类型
// type TType = 'day' | 'night' | false
export const dateTypeList = {
  day: Symbol(),
  night: Symbol()
}

//默认的border样式
const defaultBorder = {
  borderBottom: '',
  borderLeft: '',
  borderRight: '',
  borderTop: ''
}

//色调修改
export const colorChange = (type, color: string='#6190E8') => {
  if(type === dateTypeList.day) {
    TypeColor = { ...TypeColor, ...dayTypeColor }
    setStyle(false)
  }else if(type === dateTypeList.night){
    TypeColor = { ...TypeColor, ...nightTypeColor }
    setStyle(false)
  }else {
    TypeColor = { ...TypeColor, ...typeColor[color] }
    setStyle(color)
  }
  Taro.setBackgroundColor({
    backgroundColorTop: TypeColor['bgColor'], // 顶部窗口的背景色为白色
    backgroundColorBottom: TypeColor['bgColor'], // 底部窗口的背景色为白色
  })
  return TypeColor
}

//样式库
export const style = {
    border: (size: number, type: keyof typeof TypeColor = 'primary', line: TLine = 'solid', direction: keyof typeof Direction) => {
      let data = { ...defaultBorder }
      Direction[direction].map(val => {
        data[ 'border' + val ] = `${size}px ${line} ${TypeColor[type]}`
      })
      return data
    },

    color: (type: keyof typeof TypeColor='primary') => {
      return {
        color: `${TypeColor[type]}`
      }
    },

    backgroundColor: (type: keyof typeof TypeColor='primary') => {
      return {
        backgroundColor: `${TypeColor[type]}`
      }
    }
}