export type right = 'right'
export type up = 'up'
export type down = 'down'
export type undefined = 'undefined'
export interface IIconInfo {
  value: string,
  size: number | string, 
  color: string
}
export default interface ISetting {
    title: string
    disabled: boolean
    note?: string | ''
    arrow: right | up | down | undefined
    iconInfo: IIconInfo,
    handle: () => any,
    id: string
}