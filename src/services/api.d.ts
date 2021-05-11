declare namespace API_UPLOAD {

  export interface IUploadParams {

  }

  export interface ICheckUploadFileParams {
    
  }

}

declare namespace API_USER {

  export interface ItypeList {
    value: string
    id?: string
  }

  export interface IMovieListData {
    image: string
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

}