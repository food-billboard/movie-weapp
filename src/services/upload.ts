import {request} from '~utils'

//普通文件上传
export const uploadFile = ({ auth="PUBLIC", ...nextFiles }) => {
  return request('POST', '/api/customer/upload', { data: { auth, ...nextFiles } })
}

//分片上传预查
export const uploadChunkFileCheck = (query) => {
  return request('GET', '/api/customer/upload/chunk', { query })
}

//分片上传
export const uploadChunkFile = ({ name, index, file }) => {
  return request('POST', '/api/customer/upload/chunk', { data: { name, index, file } })
}

//分片上传完成
export const uploadChunkFileComplete = (name) => {
  return request('PUT', '/api/customer/upload/chunk', { data: { name } })
}