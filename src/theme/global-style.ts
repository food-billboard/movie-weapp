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

type TLine = 'solid' | 'dashed'

type TType = 'day' | 'night'

const defaultBorder = {
  borderBottom: '',
  borderLeft: '',
  borderRight: '',
  borderTop: ''
}

export const colorChange = (type: TType) => {
  if(type === 'day') {
    TypeColor = { ...TypeColor, ...dayTypeColor }
  }else {
    TypeColor = { ...TypeColor, ...nightTypeColor }
  }
}

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