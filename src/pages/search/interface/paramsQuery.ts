export interface FormData {
  maxPrice: number | string,
  minPrice: number | string
  priceDisable: boolean
  fee: Array<string>,
  type: string,
  startDate: number,  
  endDate: number,
  // actor: string
}