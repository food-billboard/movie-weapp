/**
 * 电影头部组件
 * props: {
 *  content: 内容
 *  style: 样式
 * }
 * content: {
 *  name: 电影名称
 *  detail: 介绍详情内容
 *  image: 图片
 *  id: 电影id
 * }
 */

interface IContent {
  name: string,
  detail: string,
  image: string,
  id: string  
}

export interface IProps {
  content: IContent
  style?: {} | object
}

export interface IState {
  
}