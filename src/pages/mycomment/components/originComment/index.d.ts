import { source_type } from './index'
/**
 * 原始评论简介
 * props: {
 *  info: 相关信息
 * }
 */

 export interface IProps {
  info: {
    source_type: keyof typeof source_type
    source: {
      _id: string
      content: string | null
    }
  }
 }