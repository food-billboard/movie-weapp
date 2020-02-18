import { FormData } from '../../interface'
/**
 * 二层筛选
 * props: {
 *  sortScreen: 排序筛选
 *  showMethod: 展示形式筛选
 *  queryScreen: 详细筛选方式
 * }
 */

export interface IProps {
  sortScreen: (value: string) => void
  showMethod: () =>void
  queryScreen: (formData: FormData) => void
}