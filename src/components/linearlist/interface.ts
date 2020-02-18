import { AtIconBaseProps } from 'taro-ui/@types/base'
/**
 * 列表形式组件
 * props: {
 *  list: 列表内容
 * }
 * 
 * list: {
 *  title: 标题
 *  disabled: 控制禁止
 *  note: 额外内容
 *  arrow: 箭头方向
 *  iconInfo: 图标信息
 *  handle: 点击处理方法
 *  id: 配置id
 * }
 * 
 * iconInfo: {
 *  size: 图标大小
 * }
 */

type up = 'up'
type right = 'right'
type down = 'down'

interface IconInfo extends AtIconBaseProps{
    // value: string, 
    size?: string | number, 
    // color?: string, 
    // prefixClass?: string,
    // className?: string,
    // customStyle?: string
}

interface IList {
    title: string,
    disabled?: boolean,
    note?: string,
    arrow?: up | down | right | undefined,
    iconInfo: IconInfo,
    handle?: any,
    id: string
}   

export interface IProps {
    list: Array<IList>
}