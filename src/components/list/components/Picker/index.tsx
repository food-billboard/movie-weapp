import React, { memo, useCallback, useMemo, FC } from 'react'
import { Picker } from '@tarojs/components'

interface IProps {
  selector: {
    [key: string]: () => Promise<any>
  }
  onChange?: (key: string) => Promise<any>
  children?: any
}

const CustomPicker: FC<IProps> = (props) => {
  const { children, selector, selectorMap, onChange } = useMemo(() => {
    const { selector, ...nextProps } = props
    return {
      ...nextProps,
      selector: Object.keys(selector),
      selectorMap: selector
    } 
  }, [props])

  const onSelectorChange = useCallback(async (e) => {
    const value = e.detail.value  
    if(onChange) await onChange(value)
    const method = selectorMap[value]
    if(typeof method === 'function') await method()
  }, [onChange, selectorMap])

  return (
    <Picker 
      mode='selector' 
      range={selector} 
      onChange={onSelectorChange}
      disabled
    >
      {children}
    </Picker>
  )
}

export default memo(CustomPicker)