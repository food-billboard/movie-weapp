import { upload as Upload } from 'chunk-file-upload'
import { uploadFile, uploadChunkFileCheck, uploadChunkFile, uploadChunkFileComplete } from '~services'
import Taro from '@tarojs/taro'
import { AuthType } from './globalType'

const uploadTarget = new Upload()
const fileManager = Taro.getFileSystemManager()

//读取临时文件地址获取文件
const readFile = async (...tempPath) => {
  let chunkList = []
  let miniList = []
  tempPath.forEach(path => {
    const data = fileManager.readFileSync(path, /**编码方式 */)
    const fileInfo = fileManager.getFileInfo({ filePath: path, success: () =>  })
    return {
      info: fileInfo,
      data
    }
  })

  const miniData = await miniFileUpload(miniList)
  const chunkData = await upload(chunkList)

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

const miniFileUpload = async (data) => {
  return uploadFile(data)
}

const upload = (...files) => {
  const baseConfig = {
    exitDataFn: this.exitDataFn,
    uploadFn: this.uploadFn,
    completeFn: this.completeFn,
    callback: this.callback
  }
  return uploadTarget.upload(files.map(file => ({
    ...baseConfig,
    file
  })))
  .then(_ => ({
    
  }))
}

upload.prototype.exitDataFn = exitDataFn
upload.prototype.uploadFn = uploadFn
upload.prototype.completeFn = completeFn
upload.prototype.callback = callback

export default upload