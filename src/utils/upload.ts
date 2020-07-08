import { Upload  } from 'chunk-file-upload'
import { uploadFile, uploadChunkFileCheck, uploadChunkFile, uploadChunkFileComplete } from '~services'
import Taro from '@tarojs/taro'
import { AuthType } from './globalType'

const uploadTarget = new Upload()
const fileManager = Taro.getFileSystemManager()
const MAX_FILE_SIZE = 1024 * 1024 * 5

//读取临时文件地址获取文件
const readFile = (tempPath) => {
  return fileManager.readFileSync(tempPath)
}

const exitDataFn = (data: { suffix: string, chunksLength: number, size: number, auth: keyof typeof AuthType }) => {
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
  file: string,
  mime: string
}

const miniFileUpload = (task: ITask) => {
  const { file, mime } = task
  const blob = new Blob([file], { type: mime })
  const formData = new FormData()
  formData.append(file, blob)
  return uploadFile(formData)
}

const largeFileUpload = (task: ITask) => {
  const baseConfig = {
    exitDataFn: exitDataFn,
    uploadFn: uploadFn,
    completeFn: completeFn,
    callback: callback
  }
  const { file, mime } = task
  return uploadTarget.upload({
    ...baseConfig,
    file,
    mime,
  })
}

const upload = (task:ITask) => {
  const { file } = task
  const realFile = readFile(file)
  const len = realFile instanceof ArrayBuffer ? realFile.byteLength : realFile.length
  if(len > MAX_FILE_SIZE) {
    return miniFileUpload(task)
  }else {
    return largeFileUpload(task)
  }
}

export default upload