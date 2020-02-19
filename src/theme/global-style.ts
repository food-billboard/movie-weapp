export let TypeColor = {
  'primary':'#cc9f01',
  'secondary': '#ffc701',
  'disabled': '#FFFFE0',
  'thirdly': '#ffd541',
  'bgColor': '#FFFFF0'
}

const dayTypeColor = {
  'primary':'#cc9f01',
  'secondary': '#ffc701',
  'disabled': '#FFFFE0',
  'thirdly': '#ffd541',
  'bgColor': '#FFFFF0'
}

const nightTypeColor = {
  'primary':'#353436',
  'secondary': '#424143',
  'disabled': '#F5F5F5',
  'thirdly': '#717172',
  'bgColor': '#fff'
}

//色调类型 蓝黑黄红
export const Color = ['#6190E8', '#424143', '#FFC701', '#E93B3D']

const typeColor = {
  6190E8: {
    'primary':'#',
    'secondary': '#',
    'disabled': '#',
    'thirdly': '#',
    'bgColor': '#'
  },
  424143: { ...nightTypeColor },
  FFC701: { ...dayTypeColor },
  E93B3D: {
    'primary':'#',
    'secondary': '#',
    'disabled': '#',
    'thirdly': '#',
    'bgColor': '#'
  }
}

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
type TType = 'day' | 'night' | false

//默认的border样式
const defaultBorder = {
  borderBottom: '',
  borderLeft: '',
  borderRight: '',
  borderTop: ''
}

//色调修改
export const colorChange = (type: TType, color: string='#6190E8') => {
  if(type === 'day') {
    TypeColor = { ...TypeColor, ...dayTypeColor }
  }else if(type === 'night'){
    TypeColor = { ...TypeColor, ...nightTypeColor }
  }else {
    TypeColor = { ...TypeColor, ...typeColor[color.slice(1)] }
  }
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