import { Option } from 'taro-ui/@types/checkbox'

type TDataType = 'LANGUAGE' | 'CLASSIFY'

export interface IProps {
   value: Array<string>
   error?: boolean
   handleChange: (...args: Array<any>) => any
   type: TDataType
}

export interface IState {
  list: Array<Option<string>>
}