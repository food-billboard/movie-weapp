export interface FormData {
  maxPrice: number | string,
  minPrice: number | string
  fee: Array<string>,
  type: string,
  startDate: number | string,  
  endDate: number | string,
  actor: Array<string>
  director: Array<string>
  area: Array<string>
  lang: string
}