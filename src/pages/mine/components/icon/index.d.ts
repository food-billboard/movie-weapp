import { AtIconBaseProps } from 'taro-ui/@types/base'
/**
 * 图标列表
 * props: {
 *  id: 用户id
 * }
 * 
 * list: {
 *  image: 图片
 *  value: 内容
 *  iconInfo: 图标信息
 * }
 * 
 * IIconInfo: 【
 *  size: 图标大小
 * 
 */
interface IIconInfo extends AtIconBaseProps {
  size?: string | number
}

export interface List {
  image?: string
  value: string
  iconInfo?: any | IIconInfo
}

export interface IProps {
  
}