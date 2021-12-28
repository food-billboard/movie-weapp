import Taro from '@tarojs/taro'
import { ScrollView } from '@tarojs/components'
import { AtTag } from 'taro-ui'
import React, { memo, useCallback } from 'react'
import { TaroShowModal } from '~utils'

interface IProps {
  value: Model_Issue.IItem[]
  onChange?: (value: Model_Issue.IItem[]) => any
}

export default memo((props: IProps) => {

  const { value, onChange } = props

  const handleDelete = useCallback((deleteItem: Model_Issue.IItem) => {
    const { _id } = deleteItem
    if(onChange) {
      TaroShowModal({
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
  }, [value, onChange])
 
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