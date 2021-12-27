import { TypeColor, TTypeColor } from '../../color'

export default (type: keyof TTypeColor='primary') => {
  return {
    color: `${TypeColor()[type]}`
  }
}