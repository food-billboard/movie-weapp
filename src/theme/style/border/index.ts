import { TypeColor, TTypeColor } from '../../color'
//border方位
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

//默认的border样式
const defaultBorder = {
  borderBottom: '',
  borderLeft: '',
  borderRight: '',
  borderTop: ''
}

//border 线型样式
type TLine = 'solid' | 'dashed'

export default (size: number, type: keyof TTypeColor = 'primary', line: TLine = 'solid', direction: keyof typeof Direction) => {
  const typeColor = TypeColor()
  let data = { ...defaultBorder }
  Direction[direction].map(val => {
    data[ 'border' + val ] = `${size}px ${line} ${typeColor[type]}`
  })
  return data
}