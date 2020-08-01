import { uploadFile, uploadChunkFileCheck, uploadChunkFile, uploadChunkFileComplete } from '~services'
import Taro from '@tarojs/taro'
import { EAuthType, EMediaType } from './globalType'
import SparkMd5 from 'spark-md5'
import { getTemplatePathMime } from './tool'


/**
 * 1 文件路径传入
 * 2 分段读取文件
 * 3 通过spark-md5来对每一段内容进行加密，并添加至数组
 * 4 得到MD5名称
 * 5 检查请求
 * 6 对未上传文件进行上传（以base64传递）
 */

const fileManager = Taro.getFileSystemManager()
const MAX_FILE_SIZE = 1024 * 1024 * 5

//读取临时文件地址获取文件
const readFile = (tempPath, start, length?) => {
  return new Promise((resolve, reject) => {
    const config:any = {
      filePath: tempPath,
      position: start,
      ...(length ? { length } : {}),
      success: function(res) {
        const { data } = res
        resolve(data)
      },
      fail: reject
    } 
    fileManager.readFile(config)
  })
}

//获取文件消息
const getFileInfo = (tempPath) => {
  return new Promise((resolve, reject) => {
    const config: any = {
      filePath: tempPath,
      success: resolve,
      fail: reject
    }
    fileManager.getFileInfo(config)
  })
  .then((data: any) => data.size)
  .catch(_ => false)
}

const exitDataFn = (data: { suffix: string, chunksLength: number, size: number, auth: EAuthType }) => {
  return uploadChunkFileCheck(data)
}

const uploadFn = (data: any) => {
  return uploadChunkFile(data)
}

const completeFn = (data: { name: string, md5: string }) => {
  return uploadChunkFileComplete(data)
}

const callback = (err, rest) => {
  if(err) {
    console.log('失败了')
  }
  return true
}

interface ITask {
  file: Array<ArrayBuffer>
  mime: string
  md5: string
  size: number
}

const miniFileUpload = async (task: ITask) => {
  const { file, md5, mime } = task
  const formData = {
    file: Taro.arrayBufferToBase64(file[0]),
    name: md5,
    mime,
    auth: 'PUBLIC'
  }
  // const formData = new FormData()
  // formData.append('file', Taro.arrayBufferToBase64(file[0]))
  // formData.append('name', md5)
  // formData.append('auth', 'PUBLIC')
  return uploadFile(formData)
}

const largeFileUpload = async (task: ITask) => {
  const { file, mime, md5, size } = task
  const exit = await exitDataFn({ suffix: mime, chunksLength: file.length, size, auth: EAuthType.PUBLIC })
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
      return uploadFn(formData)
    }))
    .then(_ => completeFn({ name: md5, md5 }))
    .catch(_ => {
      console.log(_)
      return null
    })
  }
}


const upload = async (file: string) => {
  const size = await getFileInfo(file)
  const mime = getTemplatePathMime(file)
  if(!size) {
    Taro.showToast({ mask: false, title: '文件不合理' })
    return 
  }

  let sizeList:Array<any> = []
  let now = 0
  let spark = new SparkMd5.ArrayBuffer()

  while(now < size) {
    let data
    if(now + MAX_FILE_SIZE >= size) {
      data = await readFile(file, now)
      now = size
    }else {
      data = await readFile(file, now, MAX_FILE_SIZE)
      now += MAX_FILE_SIZE
    }
    spark.append(data)
    sizeList.push(data)
  }

  const md5 = spark.end()
  if(size <= MAX_FILE_SIZE) {
    return miniFileUpload({
      file: sizeList, 
      mime,
      md5,
      size
    })
  }else {
    return largeFileUpload({
      file: sizeList, 
      mime,
      md5,
      size,

    })
  }
}

export default upload