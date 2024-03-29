declare namespace API_COMMON {

  export interface ICommonMovieData {
    description: string
    author_description: string 
    name: string
    poster: string
    _id: string
    store: boolean
    rate: number
    classify: {
      name: string 
    }[]
    images: string[]
    publish_time: string
    hot: number 
    author: {
      username: string
      id: string
      avatar: string
    }
    author_rate: number 
  }

  export interface ICommonParams {
    currPage?: number 
    pageSize?: number 
  }

}

declare namespace API_UPLOAD {

  export interface IPutVideoPosterParams {
    data: string 
  }

  export type TAuathType = "PRIVATE" | "PUBLIC"

  export interface IUploadParams {
    md5: string
    offset: number
    file: ArrayBuffer
  }

  export interface IUploadRes {
    "Upload-Offset": number 
  }

  export interface ICheckUploadFileParams {
    "Tus-Resumable": "1.0.0"
    md5: string 
    auth: TAuathType 
    size: number 
    mime: string
    name?: string 
    chunk: number 
  }

  export interface ICheckUploadFileRes {
    "Tus-Resumable": "1.0.0"
    location: string 
    "Upload-Offset": number 
    "Upload-Length": number 
    "Upload-Id": string 
  }

  export interface IGetMediaDataParams {
    load: string 
  }

}

declare namespace API_USER {

  export interface IGetMovieSpecialListData {
    name: string 
    description: string 
    movie_count: number 
    glance_count: number 
    _id: string 
    createdAt: string 
    updatedAt: string 
    poster: string 
  }

  export interface IGetMovieSpecialDetail {
    poster: string 
    name: string 
    _id: string 
    movie: API_COMMON.ICommonMovieData[]
  }

  export interface ItypeList {
    value: string
    id?: string
  }

  export interface IMovieListData {
    images: string[]
    name: string
    type?: ItypeList[]
    time: string | number
    hot: number
    _id: string
    rate: number
    description: string
    store?: boolean
    author: {
      avatar: string
      username: string
      _id: string 
    }
  }

  export interface ISearchDataParams {
    currPage?: number 
    pageSize?: number 
    content?: string 
    area?: string 
    director?: string 
    actor?: string 
    lang?: string 
    time?: string 
    sort?: string 
  }

  export interface ISearchDataRes {
    
  }

  export interface ISearchDataResData {
    
  }

  export interface ISearchOrderFieldListRes {
    data: ISearchOrderFieldListResData[]
  }

  export interface ISearchOrderFieldListResData {
    name: string 
    _id: string 
  }
  
  export interface IGetDailyResData {
    createdAt: string 
    video: string 
    poster: string 
    name: string 
    _id: string 
    author_rate: number 
    author_description: string 
  }
  export interface IGetDailyRes {
    data: IGetDailyResData[]
  }

  export interface IGetWrapperSpecialData {
    glance_count: number 
    poster: string
    createdAt: string
    updatedAt: string
    name: string
    description: string
    movie_count: number 
    _id: string
  }

}

declare namespace API_CHAT {

  export interface IGetGlobalMessageListParams {

  }

  export interface IGetGlobalMessageListRes {
    
  }

  export interface IGetGlobalMessageListData {
    [key: string]: any
  }

}

declare namespace API_CUSTOMER {

  export interface UserInfo {
    _id:	string
    friend_id:	string
    hot: number
    attentions: number 
    friends: number
    avatar: string
    fans: number 
    username: string
    mobile: string 
    description: string
    email: string
    createdAt: string 
    updatedAt: string 

  }

}