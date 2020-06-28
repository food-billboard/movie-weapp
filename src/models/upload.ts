import {
  uploadFile,
  uploadChunkFileCheck,
  uploadChunkFile,
  uploadChunkFileComplete
} from '~services'

export default {
  namespace: 'upload',
  state: {

  },
  effects: {

    // //普通文件上传
    // * uploadFile({  }, {  }) {

    // }

  },
  reducers: {
    setData(state, {payload}) {
      return {...state, ...payload}
    }
  }
}