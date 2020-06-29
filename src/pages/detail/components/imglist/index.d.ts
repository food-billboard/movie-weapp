/**
 * 图片列表
 * props: {
 *  list: 图片列表
 * }
 * 
 * list: {
 *  image: 图片
 *  id: 图片id
 * }
 * state: {
 *  imageList: 图片
 * }
 */
// export interface IList {
//   image: string,
//   id: string
// }

export interface IProps {
  list: Array<string>
}

export interface IState {
  imageList: Array<string>
}