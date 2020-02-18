/**
 * 内容随点击更换按钮
 * props: {
 *  value: 按钮上的内容
 *  active: 当前活跃的内容的key值
 *  type: 按钮类型
 *  color: 按钮颜色
 *  operate: 按钮点击事件
 *  style: 按钮样式
 * }
 * 
 * state: {
 *  active: 按钮当前活跃的key
 * }
 */

type primary = 'primary'
type secondary = 'secondary'

export interface IProps {
    value: Array<string>
    active: number
    type: primary | secondary | undefined
    operate?: (...args: any) => any
    style?: object
}

export interface IState {
    active: number
}