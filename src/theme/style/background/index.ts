import { TypeColor } from '../../color'
export default (type: keyof typeof TypeColor='primary') => {
  return {
    backgroundColor: `${TypeColor[type]}`
  }
}