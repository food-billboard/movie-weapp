import Taro from '@tarojs/taro'
import SparkMd5 from 'spark-md5'
import { merge } from 'lodash'
import Mime from 'mime'
import { uploadFile, checkUploadFile, getMediaData } from '~services'
import { EMediaType, API_DOMAIN } from '../globalType'

const objectIdReg = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i

export const isObjectId = (str: string) => objectIdReg.test(str)

/**
 * 1 文件路径传入
 * 2 分段读取文件
 * 3 通过spark-md5来对每一段内容进行加密，并添加至数组
 * 4 得到MD5名称
 * 5 检查请求
 * 6 对未上传文件进行上传（以base64传递）
 */

export type TOiriginFileType = {
  url: string 
  type: EMediaType
  [key: string]: any
}

export type TResultType = TOiriginFileType & {
  success: boolean 
  url: string 
  type: EMediaType
}

const DEFAULT_TOTAST_CONFIG: Taro.showToast.Option = {
  title: '文件上传错误',
  icon: 'none',
  duration: 1000,
  complete() {
    UploadTask.toast = false 
  }
}

class UploadTask {

  constructor(file: string) {
    if(this.instance) return this.instance
    this.file = file 
    this.instance = this 
    return this.instance
  }

  static MAX_UPLOAD_FILE_SIZE = 1024 * 1024 * 5
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
    auth: "PUBLIC"
  }

  toast = (config: Partial<Taro.showToast.Option>={}) => {
    if(UploadTask.toast) return 
    UploadTask.toast = true
    Taro.showToast(merge({}, DEFAULT_TOTAST_CONFIG, config))
  }

  start: () => Promise<string | false> = async () => {
    if(isObjectId(this.file)) return this.file 
    if(this.file.startsWith(API_DOMAIN)) {
      try {
        const data = await getMediaData({ load: this.file })
        return data
      }catch(err) {
        this.toast()
        return false 
      }
    }
    return this.setBaseFileInfo()
    .then(this.fileUpload)
    .catch(_ => {
      console.log(_)
      this.toast()
      return false 
    })
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

  exitDataFn = () => {
    const { size, mime, auth, md5 } = this.fileInfo
    return checkUploadFile({
      auth,
      mime,
      chunk: UploadTask.MAX_UPLOAD_FILE_SIZE,
      md5,
      size,
      name: md5
    })
  }

  uploadFn = async ({ offset }: { offset: number | string }) => {
    const { size, md5 } = this.fileInfo
    const chunkSize = UploadTask.MAX_UPLOAD_FILE_SIZE
    const realOffset = typeof offset === 'string' ? parseInt(offset) : offset
    let data: any = await this.readFile({
      start: realOffset,
      length: (realOffset + chunkSize >= size) ? size - realOffset : chunkSize
    })
    let response 
    try {
      response = await uploadFile({
        md5,
        file: data as ArrayBuffer,
        offset: realOffset
      })
    }catch(err) {
      console.log(err)
    }finally {
      data = null 
    }
    const nextOffset = response["upload-offset"] ?? response["Upload-Offset"]
    if(nextOffset >= size) return 
    return this.uploadFn({ offset: nextOffset }) 
  }

  fileUpload = async () => {
    const { size } = this.fileInfo
    const exitResData = await this.exitDataFn()
    const offset = exitResData["upload-offset"] ?? exitResData["Upload-Offset"]
    // const uploadLength = exitResData["upload-length"]
    const fileId = exitResData["upload-id"] ?? exitResData["Upload-Id"]

    //上传完成
    if(offset == size) {
      return fileId
    }
    //未完成
    else {
      return this.uploadFn({ offset })
      .then(() => fileId)
    }
  }

}

export const Upload = async (file: TOiriginFileType | TOiriginFileType[]): Promise<TResultType[]> => {
  const files = Array.isArray(file) ? file : [file]
  let results:TResultType[] = []
  for(let i = 0; i < files.length; i ++) {
    const currentFile = files[i]
    const { url, type, ...nextFile } = currentFile 
    const task = new UploadTask(url)
    const result = await task.start()
    results.push({
      ...nextFile,
      success: !!result,
      url: !!result ? result : url,
      type,
    })
  }
  return results
}