import { request, getToken } from '~utils'
import Taro from '@tarojs/taro'

// //分片上传预查
// export const uploadChunkFileCheck = (query) => {
//   return request('GET', '/api/customer/upload/chunk', { query, header: getToken(true) })
// }

// //分片上传
// export const uploadChunkFile = (data) => {
//   return request('POST', '/api/customer/upload/chunk', { data, header: getToken(true) })
// }

// //分片上传完成
// export const uploadChunkFileComplete = (name) => {
//   return request('PUT', '/api/customer/upload/chunk', { data: { name, header: getToken(true) } })
// }

export const checkUploadFile = async (params: API_UPLOAD.ICheckUploadFileParams) => {
  const {  } = params 
  return request('HEAD', '/api/customer/upload', {  })
  .then(data => {

  })
}

export const uploadFile = async (params: API_UPLOAD.IUploadParams) => {
  const {  } = params 
  return request('PATCH', '/api/customer/upload', {  })
  .then(data => {

  })

}