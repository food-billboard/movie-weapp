import Taro from '@tarojs/taro'
import { ScrollView } from '@tarojs/components'
import { AtTag } from 'taro-ui'
import React, { memo, useCallback, useMemo } from 'react'
import { Item } from '../../index'

interface IProps {
  value: Item[]
  onChange?: (value: Item[]) => any
}

export default memo((props: IProps) => {

  const { value, onChange } = useMemo(() => {
    return props 
  }, [props])

  const handleDelete = useCallback((deleteItem: Item) => {
    const { _id } = deleteItem
    if(onChange) {
      Taro.showModal({
        title: '提示',
        content: '是否删除',
        success: function (res) {
          if (res.confirm) {
            onChange(value.filter(item => item._id != _id))
          } else if (res.cancel) {
            return 
          }
        }
      })
    }
  }, [value])
 
  return (
    <ScrollView
      scrollX
      style={{whiteSpace: 'nowrap', padding: '10px 0'}}
    >
      {
        value.map(item => {
          const { _id, name } = item
          return (
            <AtTag 
              customStyle={{display: 'inline-block'}}
              circle
              onClick={handleDelete.bind(this, item)}
              key={_id}
            >
              {name}
            </AtTag>
          ) 
        })
      }
    </ScrollView>
  )

})