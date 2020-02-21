/**
 * 视频组件
 * props: {
 *  src: 视频地址
 *  controls: 是否可控
 *  autoplay: 是否自动播放
 *  poster: 海报
 *  initialTime: 初始时间
 *  id: 视频id
 *  loop: 是否循环播放
 *  muted: 是否静音
 *  style: 样式
 * }
 */
export interface IProps {
  src: string,
  controls?: boolean,
  autoplay?: boolean,
  poster: string,
  initialTime?: number,
  id?: string,
  loop?: boolean,
  muted?: boolean,
  style?: any
}