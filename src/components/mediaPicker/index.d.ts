/**
 * 图片和视频上传组件
 * props: {
 *  files: 原始文件
 *  length: 单行数量
 *  style: 样式
 *  width: 图片宽度
 *  height: 图片高度
 *  close: 是否需要关闭按钮
 * }
 * 
 * state: {
 *  items: 文件列表
 *  maxCount: 问价数量
 *  error: 控制错误
 *  activeVieo: 当前预览视频
 *  isVideo: 控制是视频组件显示隐藏
 * }
 * 
 * file:{
 *  path: 文件地址
 *  size: 文件大小
 * }
 * 
 * item: {
 *  url: we年地址
 *  file: 文件详情
 *  type: 媒体类型
 *  poster: 视频海报
 * }
 */

 import { ICommonFormProps, ICommonFormState } from '~utils'

 export type TType = 'video' | 'image'

export interface IFile {
  path: string,
  size: number
}

 export interface IItem {
  url: string
  file?: IFile
  type: TType
  poster?: string
 }

 export interface IProps extends ICommonFormProps {
  initialValue?: Array<IItem>
  value?: Array<IItem>
  length?: number
  style?: any
  width?: number | false
  height?:number | false
  close?: boolean
}

 export interface IState extends ICommonFormState {
   value: Array<IItem>
   maxCount: number
   activeVideo: string
   isVideo: boolean
 }