import { TypeColor } from '../../color'

export default (type: keyof typeof TypeColor='primary') => {
  return {
    color: `${TypeColor[type]}`
  }
}