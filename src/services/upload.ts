import { merge } from 'lodash'
import { request, getToken, encoder } from '~utils'

function string2Base64(str: string) {
  return encoder(str)
}

const DEFAULT_CHECK_UPLOAD_PARAMS = {
  auth: 'PUBLIC',
  chunk: 1024 * 1024 * 5
}

function mergeMetaData(params: { [key: string]: any }) {
  const data = Object.entries(params).reduce((acc, cur) => {
    const [ key, value ] = cur
    const realValue = typeof value === 'string' ? value : value.toString()
    acc.push(`${key} ${string2Base64(realValue)}`)
    return acc 
  }, [] as any)
  return {
    ['Upload-Metadata']: data.join(',')
  }
}

export const checkUploadFile = async (params: Partial<API_UPLOAD.ICheckUploadFileParams>) => {
  const newParams = merge({}, DEFAULT_CHECK_UPLOAD_PARAMS, params)
  return request<{ header: API_UPLOAD.ICheckUploadFileRes, [key: string]: any }>('HEAD', '/api/customer/upload', {
    header: merge({}, getToken(true), { "Tus-Resumable": "1.0.0" }, mergeMetaData(newParams))
  }, true)
  .then(data => {
    const { header } = data
    return header
  })
}

export const uploadFile = async (params: API_UPLOAD.IUploadParams) => {
  const { file, offset, ...nextParams } = params 
  return request('POST', '/api/customer/upload/weapp', {
    header: merge({}, getToken(true), { "Tus-Resumable": "1.0.0", "Upload-Offset": offset, "content-type": "application/offset+octet-stream" }, mergeMetaData(nextParams)),
    data: file
  }, true)
  .then(data => {
    console.log(data)
    const { header } = data
    return header
  })

}