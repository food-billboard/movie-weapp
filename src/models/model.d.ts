declare namespace Model_Issue {

  export interface IItem {
    name: string
    _id: string 
    key: string 
    [propName: string]: any
  }

  export interface IActorItem extends IItem {}

  export interface IDirectorItem extends IItem {}

  export interface IDistrictItem extends IItem {}

}