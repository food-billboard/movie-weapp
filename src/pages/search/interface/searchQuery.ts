import { FormData } from './paramsQuery'

interface IQuery {
  field: number
  query: FormData
}

export interface searchQuery {
  currpage: number
  pageSize: number
  query?: IQuery
}