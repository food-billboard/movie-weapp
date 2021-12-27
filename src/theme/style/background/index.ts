import { TTypeColor, TypeColor } from '../../color'

export default (type: keyof TTypeColor='primary') => {
  
  const typeColor = TypeColor()

  return {
    backgroundColor: `${typeColor[type]}`
  }
}