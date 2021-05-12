import { uploadFile, checkUploadFile } from '~services'
import Taro from '@tarojs/taro'
import SparkMd5 from 'spark-md5'
import { merge } from 'lodash'
import { WeUpload } from 'chunk-file-upload'
import { EAuthType, EMediaType } from '../globalType'
import Mime from 'mime'
import { getTemplatePathMime } from '../tool'

/**
 * 1 文件路径传入
 * 2 分段读取文件
 * 3 通过spark-md5来对每一段内容进行加密，并添加至数组
 * 4 得到MD5名称
 * 5 检查请求
 * 6 对未上传文件进行上传（以base64传递）
 */

interface ITask {
  file: Array<ArrayBuffer>
  mime: string
  md5: string
  size: number
}

let UploadInstance

export type TOiriginFileType = {
  url: string 
  type: EMediaType
  [key: string]: any
}

export type TResultType = {
  success: boolean 
  url: string 
  type: EMediaType
}

class UploadTask {

  constructor(file: string) {
    if(this.instance) return this.instance
    this.file = file 
    this.instance = this 
    return this.instance
  }

  static MAX_UPLOAD_FILE_SIZE = 1024 * 500
  static MAX_READ_FILE_SIZE = 1024 * 1024 * 5
  static toast = false

  fileManager = Taro.getFileSystemManager()
  spark: SparkMd5.ArrayBuffer

  instance: UploadTask
  file: string  
  fileInfo: {
    [key: string]: any
  } = {
    chunk: UploadTask.MAX_UPLOAD_FILE_SIZE,
    "tus-resumable": "1.0.0",
    auth: "PUBLIC"
  }

  start = async () => {
    return this.setBaseFileInfo()
    .then(_ => {

    })
    // let sizeList:Array<any> = []
    // let now = 0
    // let spark = new SparkMd5.ArrayBuffer()

    // while(now < size) {
    //   let data
    //   if(now + MAX_FILE_SIZE >= size) {
    //     data = await readFile(file, now)
    //     now = size
    //   }else {
    //     data = await readFile(file, now, MAX_FILE_SIZE)
    //     now += MAX_FILE_SIZE
    //   }
    //   spark.append(data)
    //   sizeList.push(data)
    // }

    // const md5 = spark.end()
    // if(size <= MAX_FILE_SIZE) {
    //   return miniFileUpload({
    //     file: sizeList, 
    //     mime,
    //     md5,
    //     size
    //   })
    // }else {
    //   return largeFileUpload({
    //     file: sizeList, 
    //     mime,
    //     md5,
    //     size,

    //   })
    // }
  }

  //读取临时文件地址获取文件
  readFile = async ({
    start,
    encoding,
    length
  }: {
    start: number, 
    length?: number
    encoding?: string 
  }): Promise<string | ArrayBuffer> => {
    return new Promise((resolve, reject) => {
      let config:any = {
        filePath: this.file,
        position: start,
        success: function(res: any) {
          resolve(res.data)
        },
        fail: reject
      } 
      if(encoding) config.encoding = encoding 
      if(length) config.length = length
      this.fileManager.readFile(config)
    })
  }

  getMd5 = async () => {
    const { size } = this.fileInfo
    const chunkSize = UploadTask.MAX_READ_FILE_SIZE
    const length = Math.ceil(size / chunkSize)
    for(let i = 0; i < length; i ++) {
      const start = chunkSize * i 
      const data = await this.readFile({ start, length: (start + chunkSize >= size) ? size - start : chunkSize }) as ArrayBuffer
      this.encryption(data)
    }
    return this.getResult()
  }

  encryption(data: ArrayBuffer) {
    if(!this.spark) this.spark = new SparkMd5.ArrayBuffer()
    this.spark.append(data)
  }

  getResult(destroy: boolean=true) {
    const result = this.spark?.end()
    if(destroy) this.spark?.destroy()
    return result
  }

  setBaseFileInfo = async () => {
    const fileSize = await this.getFileSize()
    const mime = Mime.getType(this.file) 
    this.fileInfo = merge({}, this.fileInfo, {
      size: fileSize,
      mime,
    })
    const md5 = await this.getMd5()
    this.fileInfo.md5 = md5
  }

  //获取文件消息
  getFileSize = async () => {
    return new Promise((resolve, reject) => {
      const config: any = {
        filePath: this.file,
        success: resolve,
        fail: reject
      }
      this.fileManager.getFileInfo(config)
    })
    .then((data: any) => (data.size))
  }

  exitDataFn = (data: { suffix: string, chunksLength: number, size: number, auth: EAuthType }) => {
    return checkUploadFile(data)
  }

  uploadFn = (data: any) => {
    return uploadFile(data)
  }

  completeFn = (params: { name: string, md5: string }) => {

  }

  fileUpload = async (task: ITask) => {
    const { file, mime, md5, size } = task
    const exit = await this.exitDataFn({ suffix: mime, chunksLength: file.length, size, auth: EAuthType.PUBLIC })
    //上传完成
    if(typeof exit == 'string') {
      return exit
    }
    //未完成
    else {
      return Promise.all(file.map((item, index) => {
        const formData = {
          file: Taro.arrayBufferToBase64(item),
          name: md5,
          index: index.toString()
        }
        // let formData = new FormData()
        // formData.append('file', Taro.arrayBufferToBase64(item))
        // formData.append('name', md5)
        // formData.append('index', index.toString())
        return this.uploadFn(formData)
      }))
      .then(_ => this.completeFn({ name: md5, md5 }))
      .catch(_ => {
        console.log(_)
        if(!UploadTask.toast) {
          UploadTask.toast = true 
          Taro.showToast({
            title: '上传出错',
            icon: 'none',
            duration: 1000,
            complete: () => {
              UploadTask.toast = false
            }
          })
        }
        return null
      })
    }
  }

}

export const Upload = async (file: TOiriginFileType | TOiriginFileType[]): Promise<TResultType[]> => {
  const files = Array.isArray(file) ? file : [file]
  if(!UploadInstance) UploadInstance = new WeUpload()
  let results:TResultType[] = []
  for(let i = 0; i < files.length; i ++) {
    const file = files[i]
    const { url, type } = file 
    const task = new UploadTask(url)
    const result = await task.start()
    results.push({
      success: !!result,
      url: result,
      type
    })
  }
  return Promise.resolve(results)
}