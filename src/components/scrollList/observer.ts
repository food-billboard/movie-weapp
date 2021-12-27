import Taro from '@tarojs/taro'
import { merge } from 'lodash'

export class Observer {

  public observer: Taro.IntersectionObserver

  private readonly defaultOptions = {} 

  constructor(component: any, options?: Partial<Taro.createIntersectionObserver.Option>) {
    const config = Object.assign({}, this.defaultOptions, options || {})
    this.observer = Taro.createIntersectionObserver(component, config)
  }

}