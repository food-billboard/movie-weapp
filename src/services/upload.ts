import { request, getToken } from '~utils'

//普通文件上传
export const uploadFile = (data) => {
  return request('POST', '/api/customer/upload', { data, header: getToken(true) })
}

//分片上传预查
export const uploadChunkFileCheck = (query) => {
  return request('GET', '/api/customer/upload/chunk', { query, header: getToken(true) })
}

//分片上传
export const uploadChunkFile = (data) => {
  return request('POST', '/api/customer/upload/chunk', { data, header: getToken(true) })
}

//分片上传完成
export const uploadChunkFileComplete = (name) => {
  return request('PUT', '/api/customer/upload/chunk', { data: { name, header: getToken(true) } })
}