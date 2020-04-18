import Taro from '@tarojs/taro'
import { Toast } from '~components/toast'

class Worker {

  instance

  worker

  constructor(path) {
    if(this.instance) {
      Toast({
        title: '当前有worker未关闭，请关闭',
        icon: 'none',
        duration: 3000
      })
      this.close()
    }
    this.init(path)
  }

  init = (path) => {
    this.instance = this
    this.worker = Taro.createWorker(path)
  }

  close = () => {
    this.worker && this.worker.terminate()
    this.instance = null
    this.worker = null
  }

  postMessage = (data) => {
    this.worker.postMessage(data)
  }

  onMessage = (callback) => {
    this.worker.onMessage(callback)
  }

}



export function createWorker(path) {
  return new Worker(path)
}