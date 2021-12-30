import React, { useEffect, useState, useImperativeHandle, forwardRef, useMemo } from 'react'
import { View, ScrollView, Text } from '@tarojs/components'
import classnames from 'classnames'
import { SYSTEM_PAGE_SIZE } from '~config'
import style from '~theme/style'
import { getClassify } from '~services'

import './index.scss'

export interface IProps {
  onChange?: (id: string) => void 
  currentValue: string 
}

export interface IClassifyHeaderRef {
  classifyList: any[]
  close: () => void 
}

enum SHOW_TYPE {
  SHOW_MORE = 'SHOW_MORE',
  HIDE_MORE = 'HIDE_MORE'
}

const SINGLE_HEADER_HEIGHT = 80

const SCROLL_MAX_SHOW_COUNT = 5

const ClassifyHeader = forwardRef((props: IProps, ref) => {

  const [ typeShow, setTypeShow ] = useState<boolean>(false)
  const [ classifyList, setClassifyList ] = useState<any[]>([])

  const { onChange, currentValue } = props

  const bgColor = style.backgroundColor('bgColor')

  //控制详细分类的显示隐藏
  const handleControlTypeDetail = (type: SHOW_TYPE) => {
    let status = false
    if (type === SHOW_TYPE.SHOW_MORE) status = true
    setTypeShow(status)
  }

  //获取分类列表
  const fetchTypeData = async () => {
    const data = await getClassify(16)
    setClassifyList(data)
  }

  const list = useMemo(() => {
    return classifyList.map((val: any) => {
      const { name, _id: id } = val
      return (
        <View
          className={
            classnames({
              'page-classify-header-content-list': true,
              'at-col': typeShow,
              'at-col-2': typeShow,
              'page-classify-header-list-size': !typeShow,
              'page-classify-header-list-active': id == currentValue
            })
          }
          style={{ ...style.color('primary') }}
          key={id}
          onClick={(_) => { onChange && onChange(id) }}
        >
          {name}
        </View>
      )
    })
  }, [classifyList, onChange, typeShow, currentValue])

  const showType = useMemo(() => {
    return classifyList.length <= SCROLL_MAX_SHOW_COUNT
  }, [classifyList])

  const headerHeight = useMemo(() => {
    return (showType || !typeShow) ? SINGLE_HEADER_HEIGHT : SINGLE_HEADER_HEIGHT * (Math.ceil((classifyList.length + 2) / 6))
  }, [showType, typeShow, classifyList])

  useImperativeHandle(ref, () => {
    return {
      classifyList,
      close: () => {
        setTypeShow(false)
      }
    }
  }, [classifyList])

  useEffect(() => {
    fetchTypeData()
  }, [])

  return (
    <View className='page-classify-header normal-font-size-class' style={{
      ...bgColor,
      height: Number(SYSTEM_PAGE_SIZE(headerHeight)) / 2 + 'px'
    }}
    >
      {
        !!list.length &&
        <Text className='page-classify-header-text'
          style={{ ...style.color('thirdly'), ...bgColor }}
        >分类: </Text>
      }
      {
        !showType || !typeShow ?
          <ScrollView
            scrollX
            className='page-classify-header-content'
            style={{ ...bgColor }}
          >
            {
              !showType &&
                <View
                  className='page-classify-header-content-list page-classify-header-list-size'
                  style={{ ...style.color('primary'), fontWeight: 'normal' }}
                  onClick={handleControlTypeDetail.bind(null, SHOW_TYPE.SHOW_MORE)}
                >
                  展开
                </View>
            }
            {list}
          </ScrollView>
          :
          <View
            className='page-classify-header-type-detail at-row at-row--wrap'
            style={{ ...bgColor }}
          >
            {list}
            <View
              className='page-classify-header-content-list at-col at-col-2'
              style={{ ...style.color('primary'), fontWeight: 'normal' }}
              onClick={handleControlTypeDetail.bind(null, SHOW_TYPE.HIDE_MORE)}
            >
              收起
            </View>
          </View>
      }
    </View>
  )

})

export default ClassifyHeader